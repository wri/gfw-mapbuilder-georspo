/* eslint no-unused-vars: 0 */
/* Creating some esri dijits needs the above rule disabled, choosing this over no-new */
import AnalysisModal from 'components/Modals/AnalysisModal';
import Controls from 'components/MapControls/ControlPanel';
import CanopyModal from 'components/Modals/CanopyModal';
import LayerModal from 'components/Modals/LayerModal';
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
import esriRequest from 'esri/request';
import {mapConfig} from 'js/config';
import utils from 'utils/AppUtils';
import resources from 'resources';
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
    activeWebmap: PropTypes.string,
    webmapInfo: PropTypes.object,
    map: PropTypes.object
  };

  getChildContext = () => {
    return {
      activeWebmap: this.props.activeWebmap,
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

    // I only need the token and url for config items, so language does not matter
    const USER_FEATURES_CONFIG = utils.getObject(resources.layers.en, 'id', layerKeys.USER_FEATURES);
    // Make sure all requests that use tokens have them
    esriRequest.setRequestPreCallback((ioArgs) => {
      if (ioArgs.url.search(USER_FEATURES_CONFIG.url) > -1) {
        ioArgs.content.token = resources.userFeatureToken;
      }
      return ioArgs;
    });
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
    arcgisUtils.createMap(webmap, this.refs.map, { mapOptions: mapConfig.options, usePopupManager: true }).then(response => {
      // Add operational layers from the webmap to the array of layers from the config file.
      const {itemData} = response.itemInfo;
      this.addLayersToLayerPanel(settings, itemData.operationalLayers);
      // Store a map reference and clear out any default graphics
      response.map.graphics.clear();
      //- Attach events I need for the info window
      response.map.infoWindow.on('show, hide, set-features, selection-change', mapActions.infoWindowUpdated);
      response.map.on('zoom-end', mapActions.mapUpdated);

      //- Add a scalebar
      scalebar = new Scalebar({
        map: response.map,
        scalebarUnit: 'metric'
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
        //- Add click event for user-features layer
        const userFeaturesLayer = response.map.getLayer(layerKeys.USER_FEATURES);
        userFeaturesLayer.on('click', (evt) => {
          if (evt.graphic && evt.graphic.attributes) {
            evt.stopPropagation();
            response.map.infoWindow.setFeatures([evt.graphic]);
          }
        });
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
    // If an additional language is configured but no additional webmap is, we need to push the layer config into both
    // languages so the original webmap works in both views
    const saveLayersInOtherLang = (
      !settings.alternativeWebmap &&
      settings.alternativeLanguage &&
      settings.useAlternativeLanguage
    );
    // Add the layers to the webmap group
    operationalLayers.forEach((layer) => {
      if (layer.layerType === 'ArcGISMapServiceLayer' && layer.resourceInfo.layers) {
        layer.resourceInfo.layers.forEach((sublayer) => {
          const visible = layer.layerObject.visibleLayers.indexOf(sublayer.id) > -1;
          const scaleDependency = (sublayer.minScale > 0 || sublayer.maxScale > 0);
          const layerInfo = {
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
          };
          settings.layers[language].push(layerInfo);
          if (saveLayersInOtherLang) {
            settings.layers[settings.alternativeLanguage].push(layerInfo);
          }
        });
      } else if (layer.layerType === 'ArcGISFeatureLayer' && layer.featureCollection && layer.featureCollection.layers) {
        layer.featureCollection.layers.forEach((sublayer) => {
          const layerInfo = {
            id: sublayer.id,
            group: settings.labels[language].webmapMenuName,
            groupKey: layerKeys.GROUP_WEBMAP,
            label: sublayer.title,
            opacity: sublayer.opacity,
            visible: layer.visibility,
            esriLayer: sublayer.layerObject,
            itemId: layer.itemId
          };
          settings.layers[language].push(layerInfo);
          if (saveLayersInOtherLang) {
            settings.layers[settings.alternativeLanguage].push(layerInfo);
          }
        });
      } else {
        const layerInfo = {
          id: layer.id,
          group: settings.labels[language].webmapMenuName,
          groupKey: layerKeys.GROUP_WEBMAP,
          label: layer.title,
          opacity: layer.opacity,
          visible: layer.visibility,
          esriLayer: layer.layerObject,
          itemId: layer.itemId
        };
        settings.layers[language].push(layerInfo);
        if (saveLayersInOtherLang) {
          settings.layers[settings.alternativeLanguage].push(layerInfo);
        }
      }
    });
  };

  render () {
    const {
      printModalVisible,
      analysisModalVisible,
      searchModalVisible,
      canopyModalVisible,
      layerModalVisible,
      modalLayerInfo
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
        <div className={`layer-modal-container modal-wrapper ${layerModalVisible ? '' : 'hidden'}`}>
          <LayerModal info={modalLayerInfo} />
        </div>
      </div>
    );
  }
}
