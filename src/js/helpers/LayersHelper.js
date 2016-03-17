// import {analysisActions} from 'actions/AnalysisActions';
// import {layerPanelText, layerConfig} from 'js/config';
// import GraphicsHelper from 'helpers/GraphicsHelper';
// import {analysisStore} from 'stores/AnalysisStore';
import rasterFuncs from 'utils/rasterFunctions';
import Symbols from 'helpers/Symbols';
import Request from 'utils/request';
import utils from 'utils/AppUtils';
import resources from 'resources';
// import KEYS from 'js/constants';

let LayersHelper = {

  connectLayerEvents () {
    brApp.debug('LayersHelper >>> connectLayerEvents');
    // Enable Mouse Events for al graphics layers
    brApp.map.graphics.enableMouseEvents();
    // Get the watershed layer and add mouse events to it
    let watershedLayer = brApp.map.getLayer(KEYS.watershed);
    if (watershedLayer) {
      watershedLayer.on('mouse-over', LayersHelper.watershedHoverOn);
      watershedLayer.on('mouse-out', LayersHelper.watershedHoverOff);
      watershedLayer.on('click', LayersHelper.watershedClicked);
      //- Testing to see if this stops the request cancelled errors in the console
      watershedLayer.on('zoom-start', () => { watershedLayer.setVisibility(false); });
      watershedLayer.on('zoom-end', () => { watershedLayer.setVisibility(true); });
    }
  },

  watershedClicked (evt) {
    brApp.debug('LayerHelper >>> watershedClicked');
    //- Don't do anything if the drawtoolbar is active
    let {activeWatershed, toolbarActive} = analysisStore.getState();
    let graphic = evt.graphic;
    let layer = brApp.map.getLayer(KEYS.watershed);
    if (graphic && !toolbarActive) {
      //- If we currently have a feature in analysis, clear the analyis, then run the query
      if (activeWatershed) { analysisActions.clearActiveWatershed(); }
      // Get a reference to the objectid field
      let oidField = layer.objectIdField;
      let objectid = graphic.attributes[oidField];
      Request.getWatershedById(objectid).then(featureJSON => {
        //- Convert JSON to feature
        // let feature = GraphicsHelper.makePolygon(featureJSON);
        //- Start the analysis process
        analysisActions.analyzeCurrentWatershed(feature);
        brApp.map.setExtent(feature.geometry.getExtent(), true);
      }, err => {
        console.log(err);
      });
    }
  },

  watershedHoverOn (evt) {
    // brApp.debug('LayersHelper >>> watershedHoverOn');
    let graphic = evt.graphic;
    if (graphic) {
      graphic.setSymbol(Symbols.getWatershedHoverSymbol());
    }
  },

  watershedHoverOff (evt) {
    // brApp.debug('LayersHelper >>> watershedHoverOff');
    let graphic = evt.graphic;
    if (graphic) {
      graphic.setSymbol(Symbols.getWatershedDefaultSymbol());
    }
  },

  /**
  * @param {string} layerId - id of layer to show
  */
  showLayer (layerId) {
    brApp.debug(`LayersHelper >>> showLayer - ${layerId}`);
    let layer = brApp.map.getLayer(layerId);
    if (layer) { layer.show(); }
  },
  showSubLayer (layer) {
    let {esriLayer} = layer;
    // console.log('layersHelper, showSubLayer', esriLayer.visibleLayers, layer.subIndex);
    esriLayer.setVisibleLayers(esriLayer.visibleLayers);
  },
  /**
  * @param {string} layerId - id of layer to hide
  */
  hideLayer (layerId) {
    brApp.debug(`LayersHelper >>> hideLayer - ${layerId}`);
    let layer = brApp.map.getLayer(layerId);
    if (layer) { layer.hide(); }
  },
  hideSubLayer (layer) {
    let {esriLayer} = layer;
    // console.log('layersHelper, hideSubLayer', esriLayer.visibleLayers, layer.subIndex);
    esriLayer.setVisibleLayers(esriLayer.visibleLayers);
  },
  /**
  * @param {string} layerId - id of layer to show, need to hide other label layer
  */
  updateLabelLayers (layerId) {
    brApp.debug(`LayersHelper >>> updateLabelLayers - ${layerId}`);
    let layer = brApp.map.getLayer(layerId);
    if (layer) { layer.show(); }
    //- Since we showed layer id, hide the other label layer
    if (layerId === KEYS.adminLabels) {
      layer = brApp.map.getLayer(KEYS.rivers);
      if (layer) { layer.hide(); }
    } else {
      layer = brApp.map.getLayer(KEYS.adminLabels);
      if (layer) { layer.hide(); }
    }
  },
  /**
  * @param {string} basemap - id of basemap to show
  */
  changeBasemap (basemap) {
    brApp.debug(`MapActions >>> changeBasemap - ${basemap}`);
    let layer, labelLayer, baseLayer;
    // Basemap can only be one of two options, wri or satellite
    if (basemap === KEYS.wriBasemap) {
      layer = brApp.map.getLayer(basemap);
      labelLayer = brApp.map.getLayer(KEYS.wriBasemapLabel);
      if (layer) { layer.show(); }
      if (labelLayer) { labelLayer.show(); }
      // Remove the satellite layer if its present, wri-basemap should be first in layer ids,
      // if not, then the first layer is satellite
      if (brApp.map.layerIds[0] !== basemap) {
        baseLayer = brApp.map.getLayer(brApp.map.layerIds[0]);
        brApp.map.removeLayer(baseLayer);
      }
    } else {
      // Hide the wri basemap and show the satellite basemap, KEYS.wriBasemap
      brApp.map.setBasemap(basemap);
      layer = brApp.map.getLayer(KEYS.wriBasemap);
      labelLayer = brApp.map.getLayer(KEYS.wriBasemapLabel);
      if (layer) { layer.hide(); }
      if (labelLayer) { labelLayer.hide(); }
    }
  },
  /**
  * @param {number} optionIndex - Index of the selected option in the UI, see js/config
  * @param {boolean} dontRefresh - Whether or not to not fetch a new image
  */
  updateFiresLayerDefinitions (optionIndex, dontRefresh) {
    brApp.debug('LayersHelper >>> updateFiresLayerDefinitions');
    return;
    let value = layerPanelText.firesOptions[optionIndex].value || 1; // 1 is the default value, means last 24 hours
    let queryString = this.generateFiresQuery(value);
    let firesLayer = brApp.map.getLayer(KEYS.activeFires);
    let defs = [];

    if (firesLayer) {
      firesLayer.visibleLayers.forEach(val => { defs[val] = queryString; });
      firesLayer.setLayerDefinitions(defs, dontRefresh);
    }
  },

  /**
  * @param {Layer} layer - tree cover loss layer
  * @param {string} lang - current language, used to look up layer info
  * @param {number} fromValue - selected index of first tree cover loss select
  * @param {number} toValue - selected index of second tree cover loss select
  */
  updateLossLayerDefinitions (layer, lang, fromValue, toValue) {
    let layerConfig = utils.getObject(resources.layers[lang], 'id', layer.id);
    let rasterFunction = rasterFuncs.getColormapRemap(layerConfig.colormap, [fromValue, (toValue + 1)], layerConfig.outputRange);

    if (layer) {
      layer.setRenderingRule(rasterFunction);
    }
  },

  /**
  * @param {number} densityValue - Tree cover density value from slider, must be between 1 and 100
  */
  updateTreeCoverDefinitions (densityValue) {
    brApp.debug('LayersHelper >>> updateTreeCoverDefinitions');
    return;
    let layerConfig = utils.getObject(layersConfig, 'id', KEYS.treeCover);
    let rasterFunction = rasterFuncs.getColormapRemap(layerConfig.colormap, [densityValue, layerConfig.inputRange[1]], layerConfig.outputRange);
    let layer = brApp.map.getLayer(KEYS.treeCover);

    if (layer) {
      layer.setRenderingRule(rasterFunction);
    }
  },

  /**
  * Generate a date query for active fires layers
  * @param {number} filterValue - Numeric value representing the number of days to show in the output query
  * @return {string} Query String to use for Fires Filter
  */
  generateFiresQuery (filterValue) {
    brApp.debug('LayersHelper >>> generateFiresQuery');
    // The service only has data for the last week, so if filter is 7 days, just set to 1 = 1
    if (filterValue >= 7) {
      return '1 = 1';
    }

    let date = new Date();
    // Set the date to filterValue amount of days before today
    date.setDate(date.getDate() - filterValue);
    let dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return 'ACQ_DATE > date \'' + dateString + '\'';
  },

  changeOpacity (parameters) {
    let layer = brApp.map.getLayer(parameters.layerId);
    if ( layer ) {
      // TODO:  check that value is >= 0 and <= 1.
      layer.setOpacity(parameters.value);
    }
  },

  isLayerVisible (layerInfo, lang) {
    let visible = true;
    // Non-webmap layers, always assume visible.
    if (layerInfo.group !== resources.webmapMenuName) {
      return visible;
    }
    if (brApp.map && !brApp.map.updating) {
      // Regular layers have a visibleAtMapScale property which make this easy.
      let layer = brApp.map.getLayer(layerInfo.id);
      if (layer) {
        visible = layer.visibleAtMapScale;
        // Explicitly check scale depencency for sub-layers in a dynamic map service.
        let scale = brApp.map.getScale();
        if (layerInfo.hasScaleDependency && (scale > layerInfo.minScale || scale < layerInfo.maxScale)) {
          visible = false;
        }
      }
    }
    return visible;
  }

};

export { LayersHelper as default };
