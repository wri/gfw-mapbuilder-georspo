import DynamicLayer from 'esri/layers/ArcGISDynamicMapServiceLayer';
import ImageParameters from 'esri/layers/ImageParameters';
import analysisKeys from 'constants/AnalysisConstants';
import performAnalysis from 'utils/performAnalysis';
import layerKeys from 'constants/LayerConstants';
import Polygon from 'esri/geometry/Polygon';
import {getUrlParams} from 'utils/params';
import {analysisConfig} from 'js/config';
import esriRequest from 'esri/request';
import template from 'utils/template';
import appUtils from 'utils/AppUtils';
import locale from 'dojo/date/locale';
import Deferred from 'dojo/Deferred';
import symbols from 'utils/symbols';
import request from 'utils/request';
import all from 'dojo/promise/all';
import Graphic from 'esri/graphic';
import resources from 'resources';
import charts from 'utils/charts';
import number from 'dojo/number';
import text from 'js/languages';
import Map from 'esri/map';

let map;

const getWebmapInfo = function getWebmapInfo (webmap) {
  return esriRequest({
    url: `http://www.arcgis.com/sharing/rest/content/items/${webmap}/data?f=json`,
    callbackParamName: 'callback'
  });
};

const getApplicationInfo = function getApplicationInfo (params) {
  const { webmap, appid } = params;
  const promise = new Deferred();
  // //- Should probably get any needed params from map.html since it already has
  // //- appInfo, just pass everything needed, if the needed items are too much, then
  // //- fall back to this
  if (webmap) {
    all({
      appid: template.getAppInfo(appid),
      webmap: getWebmapInfo(webmap)
    }).then((results) => {
      promise.resolve(results);
      if (brApp.debug) { console.log('getApplicationInfo.webmap: ', results); }
    });
  } else {
    promise.reject({
      error: new Error('Missing Webmap Id. We need atleast one.')
    });
  }

  return promise;
};

const getFeature = function getFeature (params) {
  const { idvalue, service, layerid } = params;
  const promise = new Deferred();
  if (idvalue && service && layerid) {
    //- This assumes id field is object id, if thats not the case, will need a different request method
    request.queryTaskById(`${service}/${layerid}`, idvalue).then((results) => {
      const feature = results.features[0];
      if (feature) {
        promise.resolve({
          attributes: feature.attributes,
          geometry: feature.geometry,
          title: params.custom ? feature.attributes.title : feature.attributes[results.displayFieldName],
          isCustom: params.custom
        });
      } else {
        promise.reject({ error: new Error('Unable to query for feature. Check the configuration.') });
      }
      if (brApp.debug) { console.log('getFeature: ', results); }
    });
  } else {
    promise.reject({ error: new Error('Unable to retrieve feature.') });
  }

  return promise;
};

const createMap = function createMap (params) {
  const { basemap } = params;

  map = new Map('map', {
    center: [-8.086, 21.085],
    basemap: basemap || 'topo',
    slider: false,
    logo: false,
    zoom: 2
  });

  map.on('load', () => {
		map.disableKeyboardNavigation();
		map.disableMapNavigation();
		map.disableRubberBandZoom();
		map.disablePan();
	});
};

const generateRow = function generateRows (fieldName, fieldValue) {
  const row = document.createElement('dl');
  const label = document.createElement('dt');
  const value = document.createElement('dd');
  label.innerHTML = fieldName;
  value.innerHTML = fieldValue;
  row.appendChild(label);
  row.appendChild(value);
  return row;
};

/**
* Add a graphic to the map and set the map extent
* Add layers to the map
*/
const setupMap = function setupMap (params, feature) {
  const { service, visibleLayers } = params;
  //- Add a graphic to the map
  const graphic = new Graphic(new Polygon(feature.geometry), symbols.getCustomSymbol());
  map.setExtent(graphic.geometry.getExtent(), true);
  map.graphics.add(graphic);
  //- Add the layer to the map
  //- TODO: Old method adds a dynamic layer, this needs to be able to handle all layer types eventually,
  //- Update the layer factory to be more flexible
  if (service) {
    const imageParameters = new ImageParameters();
    if (visibleLayers) {
      imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
      imageParameters.layerIds = [visibleLayers];
    }
    imageParameters.format = 'png32';

    const currentLayer = new DynamicLayer(service, {
      imageParameters: imageParameters,
      opacity: 0.8
    });

    map.addLayer(currentLayer);
  }

};

