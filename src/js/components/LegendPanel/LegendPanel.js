import layerKeys from 'constants/LayerConstants';
import React, {PropTypes, Component} from 'react';
import mapActions from 'actions/MapActions';
import CartoLegend from 'components/LegendPanel/CartoLegend';
import MangroveLegend from 'components/LegendPanel/MangroveLegend';
import BiomassLegend from 'components/LegendPanel/BiomassLegend';
import TerraLegend from 'components/LegendPanel/TerraLegend';
import GladLegend from 'components/LegendPanel/GladLegend';
import FiresLegend from 'components/LegendPanel/FiresLegend';
import LayerCheckbox from 'components/LayerPanel/LayerCheckbox';
import LandCoverLegend from 'components/LegendPanel/LandCoverLegend';
import TreeCoverLegend from 'components/LegendPanel/TreeCoverLegend';
import TreeCoverGainLegend from 'components/LegendPanel/TreeCoverGainLegend';
import TreeCoverLossLegend from 'components/LegendPanel/TreeCoverLossLegend';
import WebMapLegend from 'components/LegendPanel/WebMapLegend';
import SADLegend from 'components/LegendPanel/SADLegend';
import IFLLegend from 'components/LegendPanel/IFLLegend';
import {urls} from 'js/config';
import text from 'js/languages';
import on from 'dojo/on';

const closeSymbolCode = 9660,
    openSymbolCode = 9650;

export default class LegendPanel extends Component {

  static contextTypes = {
    webmapInfo: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (window && window.innerWidth > 950) {
      mapActions.toggleLegendVisible();
    }
  }

  getLayersForLegend () {
    const {map} = this.context;
    const {basemapLayerIds, graphicsLayerIds} = map;
    let {layerIds = []} = map;
    const legendInfos = [];
    let ids = [];

    // Loop through layer ids and if those layers exist, add them to the legend
    // Add any layers we want to exclude from the legend to ignores, including basemapLayerIds
    // If a layer has a legendLayerId configured in the resources.js, you will probably want to add it here to prevent
    // two legends from the same service from showing up
    let ignores = [
      layerKeys.MASK,
      layerKeys.USER_FEATURES
    ];

    //- Add basemap layers and graphics layers
    if (basemapLayerIds) {
      ignores = ignores.concat(basemapLayerIds);
    }

    if (graphicsLayerIds) {
      layerIds = layerIds.concat(graphicsLayerIds);
    }

    if (layerIds) {
      //- Remove layers to ignore
      ids = layerIds.filter(id => ignores.indexOf(id) === -1);
      ids.forEach((layerId) => {
        const layer = map.getLayer(layerId);
        if (layer) {
          legendInfos.push({ layer });
        }
      });
    }

    function compare(a, b) {
      if(a.layer.order === undefined) {
        a.layer.order = 0;
      }
      if(b.layer.order === undefined) {
        b.layer.order = 0;
      }
      if(a.layer.order < b.layer.order) {
        return 1;
      }
      if(a.layer.order > b.layer.order) {
        return -1;
      }
      return 0;
    }
    legendInfos.sort(compare);

    return legendInfos;
  }

