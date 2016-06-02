import dispatcher from 'js/dispatcher';
import layerFactory from 'utils/layerFactory';
import layerKeys from 'constants/LayerConstants';

class MapActions {
  //- Action to notify the store the map has changed so we can rerender UI changes
  //- if necessary
  mapUpdated () { return {}; }

  infoWindowUpdated ({target}) {
    return (target && target.getSelectedFeature && target.getSelectedFeature()) || false;
  }

  changeActiveTab (tabId) {
    return {
      id: tabId
    };
  }

  setAnalysisType (evt) {
    return {
      type: evt.target.value
    };
  }

  //- Straight through dispatches, all have the following format
  /**
  * @param {object} - data
  * @param {boolean} - data.visible
  * @return {object} - data
  */
  toggleAnalysisModal = (data) => data;
  togglePrintModal = (data) => data;
  toggleSearchModal = (data) => data;
  toggleCanopyModal = (data) => data;
  toggleLayerModal = (data) => data;
  toggleTOCVisible = (data) => data;
  showLayerInfo = (layer) => layer;

  changeBasemap (basemap) {
    return basemap;
  }

  toggleLegendVisible = () => { return {}; };

  updateCanopyDensity (density) {
    return { density };
  }

  updateActiveSlopeClass (classValue) {
    return classValue;
  }

  openTOCAccordion (groupKey) {
    return groupKey;
  }

  createLayers (map, layers, activeLayers) {
    //- make sure there's only one entry for each dynamic layer
    const uniqueLayers = [];
    const existingIds = [];
    layers.forEach(layer => {
      if (existingIds.indexOf(layer.id) === -1) {
        uniqueLayers.push(layer);
        existingIds.push(layer.id);
      }
    });
    //- If we are changing webmaps, and any layer is active, we want to make sure it shows up as active in the new map
    //- Make those updates here to the config as this will trickle down
    uniqueLayers.forEach(layer => {
      layer.visible = activeLayers.indexOf(layer.id) > -1 || layer.visible;
    });
    //- remove layers from config that have no url unless they are of type graphic(which have no url)
    //- sort by order from the layer config
    //- return an arcgis layer for each config object
    const esriLayers = uniqueLayers.filter(layer => layer && (layer.url || layer.type === 'graphic')).sort((a, b) => a.order - b.order).map(layerFactory);
    map.addLayers(esriLayers);
    // If there is an error with a particular layer, handle that here
    map.on('layers-add-result', result => {
      const addedLayers = result.layers;
      // Check for Errors
      var layerErrors = addedLayers.filter(layer => layer.error);
      if (layerErrors.length > 0) { console.error(layerErrors); }
      //- Sort the layers, Some layers need to be put beneath the layers from the webmap
      const landCoverLayers = layers.filter((layer) => layer.groupKey === layerKeys.GROUP_LC);
      landCoverLayers.forEach((layer) => {
        map.reorderLayer(map.getLayer(layer.id), layer.order);
      });
    });
    //- Return the layers through the dispatcher so the mapstore can update visible layers
    return layers;
  }

}

export default dispatcher.createActions(MapActions);