const addHeaderContent = function addHeaderContent (params) {
  const {title, subtitle, logoUrl, logoLinkUrl} = params;

  document.getElementById('report-title').innerHTML = title;
  document.getElementById('report-subtitle').innerHTML = subtitle;
  //- TODO: This should be modified, logoUrl should come from querying the appid instead of the url since that is safer
  document.getElementById('logo').setAttribute('src', logoUrl);
  document.getElementById('logo-anchor').setAttribute('href', logoLinkUrl);
};

const addTitleAndAttributes = function addTitleAndAttributes (params, featureInfo, webmap) {
  const { layerName, layerid } = params;
  const { operationalLayers } = webmap;
  //- Generate the attributes listing and set page title
  if (featureInfo.isCustom) {
    document.getElementById('feature-title').innerHTML = featureInfo.title;
  } else {
    const operationalLayer = operationalLayers.filter((layer) => layerName.search(layer.id) > -1)[0];
    //- layerid is a string but layer.id is a number, convert layerid to int
    const activeLayer = !operationalLayer.layers ? operationalLayer : operationalLayer.layers.filter((layer) => layer.id === +layerid)[0];
    if (activeLayer) {
      const title = activeLayer.popupInfo.title.replace(/{.*}/, featureInfo.title || 'N/A');
      //- generate rows for each field that is visible in popup for the configured layer
      const fragment = document.createDocumentFragment();
      activeLayer.popupInfo.fieldInfos.filter(fieldInfo => fieldInfo.visible).forEach((fieldInfo) => {
        let fieldValue = featureInfo.attributes[fieldInfo.fieldName];
        //- If it is a date, format that correctly
        if (fieldInfo.format && fieldInfo.format.dateFormat) {
          fieldValue = locale.format(new Date(fieldValue));
        //- If it is a number, format that here, may need a better way
        } else if (fieldInfo.format && fieldInfo.format.places !== undefined) {
          fieldValue = number.format(fieldValue, fieldInfo.format);
        }
        fragment.appendChild(generateRow(
          fieldInfo.label,
          fieldValue
        ));
      });
      if (brApp.debug) { console.log('Popup info: ', activeLayer.popupInfo); }
      //- Add title to the page
      document.getElementById('feature-title').innerHTML = title;
      //- Add the rows to the DOM
      document.getElementById('popup-content').appendChild(fragment);
    }
  }
};

/**
* Takes the counts from the restoration requests and formats them for highcharts
*/
const formatRestorationData = (counts, labels, colors) => {
  return labels.map((label, index) => {
    return {
      name: label,
      data: [counts[index]],
      color: colors[index]
    };
  }).filter((item) => {
    return item.data[0] && item.name !== 'No Data';
  });
};

/**
* Each result set needs to create four dom nodes in a container and render charts into each node
*/
const makeRestorationAnalysisCharts = function makeRestorationAnalysisCharts (results, settings, lang, label) {
  const rootNode = document.getElementById('restoration');
  const prefixKey = analysisKeys.ANALYSIS_GROUP_RESTORATION;
  const prefix = text[lang][prefixKey];
  // Format results for individual charts
  const slopeData = formatRestorationData(results.slope, settings.slopeClasses, settings.slopeColors);
  const lcData = formatRestorationData(results.landCover, settings.landCoverClasses, settings.landCoverColors);
  const popData = formatRestorationData(results.population, settings.populationClasses, settings.populationColors);
  const tcData = formatRestorationData(results.treeCover, settings.treeCoverClasses, settings.treeCoverColors);
  // If any if the results have no data (no length), don't render any content
  if (!slopeData.length || !lcData.length || !popData.length || !tcData.length) { return; }
  // Create all the necessary dom nodes
  const container = document.createElement('div');
  const labelNode = document.createElement('h4');
  const slopeNode = document.createElement('div');
  const lcNode = document.createElement('div');
  const popNode = document.createElement('div');
  const tcNode = document.createElement('div');
  // Append all the nodes to the root node and add classes etc.
  container.setAttribute('class', 'restoration__module');
  // container.setAttribute('class', 'restoration__module');
  labelNode.setAttribute('class', 'restoration__label');
  slopeNode.setAttribute('class', 'restoration__chart');
  lcNode.setAttribute('class', 'restoration__chart');
  popNode.setAttribute('class', 'restoration__chart');
  tcNode.setAttribute('class', 'restoration__chart');
  container.appendChild(labelNode);
  container.appendChild(slopeNode);
  container.appendChild(lcNode);
  container.appendChild(popNode);
  container.appendChild(tcNode);
  // Push the container to the DOM
  rootNode.appendChild(container);
  // Set the label
  labelNode.innerHTML = `${prefix} ${label}`;
  // Render the charts
  charts.makeRestorationBarChart(slopeNode, 'Slope', slopeData);
  charts.makeRestorationBarChart(lcNode, 'Land Cover', lcData);
  charts.makeRestorationBarChart(popNode, 'Population Density', popData);
  charts.makeRestorationBarChart(tcNode, '% Tree cover', tcData);
};