  createLegend = (layerDiv, index) => {
    let childComponent;
    const {map, language, settings} = this.context;
    const {visibleLayers} = this.props;

    switch(layerDiv.layer.id) {
      case 'IFL':
        childComponent = <IFLLegend url={layerDiv.layer.url} settings={settings} visibleLayers={visibleLayers} layerIds={layerDiv.layer.layerIds} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'IMAZON_SAD':
        childComponent = <SADLegend url={layerDiv.layer.url} settings={settings} visibleLayers={visibleLayers} layerIds={layerDiv.layer.layerIds} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'ACTIVE_FIRES':
        childComponent = <FiresLegend url={layerDiv.layer.url} settings={settings} visibleLayers={visibleLayers} layerIds={layerDiv.layer.layerIds} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'GLOB_MANGROVE':
        childComponent = <MangroveLegend url={urls.esriLegendService} settings={settings} visibleLayers={visibleLayers} layerIds={layerDiv.layer.legendLayer} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'AG_BIOMASS':
        childComponent = <BiomassLegend url={urls.esriLegendService} settings={settings} visibleLayers={visibleLayers} layerIds={layerDiv.layer.legendLayer} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'TERRA_I_ALERTS':
        childComponent = <TerraLegend url={urls.esriLegendService} settings={settings} visibleLayers={visibleLayers} layerIds={layerDiv.layer.legendLayer} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'GLAD_ALERTS':
        childComponent = <GladLegend url={urls.esriLegendService} settings={settings} visibleLayers={visibleLayers} layerIds={layerDiv.layer.legendLayer} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'TREE_COVER_GAIN':
        childComponent = <TreeCoverGainLegend url={urls.esriLegendService} settings={settings} visibleLayers={visibleLayers} layerIds={layerDiv.layer.legendLayer} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'TREE_COVER_LOSS':
        childComponent = <TreeCoverLossLegend url={urls.esriLegendService} settings={settings} visibleLayers={visibleLayers} layerIds={layerDiv.layer.legendLayer} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'LAND_COVER':
        childComponent = <LandCoverLegend url={urls.esriLegendService} settings={settings} visibleLayers={visibleLayers} layerIds={layerDiv.layer.legendLayer} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      case 'TREE_COVER':
        childComponent = <TreeCoverLegend url={urls.esriLegendService} settings={settings} visibleLayers={visibleLayers} layerIds={layerDiv.layer.legendLayer} map={map} layerId={layerDiv.layer.id} language={language}/>;
        break;
      default:
        // if(layerDiv.layer.type === undefined && layerDiv.layer.arcgisProps && layerDiv.layer._basemapGalleryLayerType !== 'basemap') {
        //   console.log('done');
        //   // return layerDiv;
        //   layerDiv.layer.dynamicLayerInfos.map((layer) => {
        //     childComponent = <WebMapLegend url={layerDiv.layer.url} map={map} visibleLayers={visibleLayers} layerName={layer.name} layerIds={layer.id} language={language}/>;
        //     console.log('done');
        //     return childComponent;
        //   });
        // } else {
          return false;
        // }
        // if(layerDiv.layer.type === 'CARTO') {
        //   childComponent = <CartoLegend title={layerDiv.layer.title}/>;
        // } else {
        // break;
        // }
    }
    return (
      <div key={index}>
        <div>{childComponent}</div>
      </div>
    );
  }

  render () {
    const {tableOfContentsVisible, legendOpen} = this.props;
    const {language} = this.context;

    const legendLayers = this.getLayersForLegend();

    let rootClasses = legendOpen ? 'legend-panel map-component shadow' : 'legend-panel map-component shadow legend-collapsed';

    //- Hide the legend if the TOC is not visible (eye button)
    if (!tableOfContentsVisible) {
      rootClasses += ' hidden';
    }

    // let legendComponents = legendLayers.map(this.createLegend);
    // let webmapChildComponents = [];
    
    // legendComponents.map((component) => {
    //   const {map, language} = this.context;
    //   if(component.layer) {
    //     const currComponent = component;
    //     legendComponents.pop();
       
    //     currComponent.layer.dynamicLayerInfos.map((layer) => {
    //       debugger;
    //       childComponent = <WebMapLegend url={layerDiv.layer.url} map={map} layerName={layer.name} layerIds={layer.id} language={language}/>;
    //       webmapChildComponents.push(childComponent);
    //     });
    //   }
    // });
    
    // legendComponents.concat(webmapChildComponents);
    // console.log(legendComponents);

    return (
      <div className={rootClasses}>

        <div className='legend-title mobile-hide' onClick={mapActions.toggleLegendVisible}>
          <span>
            {text[language].LEGEND}
          </span>
          <span className='layer-category-caret' onClick={mapActions.toggleLegendVisible}>
            {String.fromCharCode(legendOpen ? closeSymbolCode : openSymbolCode)}
          </span>
        </div>

        <div title='close' className='legend-close close-icon pointer mobile-show' onClick={mapActions.toggleLegendVisible}>
          <svg className='svg-icon'>
            <use xlinkHref="#shape-close" />
          </svg>
        </div>

        <div className='legend-layers'>
          <div className='legendContainer'>{legendLayers.map(this.createLegend)}</div>
          <div id='legend' ref='legendNode' className={`${legendOpen ? '' : 'hidden'}`}></div>
        </div>
      </div>
    );
  }

}
