import layerKeys from 'constants/LayerConstants';
import React, {PropTypes, Component} from 'react';
import mapActions from 'actions/MapActions';
import Legend from 'esri/dijit/Legend';
import utils from 'utils/AppUtils';

const closeSymbolCode = 9660,
    openSymbolCode = 9650,
    closeSvg = '<use xlink:href="#shape-close" />';

let legend;


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

  componentDidUpdate() {
    const {map} = this.context;
    if (map.loaded && !legend) {
      legend = new Legend({
        map: map,
        layerInfos: this.getLayersForLegend()
      }, this.refs.legendNode);
      legend.startup();
    } else if (legend) {
      legend.refresh(this.getLayersForLegend());
    }
  }

  getLayersForLegend () {
    const {map, webmapInfo, settings, language} = this.context;
    const layersConfig = settings.layers[language];
    let layers = [];

    //- Get layers from the webmap
    layers = webmapInfo.operationalLayers.filter((item) => {
      return item.layerObject;
    }).map((layer) => {
      return {
        layer: layer.layerObject,
        title: '' // layer.layerObject.name
      };
    });

    //- Get layers from the Map
    let layer = map.getLayer(layerKeys.ACTIVE_FIRES);
    // let conf = utils.getObject(layersConfig, 'id', layerKeys.ACTIVE_FIRES);
    if (layer) {
      layers.push({
        layer: layer,
        title: '' // conf.label
      });
    }

    layer = map.getLayer(layerKeys.LAND_COVER);
    // conf = utils.getObject(layersConfig, 'id', layerKeys.LAND_COVER);
    if (layer) {
      layers.push({
        layer: layer,
        title: '' // conf.label
      });
    }

    layer = map.getLayer(layerKeys.LEGEND_LAYER);
    // conf = utils.getObject(layersConfig, 'id', layerKeys.LAND_COVER);
    if (layer) {
      layers.push({
        layer: layer,
        title: '' // conf.label
      });
    }

    return layers;
  }

  render () {
    const {
      tableOfContentsVisible,
      legendOpen
    } = this.props;

    let rootClasses = legendOpen ? 'legend-panel map-component shadow' : 'legend-panel map-component shadow legend-collapsed';

    //- Hide the legend if the TOC is not visible (eye button)
    if (!tableOfContentsVisible) {
      rootClasses += ' hidden';
    }

    return (
      <div className={rootClasses}>

        <div className='legend-title mobile-hide' onClick={mapActions.toggleLegendVisible}>
          <span>
            Legend
          </span>
          <span className='layer-category-caret' onClick={mapActions.toggleLegendVisible}>
            {String.fromCharCode(legendOpen ? closeSymbolCode : openSymbolCode)}
          </span>
        </div>

        <div title='close' className='legend-close close-icon pointer mobile-show' onClick={mapActions.toggleLegendVisible}>
          <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: closeSvg }}/>
        </div>

        <div className='legend-layers'>
          <div id='legend' ref='legendNode' className={`${legendOpen ? '' : 'hidden'}`}></div>
        </div>
      </div>
    );
  }

}