const runAnalysis = function runAnalysis (params, feature) {
  const lossLabels = analysisConfig[analysisKeys.TC_LOSS].labels;
  const { tcd, lang, settings, activeSlopeClass } = params;
  //- Only Analyze layers in the analysis

  if (appUtils.containsObject(settings.layers[lang], 'id', layerKeys.TREE_COVER_LOSS)) {
    //- Loss/Gain Analysis
    performAnalysis({
      type: analysisKeys.TC_LOSS_GAIN,
      geometry: feature.geometry,
      settings: settings,
      canopyDensity: tcd,
      language: lang
    }).then((results) => {
      const totalLoss = results.lossCounts.reduce((a, b) => a + b, 0);
      const totalGain = results.gainCounts.reduce((a, b) => a + b, 0);
      //- Generate chart for Tree Cover Loss
      const name = text[lang].ANALYSIS_TC_CHART_NAME;
      const colors = analysisConfig[analysisKeys.TC_LOSS].colors;
      const tcLossNode = document.getElementById('tc-loss');
      const series = [{ name: name, data: results.lossCounts }];

      if (results.lossCounts && results.lossCounts.length) {
        charts.makeSimpleBarChart(tcLossNode, lossLabels, colors, series);
      } else {
        tcLossNode.remove();
      }
      //- Generate content for Loss and Gain Badges
      //- Loss
      document.querySelector('#total-loss-badge .results__loss-gain--label').innerHTML = text[lang].ANALYSIS_TOTAL_LOSS_LABEL;
      document.querySelector('#total-loss-badge .results__loss-gain--range').innerHTML = text[lang].ANALYSIS_TOTAL_LOSS_RANGE;
      document.querySelector('.results__loss--count').innerHTML = totalLoss;
      document.getElementById('total-loss-badge').classList.remove('hidden');
      //- Gain
      document.querySelector('#total-gain-badge .results__loss-gain--label').innerHTML = text[lang].ANALYSIS_TOTAL_GAIN_LABEL;
      document.querySelector('#total-gain-badge .results__loss-gain--range').innerHTML = text[lang].ANALYSIS_TOTAL_GAIN_RANGE;
      document.querySelector('.results__gain--count').innerHTML = totalGain;
      document.getElementById('total-gain-badge').classList.remove('hidden');
    });
  } else {
    const lossChart = document.getElementById('tc-loss');
    const lossBadge = document.getElementById('total-loss-badge');
    const gainBadge = document.getElementById('total-gain-badge');
    lossChart.remove();
    lossBadge.remove();
    gainBadge.remove();
  }

  if (settings.landCover) {
    //- Land Cover with Loss Analysis
    performAnalysis({
      type: analysisKeys.LC_LOSS,
      geometry: feature.geometry,
      settings: settings,
      canopyDensity: tcd,
      language: lang
    }).then((results) => {
      const layerConf = appUtils.getObject(resources.layers[lang], 'id', layerKeys.LAND_COVER);
      const configuredColors = layerConf.colors;
      const labels = layerConf.classes;
      const node = document.getElementById('lc-loss');
      const { counts, encoder } = results;
      const Xs = encoder.A;
      const Ys = encoder.B;
      const chartInfo = charts.formatSeriesWithEncoder({
        colors: configuredColors,
        encoder: encoder,
        counts: counts,
        labels: labels,
        Xs: Xs,
        Ys: Ys
      });

      if (chartInfo.series && chartInfo.series.length) {
        charts.makeTotalLossBarChart(node, lossLabels, chartInfo.colors, chartInfo.series);
      } else {
        node.remove();
      }
    });

    //- Land Cover Composition Analysis
    performAnalysis({
      type: analysisKeys.LCC,
      geometry: feature.geometry,
      settings: settings,
      canopyDensity: tcd,
      language: lang
    }).then((results) => {
      const layerConf = appUtils.getObject(resources.layers[lang], 'id', layerKeys.LAND_COVER);
      const node = document.getElementById('lc-composition');

      if (results.counts && results.counts.length) {
        const series = charts.formatCompositionAnalysis({
          colors: layerConf.colors,
          name: text[lang].ANALYSIS_LCC_CHART_NAME,
          labels: layerConf.classes,
          counts: results.counts
        });

        charts.makeCompositionPieChart(node, series);
      } else {
        node.remove();
      }
    });
  } else {
    const lossNode = document.getElementById('lc-loss');
    const compositionNode = document.getElementById('lc-composition');
    lossNode.remove();
    compositionNode.remove();
  }

  if (settings.aboveGroundBiomass) {
    //- Carbon Stocks with Loss Analysis
    performAnalysis({
      type: analysisKeys.BIO_LOSS,
      geometry: feature.geometry,
      settings: settings,
      canopyDensity: tcd,
      language: lang
    }).then((results) => {
      const { labels, colors } = analysisConfig[analysisKeys.BIO_LOSS];
      const node = document.getElementById('bio-loss');
      const {series, grossLoss, grossEmissions} = charts.formatSeriesForBiomassLoss({
        data: results,
        lossColor: colors.loss,
        carbonColor: colors.carbon,
        lossName: text[lang].ANALYSIS_CARBON_LOSS,
        carbonName: 'MtCO2'
      });

      charts.makeBiomassLossChart(node, {
        series,
        categories: labels
      }, (chart) => {
        console.dir(chart.renderer);
        const content = chart.renderer.html(
          `<div class='results__legend-container'>` +
            `<span>${text[lang].ANALYSIS_CARBON_LOSS}</span>` +
            `<span>${Math.round(grossLoss)} Ha</span>` +
          `</div>` +
          `<div class='results__legend-container'>` +
            `<span>${text[lang].ANALYSIS_CARBON_EMISSION}</span>` +
            `<span>${Math.round(grossEmissions)}m MtCO2</span>` +
          `</div>`
        );
        content.element.className = 'result__biomass-totals';
        content.add();

      });
      // const { counts, encoder } = results;
      // const Xs = encoder.A;
      // const Ys = encoder.B;
      // const chartInfo = charts.formatSeriesWithEncoder({
      //   encoder: encoder,
      //   counts: counts,
      //   labels: labels,
      //   colors: colors,
      //   Xs: Xs,
      //   Ys: Ys
      // });
      //
      // if (chartInfo.series && chartInfo.series.length) {
      //   charts.makeTotalLossBarChart(node, lossLabels, chartInfo.colors, chartInfo.series);
      // } else {
      //   node.remove();
      // }

    });
  } else {
    const node = document.getElementById('bio-loss');
    node.remove();
  }

  if (settings.intactForests) {
    //- Intact Forest with Loss Analysis
    performAnalysis({
      type: analysisKeys.INTACT_LOSS,
      geometry: feature.geometry,
      settings: settings,
      canopyDensity: tcd,
      language: lang
    }).then((results) => {
      const configuredColors = analysisConfig[analysisKeys.INTACT_LOSS].colors;
      const labels = text[lang].ANALYSIS_IFL_LABELS;
      const node = document.getElementById('intact-loss');
      const { counts, encoder } = results;
      const Xs = encoder.A;
      const Ys = encoder.B;
      const chartInfo = charts.formatSeriesWithEncoder({
        colors: configuredColors,
        encoder: encoder,
        counts: counts,
        labels: labels,
        isSimple: true,
        Xs: Xs,
        Ys: Ys
      });

      if (chartInfo.series && chartInfo.series.length && chartInfo.series[0].data.length) {
        charts.makeTotalLossBarChart(node, lossLabels, chartInfo.colors, chartInfo.series);
      } else {
        node.remove();
      }

    });
  } else {
    const node = document.getElementById('intact-loss');
    node.remove();
  }

  if (settings.activeFires) {
    //- Fires Analysis
    performAnalysis({
      type: analysisKeys.FIRES,
      geometry: feature.geometry,
      settings: settings,
      canopyDensity: tcd,
      language: lang
    }).then((results) => {
      document.querySelector('.results__fires-pre').innerHTML = text[lang].ANALYSIS_FIRES_PRE;
      document.querySelector('.results__fires-count').innerHTML = results.fireCount;
      document.querySelector('.results__fires-active').innerHTML = text[lang].ANALYSIS_FIRES_ACTIVE;
      document.querySelector('.results__fires-post').innerHTML = text[lang].ANALYSIS_FIRES_POST;
      document.getElementById('fires-badge').classList.remove('hidden');
    });
  } else {
    const node = document.getElementById('fires-badge');
    node.remove();
  }

  if (settings.restorationModule) {
    const infos = settings && settings.labels && settings.labels[lang] && settings.labels[lang].restorationOptions || [];
    // Analyze each configured restoration option
    const requests = infos.map((info) => {
      return performAnalysis({
        type: info.id,
        geometry: feature.geometry,
        settings: settings,
        canopyDensity: tcd,
        language: lang
      });
    });

    all(requests).then((results) => {
      results.forEach((result, index) => {
        makeRestorationAnalysisCharts(result, settings, lang, infos[index].label);
      });
      //- Show the results
      document.getElementById('restoration').classList.remove('hidden');
    });

    // Also perform the slope analysis
    performAnalysis({
      type: analysisKeys.SLOPE,
      geometry: feature.geometry,
      settings: settings,
      canopyDensity: tcd,
      activeSlopeClass: activeSlopeClass,
      language: lang
    }).then((results) => {
      console.log(results);
      const element = document.getElementById('slope');
      const {counts} = results;
      const labels = counts.map((v, index) => text[lang].ANALYSIS_SLOPE_OPTION + (index + 1));
      const colors = settings.slopeAnalysisPotentialColors;
      const tooltips = settings.labels[lang].slopeAnalysisPotentialOptions;
      const series = [{ data: counts }];
      // Render the chart
      console.log(series);
      charts.makeSlopeBarChart(element, labels, colors, tooltips, series);
      element.classList.remove('hidden');
    });
  } else {
    const node = document.getElementById('restoration');
    node.remove();
  }

};

