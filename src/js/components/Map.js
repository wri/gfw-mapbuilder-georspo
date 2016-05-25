/* eslint no-unused-vars: 0 */
/* Creating some esri dijits needs the above rule disabled, choosing this over no-new */
import AnalysisModal from 'components/Modals/AnalysisModal';
import Controls from 'components/MapControls/ControlPanel';
import CanopyModal from 'components/Modals/CanopyModal';
import Legend from 'components/LegendPanel/LegendPanel';
import TabButtons from 'components/TabPanel/TabButtons';
import SearchModal from 'components/Modals/SearchModal';
import PrintModal from 'components/Modals/PrintModal';
import {applyStateFromUrl} from 'utils/shareUtils';
import TabView from 'components/TabPanel/TabView';
import layerKeys from 'constants/LayerConstants';
import arcgisUtils from 'esri/arcgis/utils';
import mapActions from 'actions/MapActions';
import Scalebar from 'esri/dijit/Scalebar';
import {getUrlParams} from 'utils/params';
import basemapUtils from 'utils/basemapUtils';
import MapStore from 'stores/MapStore';
import {mapConfig} from 'js/config';
import React, {
  Component,
  PropTypes
} from 'react';

let scalebar;

export default class Map extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  static childContextTypes = {
    webmapInfo: PropTypes.object,
    map: PropTypes.object
  };

  getChildContext = () => {
    return {
      webmapInfo: this.state.webmapInfo,
      map: this.state.map
    };
  };

  constructor (props) {
    super(props);
    this.map = {};
    this.webmapInfo = {};
    this.state = {
      map: {},
      webmapInfo: {},
      ...MapStore.getState()
    };
  }

  componentDidMount() {
    MapStore.listen(this.storeDidUpdate);
  }

  componentDidUpdate (prevProps, prevState) {
    const {settings, language} = this.context;
    const {activeWebmap} = this.props;
    const {basemap, map} = this.state;
    // If the webmap is retrieved from AGOL or the resources file, or it changes
    if (
      prevProps.activeWebmap === undefined && activeWebmap ||
      prevProps.activeWebmap !== undefined && prevProps.activeWebmap !== activeWebmap
    ) {
      if (map.destroy) {
        map.destroy();
        scalebar.destroy();
      }
      this.createMap(activeWebmap);
    }

    if (
      prevState.basemap !== basemap ||
      prevState.map !== map
    ) {
      basemapUtils.updateBasemap(map, basemap, settings.basemaps[language]);
    }
  }

  storeDidUpdate = () => {
    this.setState(MapStore.getState());
  };

  createMap = (webmap) => {
    const {language, settings} = this.context;
    arcgisUtils.createMap(webmap, this.refs.map, { mapOptions: mapConfig.options }).then(response => {
      // this.webmapInfo = response.itemInfo.itemData;
      // Add operational layers from the webmap to the array of layers from the config file.
      const {itemData} = response.itemInfo;
      this.addLayersToLayerPanel(settings, itemData.operationalLayers);
      // Store a map reference and clear out any default graphics
      // response.map = response.map;
      response.map.graphics.clear();
      //- Attach events I need for the info window
      response.map.infoWindow.on('show, hide, set-features, selection-change', mapActions.infoWindowUpdated);
      response.map.on('zoom-end', mapActions.mapUpdated);
      //- When custom features are clicked, apply them to the info window, this will trigger above event
      response.map.graphics.on('click', (evt) => {
        evt.stopPropagation();
        response.map.infoWindow.setFeatures([evt.graphic]);
      });
      //- Add a scalebar
      scalebar = new Scalebar({
        map: response.map
      });

      const updateEnd = response.map.on('update-end', () => {
        updateEnd.remove();
        mapActions.createLayers(response.map, settings.layers[language], this.state.activeLayers);
        //- Set the default basemap in the store
        const basemap = itemData && itemData.baseMap;
        basemapUtils.prepareDefaultBasemap(response.map, basemap.baseMapLayers);
        //- Apply the mask layer defintion if present
        if (settings.iso && settings.iso !== '') {
          const maskLayer = response.map.getLayer(layerKeys.MASK);
          if (maskLayer) {
            const layerDefs = [];
            maskLayer.visibleLayers.forEach((layerNum) => {
              layerDefs[layerNum] = `code_iso3 <> '${encodeURIComponent(settings.iso)}'`;
            });
            maskLayer.setLayerDefinitions(layerDefs);
            maskLayer.show();
          }
        }
      });
      //- Load any shared state if available
      applyStateFromUrl(response.map, getUrlParams(location.search));
      //- Make the map a global in debug mode for easier debugging
      if (brApp.debug) { brApp.map = response.map; }
      //- Update local state since the map is ready now
      this.setState({
        webmapInfo: response.itemInfo.itemData,
        map: response.map
      });
    });
  };

  addLayersToLayerPanel = (settings, operationalLayers) => {
    const {language} = this.context;
    // Remove any already existing webmap layers
    settings.layers[language] = settings.layers[language].filter((layer) => layer.groupKey !== layerKeys.GROUP_WEBMAP);
    // Add the layers to the webmap group
    operationalLayers.forEach((layer) => {
      if (layer.layerType === 'ArcGISMapServiceLayer' && layer.resourceInfo.layers) {
        layer.resourceInfo.layers.forEach((sublayer) => {
          const visible = layer.layerObject.visibleLayers.indexOf(sublayer.id) > -1;
          const scaleDependency = (sublayer.minScale > 0 || sublayer.maxScale > 0);
          settings.layers[language].push({
            id: layer.id,
            subId: `${layer.id}_${sublayer.id}`,
            subIndex: sublayer.id,
            hasScaleDependency: scaleDependency,
            maxScale: sublayer.maxScale,
            minScale: sublayer.minScale,
            group: settings.labels[language].webmapMenuName,
            groupKey: layerKeys.GROUP_WEBMAP,
            label: sublayer.name,
            opacity: 1,
            visible: visible,
            esriLayer: layer.layerObject
          });
        });
      } else {
        settings.layers[language].push({
          id: layer.id,
          group: settings.labels[language].webmapMenuName,
          groupKey: layerKeys.GROUP_WEBMAP,
          label: layer.title,
          opacity: layer.opacity,
          visible: layer.visibility,
          esriLayer: layer.layerObject
        });
      }
    });
  };

  render () {
    const {
      printModalVisible,
      analysisModalVisible,
      searchModalVisible,
      canopyModalVisible
    } = this.state;

    return (
      <div className='map-container'>
        <div ref='map' className='map'>
          <Controls {...this.state} />
          <TabButtons {...this.state} />
          <TabView {...this.state} />
          <Legend {...this.state} />
        </div>
        <div className={`analysis-modal-container modal-wrapper ${analysisModalVisible ? '' : 'hidden'}`}>
          <AnalysisModal />
        </div>
        <div className={`print-modal-container modal-wrapper ${printModalVisible ? '' : 'hidden'}`}>
          <PrintModal />
        </div>
        <div className={`search-modal-container modal-wrapper ${searchModalVisible ? '' : 'hidden'}`}>
          <SearchModal />
        </div>
        <div className={`canopy-modal-container modal-wrapper ${canopyModalVisible ? '' : 'hidden'}`}>
          <CanopyModal />
        </div>
      </div>
    );
  }
}
