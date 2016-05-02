import WebTiledLayer from 'esri/layers/WebTiledLayer';

const mapboxToken = 'pk.eyJ1Ijoid3JpIiwiYSI6IjU3NWNiNGI4Njc4ODk4MmIyODFkYmJmM2NhNDgxMWJjIn0.v1tciCeBElMdpnrikGDrPg';
const mapboxApiBase = 'https://api.tiles.mapbox.com/v4/';
const mapboxLabelsId = 'wri.acf5a04e';
const newBasemapIndex = 1;
const newBasemapLabelsIndex = 2;

let customBasemapLayer;
let customLabelLayer;

export default {

  arcgisBasemaps: ['satellite', 'hybrid', 'osm'],

  /**
  * Remove custom basemaps and hide the esri basemaps so only one is active at a time
  * then, add whichever basemap we need to, for custom layers, re add the layers, for
  * arcgis layers, just call setBasemap, this will unhide the layer if necessary
  */
  updateBasemap (map, basemap, customBasemaps) {

    //- Remove custom basemap layer if it exists
    if (customBasemapLayer) {
      map.removeLayer(customBasemapLayer);
    }

    //- Remove label layer if it exists
    if (customLabelLayer) {
      map.removeLayer(customLabelLayer);
    }

    //- Hide the esri basemap layers, this gives it a more pleasing visual appearance
    //- and prevents the flicker when switching between wri basemaps and arcgis basemaps
    map.basemapLayerIds.forEach((id) => {
      map.getLayer(id).hide();
    });

    //- If the basemap is that of a arcgis basemap, update it here
    if (this.arcgisBasemaps.indexOf(basemap) > -1) {
      //- Update the arcgis basemap
      map.setBasemap(basemap);
    }

    //- if the basemap is a WRI Mono Basemap, add/update that here
    if (basemap === 'wri_mono') {
      this.addWRILayer(map, customBasemaps.wri_mono.mapboxId);
    }

    //- if the basemap is a WRI Contextual Basemap, add/update that here
    if (basemap === 'wri_contextual') {
      this.addWRILayer(map, customBasemaps.wri_contextual.mapboxId);
    }

    //- if it is a landsat basemap, add/update that here
    if (basemap === 'landsat') {
      this.addLandsatBasemap(map, customBasemaps.landsat);
    }

  },

  addWRILayer (map, mapboxId) {
    //- level row and col and necessary in the url for the API to generate the correct url request
    const url = `${mapboxApiBase}${mapboxId}/` + '${level}/${col}/${row}.png?access_token=' + mapboxToken;
    const labelsUrl = `${mapboxApiBase}${mapboxLabelsId}/` + '${level}/${col}/${row}.png?access_token=' + mapboxToken;
    customBasemapLayer = new WebTiledLayer(url, {});
    customLabelLayer = new WebTiledLayer(labelsUrl, {});
    map.addLayer(customBasemapLayer, newBasemapIndex);
    map.addLayer(customLabelLayer, newBasemapLabelsIndex);
  },

  addLandsatBasemap (map, config) {
    customBasemapLayer = new WebTiledLayer(config.templateUrl, {});
    map.addLayer(customBasemapLayer, newBasemapIndex);
  },

  changeLandsatYear (map, year, config) {
    // - Update the template and add the layer
    const template = config.templateUrl.replace(/\/\d{4}\//, `/${year}/`);
    customBasemapLayer = new WebTiledLayer(template, {});
    map.addLayer(customBasemapLayer, newBasemapIndex);
  }

};