export default {

  /**
  * TODO: Add documentation to README.md
  * TEST URL:
  * http://localhost:3000/report.html?idvalue=8&service=http%3A%2F%2Fgis-forestatlas.wri.org%2Farcgis%2Frest%2Fservices%2FGNQ%2FGNQ_online_en%2FMapServer&layerid=6&webmap=5e094aba9465448186287c2300ef879e&basemap=topo&visibleLayers=0%2C1%2C2%2C3%2C4%2C5%2C6&layerName=GNQ_online_en_474&tcd=30&lang=en
  * Required URL Params
  ** webmap or appid
  * Other Params needed
  ** layerid - layer number in dynamic service
  ** service - map service of selected feature
  ** idvalue - objectid of the selected feature
  ** layerName - id of the layer from AGOL, I need this to add attributes
  ** basemap - basemap to use, default is topo
  ** visibleLayers - visible layers of dynamic layer selected feature belongs too, default is all
  ** tcd - tree cover density
  ** activeSlopeClass - Slope setting
  ** lang - current app language
  * Params in local storage
  ** custom-feature - { geometry: esriGeometry, attributes: object, title: string }
  */

  /**
  * Example call from the app
  appUtils.generateReport({
    selectedFeature: selectedFeature,
    settings: settings,
    canopyDensity: canopyDensity,
    lang: language
  });
  */

  run () {
    //- Get params necessary for the report
    const params = getUrlParams(location.href);
    if (brApp.debug) { console.log(params); }
    //- Add Title, Subtitle, and logo right away
    addHeaderContent(params);
    // Get the config for the user features layer incase we need it
    const USER_FEATURES_CONFIG = appUtils.getObject(resources.layers.en, 'id', layerKeys.USER_FEATURES);
    //- Augment params and add a custom attribute if this is from the user_features layer
    params.custom = USER_FEATURES_CONFIG.url.search(params.service) > -1;
    //- Setup the Request Pre Callback to handle tokens for tokenized services
    esriRequest.setRequestPreCallback((ioArgs) => {
      // Add token for user features service
      if (ioArgs.url.search(params.service) > -1 && params.custom) {
        ioArgs.content.token = resources.userFeatureToken[location.hostname];
      }
      return ioArgs;
    });
    //- Create the map as soon as possible
    createMap(params);
    //- Get all the necessary info
    all({
      feature: getFeature(params),
      info: getApplicationInfo(params)
    }).always((response) => {
      //- Bail if anything failed
      if (response.error) {
        throw response.error;
      }

      const { feature, info } = response;
      //- Add Popup Info Now
      addTitleAndAttributes(params, feature, info.webmap);
      //- Need the map to be loaded to add graphics
      if (map.loaded) {
        setupMap(params, feature);
      } else {
        map.on('load', () => {
          setupMap(params, feature);
        });
      }

      //- Currently we do not support points, so if its a point, just bail
      if (feature.geometry.type !== analysisKeys.GEOMETRY_POLYGON) {
        return;
      }

      //- Add the settings to the params so we can omit layers or do other things if necessary
      //- If no appid is provided, the value here is essentially resources.js
      params.settings = info.appid;

      //- Make sure highcharts is loaded before using it
      if (window.highchartsPromise.isResolved()) {
        runAnalysis(params, feature);
      } else {
        window.highchartsPromise.then(() => {
          runAnalysis(params, feature);
        });
      }
    });
  }

};
