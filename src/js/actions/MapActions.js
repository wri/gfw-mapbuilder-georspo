import dispatcher from 'js/dispatcher';
import layerFactory from 'helpers/LayerFactory';
import legendHelper from 'helpers/LegendHelper';
import landsatHelper from 'helpers/LandsatHelper';

class MapActions {
  //- Action to notify the store the map has changed so we can rerender UI changes
  //- if necessary
  mapUpdated () {
    return {};
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

  toggleAnalysisModal (data) {
    return data;
  }

  togglePrintModal (data) {
    return data;
  }

  toggleSearchModal (data) {
    return data;
  }

  toggleCanopyModal (data) {
    return data;
  }

  updateCanopyDensity (density) {
    return { density };
  }

  toggleLegendVisible = () => { return {}; };

  // setSelectedFeature (evt) {
  //   let {target} = evt;
  //   return {
  //     feature: target.getSelectedFeature ? target.getSelectedFeature() : undefined
  //   };
  // }

  createLayers (map, layers) {
    brApp.debug('MapActions >>> createLayers');
    //- make sure there's only one entry for each dynamic layer
    let uniqueLayers = [];
    let existingIds = [];
    layers.forEach(layer => {
      if (existingIds.indexOf(layer.id) === -1) {
        uniqueLayers.push(layer);
        existingIds.push(layer.id);
      }
    });
    // console.log('existingIds', existingIds);
    //- remove layers from config that have no url unless they are of type graphic(which have no url)
    //- sort by order from the layer config
    //- return an arcgis layer for each config object
    // let esriLayers = layers.filter(layer => layer && (layer.url || layer.type === 'graphic')).sort((a, b) => a.order - b.order).map(layerFactory);
    let esriLayers = uniqueLayers.filter(layer => layer && (layer.url || layer.type === 'graphic')).sort((a, b) => a.order - b.order).map(layerFactory);
    map.addLayers(esriLayers);
    // If there is an error with a particular layer, handle that here
    map.on('layers-add-result', result => {
      let addedLayers = result.layers;
      // Check for Errors
      var layerErrors = addedLayers.filter(layer => layer.error);
      if (layerErrors.length > 0) { console.error(layerErrors); }
      // Connect events to the layers that need them
      // LayersHelper.connectLayerEvents();
    });
    //- Return the layers through the dispatcher so the mapstore can update visible layers
    return layers;
  }

  changeBasemap (map, basemap) {
    basemap = basemap.toLowerCase();
    map.setBasemap(basemap);
    return basemap;
  }

  toggleLandsat (map, lang) {
    return landsatHelper.toggle(map, lang);
  }

  changeLandsatYear (map, lang, year) {
    landsatHelper.changeYear(map, lang, year);
  }

  createLegend(map, layers) {
    legendHelper({
      map: map
    }, 'legend');
  }

}

export default dispatcher.createActions(MapActions);
