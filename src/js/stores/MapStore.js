import analysisKeys from 'constants/AnalysisConstants';
import layerInfoCache from 'utils/layerInfoCache';
import {attributes} from 'constants/AppConstants';
import layerKeys from 'constants/LayerConstants';
import tabKeys from 'constants/TabViewConstants';
import appActions from 'actions/AppActions';
import mapActions from 'actions/MapActions';
import layerActions from 'actions/LayerActions';
import dispatcher from 'js/dispatcher';
import LayersHelper from 'helpers/LayersHelper';
import {layerPanelText} from 'js/config';

class MapStore {

  constructor () {

    //- Default is closed, using any value as default will cause an ugly
    //- appearance on mobile when loading, set the default in TabButtons componentWillReceiveProps
    //- the default may change based on device, and content available from AGOL
    this.activeTab = '';

    this.activeLayers = [];
    this.allLayers = [];
    this.basemap = null;
    this.legendOpen = false;
    this.landsatVisible = false;
    this.dynamicLayers = {};
    this.activeAnalysisType = analysisKeys.TC_LOSS;
    this.lossFromSelectIndex = 0; // Will get initialized when the data is fetched
    this.lossToSelectIndex = 0;
    this.lossOptions = [];
    this.firesSelectIndex = layerPanelText.firesOptions.length - 1;
    this.tableOfContentsVisible = true;
    this.activeTOCGroup = layerKeys.GROUP_WEBMAP;
    this.analysisModalVisible = false;
    this.printModalVisible = false;
    this.searchModalVisible = false;
    this.canopyModalVisible = false;
    this.layerModalVisible = false;
    this.canopyDensity = 30;
    this.activeSlopeClass = null;
    this.modalLayerInfo = '';

    this.bindListeners({
      setDefaults: appActions.applySettings,
      mapUpdated: mapActions.mapUpdated,
      infoWindowUpdated: mapActions.infoWindowUpdated,
      createLayers: mapActions.createLayers,
      changeActiveTab: mapActions.changeActiveTab,
      setAnalysisType: mapActions.setAnalysisType,
      togglePrintModal: mapActions.togglePrintModal,
      toggleSearchModal: mapActions.toggleSearchModal,
      toggleCanopyModal: mapActions.toggleCanopyModal,
      toggleAnalysisModal: mapActions.toggleAnalysisModal,
      toggleLayerModal: mapActions.toggleLayerModal,
      showLayerInfo: mapActions.showLayerInfo,
      toggleTOCVisible: mapActions.toggleTOCVisible,
      openTOCAccordion: mapActions.openTOCAccordion,
      updateCanopyDensity: mapActions.updateCanopyDensity,
      changeBasemap: mapActions.changeBasemap,
      updateActiveSlopeClass: mapActions.updateActiveSlopeClass,
      addActiveLayer: layerActions.addActiveLayer,
      removeActiveLayer: layerActions.removeActiveLayer,
      toggleLegendVisible: mapActions.toggleLegendVisible,
      addSubLayer: layerActions.addSubLayer,
      removeSubLayer: layerActions.removeSubLayer,
      changeFiresTimeline: layerActions.changeFiresTimeline,
      addAll: layerActions.addAll,
      removeAll: layerActions.removeAll,
      setLossOptions: layerActions.setLossOptions,
      updateLossTimeline: layerActions.updateLossTimeline,
      changeOpacity: layerActions.changeOpacity
    });
  }

  setDefaults (settings) {
    //- Set the default value to the first actual value in the select, 0 is No Data
    this.activeSlopeClass = settings.slopeClasses && settings.slopeClasses[1];
  }

  addActiveLayer (layerId) {
    const index = this.activeLayers.indexOf(layerId);
    if (index === -1) {
      // Create a copy of the strings array for easy change detection
      const layers = this.activeLayers.slice();
      layers.push(layerId);
      this.activeLayers = layers;
    }
  }

  removeActiveLayer (layerId) {
    const index = this.activeLayers.indexOf(layerId);
    if (index !== -1) {
      // Create a copy of the strings array for easy change detection
      const layers = this.activeLayers.slice();
      layers.splice(index, 1);
      this.activeLayers = layers;
    }
  }

  addSubLayer (info) {
    this.dynamicLayers[info.id].push(info.subIndex);
    this.addActiveLayer(info.subId);
  }

