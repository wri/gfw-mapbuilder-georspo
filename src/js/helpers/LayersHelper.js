import layerKeys from 'constants/LayerConstants';
import rasterFuncs from 'utils/rasterFunctions';
import resources from 'resources';

let LayersHelper = {

  /**
  * @param {string} layerId - id of layer to show
  */
  showLayer (layerId) {
    let layer = brApp.map.getLayer(layerId);
    if (layer) { layer.show(); }
  },
  showSubLayer (layer) {
    let {esriLayer} = layer;
    esriLayer.setVisibleLayers(esriLayer.visibleLayers);
  },
  /**
  * @param {string} layerId - id of layer to hide
  */
  hideLayer (layerId) {
    let layer = brApp.map.getLayer(layerId);
    if (layer) { layer.hide(); }
  },
  hideSubLayer (layer) {
    let {esriLayer} = layer;
    esriLayer.setVisibleLayers(esriLayer.visibleLayers);
  },

  /**
  * @param {number} optionIndex - Index of the selected option in the UI, see js/config
  * @param {boolean} dontRefresh - Whether or not to not fetch a new image
  */
  updateFiresLayerDefinitions (optionIndex, dontRefresh) {
    return;
    // let value = layerPanelText.firesOptions[optionIndex].value || 1; // 1 is the default value, means last 24 hours
    // let queryString = this.generateFiresQuery(value);
    // let firesLayer = brApp.map.getLayer(layerKeys.ACTIVE_FIRES);
    // let defs = [];
    //
    // if (firesLayer) {
    //   firesLayer.visibleLayers.forEach(val => { defs[val] = queryString; });
    //   firesLayer.setLayerDefinitions(defs, dontRefresh);
    // }
  },

  /**
  * Generate a date query for active fires layers
  * @param {number} filterValue - Numeric value representing the number of days to show in the output query
  * @return {string} Query String to use for Fires Filter
  */
  generateFiresQuery (filterValue) {
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

  isLayerVisible (layerInfo) {
    // Non-webmap layers, always assume visible.
    let visible = true;
    // Layers have a visibleAtMapScale property which make this easy.
    if (layerInfo.esriLayer && layerInfo.esriLayer.loaded && !layerInfo.esriLayer.visibleAtMapScale) {
      visible = false;
    }
    if (brApp.map && layerInfo.esriLayer) {
      // Explicitly check scale depencency for sub-layers in a dynamic map service.
      let scale = brApp.map.getScale();
      if (layerInfo.hasScaleDependency && (scale > layerInfo.minScale || scale < layerInfo.maxScale)) {
        visible = false;
      }
    }
    return visible;
  }

};

export { LayersHelper as default };
