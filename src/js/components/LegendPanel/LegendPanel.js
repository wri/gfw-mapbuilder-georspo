import layerKeys from 'constants/LayerConstants';
import React, {PropTypes, Component} from 'react';
import mapActions from 'actions/MapActions';
// import Legend from 'esri/dijit/Legend';
import CartoLegend from 'components/LegendPanel/CartoLegend';
import MangroveLegend from 'components/LegendPanel/MangroveLegend';
import BiomassLegend from 'components/LegendPanel/BiomassLegend';
import TerraLegend from 'components/LegendPanel/TerraLegend';
import GladLegend from 'components/LegendPanel/GladLegend';
import FiresLegend from 'components/LegendPanel/FiresLegend';
import TreeCoverGainLegend from 'components/LegendPanel/TreeCoverGainLegend';
import TreeCoverLossLegend from 'components/LegendPanel/TreeCoverLossLegend';
import SADLegend from 'components/LegendPanel/SADLegend';
import IFLLegend from 'components/LegendPanel/IFLLegend';
import {urls} from 'js/config';
import text from 'js/languages';

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
      layerKeys.TREE_COVER,
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
          legendInfos.push({ layer, title: '' });
        }
      });
    }
    return legendInfos;
  }

  createLegend = (layerDiv, index) => {
    let childComponent;
    switch(layerDiv.layer.id) {
      case 'IFL':
        childComponent = <IFLLegend url={layerDiv.layer.url} layerIds={layerDiv.layer.layerIds}/>;
        break;
      case 'IMAZON_SAD':
        childComponent = <SADLegend url={layerDiv.layer.url} layerIds={layerDiv.layer.layerIds}/>;
        break;
      case 'ACTIVE_FIRES':
        childComponent = <FiresLegend url={layerDiv.layer.url} layerIds={layerDiv.layer.layerIds}/>;
        break;
      case 'GLOB_MANGROVE':
        childComponent = <MangroveLegend url={urls.esriLegendService} layerIds={layerDiv.layer.legendLayer}/>;
        break;
      case 'AG_BIOMASS':
        childComponent = <BiomassLegend url={urls.esriLegendService} layerIds={layerDiv.layer.legendLayer}/>;
        break;
      case 'TERRA_I_ALERTS':
        childComponent = <TerraLegend url={urls.esriLegendService} layerIds={layerDiv.layer.legendLayer}/>;
        break;
      case 'GLAD_ALERTS':
        childComponent = <GladLegend url={urls.esriLegendService} layerIds={layerDiv.layer.legendLayer}/>;
        break;
      case 'TREE_COVER_GAIN':
        childComponent = <TreeCoverGainLegend url={urls.esriLegendService} layerIds={layerDiv.layer.legendLayer}/>;
        break;
      case 'TREE_COVER_LOSS':
        childComponent = <TreeCoverLossLegend url={urls.esriLegendService} layerIds={layerDiv.layer.legendLayer}/>;
        break;
      default:
        if(layerDiv.layer.type === 'CARTO') {
          childComponent = <CartoLegend title={layerDiv.layer.title}/>;
        } else {
          return false;
        }
    }


    return (
      <div key={index}>
        <div className='test'>{layerDiv.layer.title}</div>
        {/*{layerDiv.layer.legendLayer ? <span></span> : <div className='test'>{layerDiv.layer.title}</div>}*/}
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