  removeSubLayer (info) {
    const subLayerIndex = this.dynamicLayers[info.id].indexOf(info.subIndex);
    if (subLayerIndex > -1) {
      this.dynamicLayers[info.id].splice(subLayerIndex, 1);
    }
    this.removeActiveLayer(info.subId);
  }

  addAll () {
    this.activeLayers = this.allLayers.map(l => l.id);
    this.allLayers.forEach((layer) => {
      if (layer.subId) {
        this.dynamicLayers[layer.id] = layer.esriLayer._defaultVisibleLayers.slice();
      }
    });
  }

  removeAll () {
    this.activeLayers = [];
    //- Reset the webmap layers
    Object.keys(this.dynamicLayers).forEach((layerId) => {
      this.dynamicLayers[layerId] = [];
    });
  }

  mapUpdated () {}

  infoWindowUpdated (selectedFeature) {
    if (selectedFeature) {
      // If this is a custom feature, active tab should be the analysis tab
      if (selectedFeature.attributes && selectedFeature.attributes.__source === attributes.SOURCE_DRAW) {
        this.activeTab = tabKeys.ANALYSIS;
      } else {
        this.activeTab = tabKeys.INFO_WINDOW;
      }
    }
  }

  createLayers (layers) {
    this.activeLayers = layers.filter((layer) => layer.visible && !layer.subId).map((layer) => layer.id);
    this.allLayers = layers;
    layers.forEach(layer => {
      if (layer.type === 'dynamic' || layer.subId) {
        if (layer.esriLayer && !this.dynamicLayers.hasOwnProperty(layer.id)) {
          this.dynamicLayers[layer.id] = layer.esriLayer.visibleLayers.slice();
        }
        if (layer.subId && layer.esriLayer.visibleLayers.indexOf(layer.subIndex) > -1) {
          if (LayersHelper.isLayerVisible(layer)) {
            this.activeLayers.push(layer.subId);
          }
        }
      }
    });
  }

  changeActiveTab (payload) {
    this.activeTab = payload.id;
  }

  setAnalysisType (payload) {
    this.activeAnalysisType = payload.type;
  }

  toggleAnalysisModal (payload) {
    this.analysisModalVisible = payload.visible;
  }

  togglePrintModal (payload) {
    this.printModalVisible = payload.visible;
  }

  toggleCanopyModal (payload) {
    this.canopyModalVisible = payload.visible;
  }

  toggleLayerModal (payload) {
    this.layerModalVisible = payload.visible;
  }

  updateCanopyDensity (payload) {
    this.canopyDensity = payload.density;
  }

  toggleSearchModal (payload) {
    this.searchModalVisible = payload.visible;
  }

  toggleTOCVisible (payload) {
    this.tableOfContentsVisible = payload.visible;
  }

  openTOCAccordion (groupKey) {
    this.activeTOCGroup = groupKey;
  }

  setLossOptions (lossOptionsData) {
    this.lossOptions = lossOptionsData;
  }

  changeFiresTimeline (firesSelectIndex) {
    this.firesSelectIndex = firesSelectIndex;
  }

  updateActiveSlopeClass (newSlopeClass) {
    this.activeSlopeClass = newSlopeClass;
  }

  updateLossTimeline (payload) {
    this.lossFromSelectIndex = payload.from;
    this.lossToSelectIndex = payload.to;
  }

  showLayerInfo (layer) {
    // Grab the id of the sublayer if it exists, else, grab the normal id
    const id = layer.subId ? layer.subId : layer.id;
    const info = layerInfoCache.get(id);
    if (info) {
      this.modalLayerInfo = info;
      this.layerModalVisible = true;
    } else {
      layerInfoCache.fetch(layer).then(layerInfo => {
        this.modalLayerInfo = layerInfo;
        this.layerModalVisible = true;
        this.emitChange();
      });
    }
  }

  changeOpacity (parameters) {
    const layer = this.allLayers.filter(l => l.id === parameters.layerId);
    console.log('MapStore >>> found a layer?', layer, parameters.layerId);
    if ( layer[0] ) {
      layer[0].opacity = parseFloat(parameters.value);
    }
  }

  changeBasemap (basemap) {
    this.basemap = basemap;
  }

  toggleLandsat (visible) {
    this.landsatVisible = visible;
  }

  toggleLegendVisible () {
    this.legendOpen = !this.legendOpen;
  }

}

export default dispatcher.createStore(MapStore, 'MapStore');
