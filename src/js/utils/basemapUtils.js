import WebTiledLayer from 'esri/layers/WebTiledLayer';
import appUtils from 'utils/AppUtils';
import mapActions from 'actions/MapActions';
import basemaps from 'esri/basemaps';

const mapboxToken = 'pk.eyJ1Ijoid3JpIiwiYSI6IjU3NWNiNGI4Njc4ODk4MmIyODFkYmJmM2NhNDgxMWJjIn0.v1tciCeBElMdpnrikGDrPg';
const mapboxApiBase = 'https://api.tiles.mapbox.com/v4/';
const mapboxLabelsId = 'wri.acf5a04e';
const newBasemapIndex = 0;
const newBasemapLabelsIndex = 1;

const mono_mapboxid = 'wri.c974eefc';
const contextual_mapboxid = 'wri.b71b0f45';

const landsatLayerId = 'LANDSAT';

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
    if (map.basemapLayerIds) {
      map.basemapLayerIds.forEach((id) => {
        map.getLayer(id).hide();
      });
    }

    //- If the basemap is that of a arcgis basemap, update it here
    if (this.arcgisBasemaps.indexOf(basemap) > -1) {
      //- Update the arcgis basemap
      map.setBasemap(basemap);
    }

    //- if the basemap is a WRI Mono Basemap, add/update that here
    if (basemap === 'wri_mono') {
      this.addWRILayer(map, mono_mapboxid);
    }

    //- if the basemap is a WRI Contextual Basemap, add/update that here
    if (basemap === 'wri_contextual') {
      this.addWRILayer(map, contextual_mapboxid);
    }

    //- if it is a landsat basemap, add/update that here
    if (basemap === 'landsat') {
      const landsatConfig = appUtils.getObject(customBasemaps, 'id', 'landsat');
      this.addLandsatBasemap(map, landsatConfig);
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
    customBasemapLayer = new WebTiledLayer(config.templateUrl, { id: landsatLayerId });
    map.addLayer(customBasemapLayer, newBasemapIndex);
  },

  changeLandsatYear (map, year, config) {
    if (customBasemapLayer && customBasemapLayer.id === landsatLayerId) {
      map.removeLayer(customBasemapLayer);
    }
    // - Update the template and add the layer
    const template = config.templateUrl.replace(/\/\d{4}\//, `/${year}/`);
    customBasemapLayer = new WebTiledLayer(template, { id: landsatLayerId });
    map.addLayer(customBasemapLayer, newBasemapIndex);
  },

  prepareDefaultBasemap (map, basemapLayers) {
    const basemapNames = Object.keys(basemaps);

    let arcgisBasemap, wriName;
    if (basemapLayers) {
      //- Check to see if this is a default esri basemap
      basemapLayers.forEach((layer) => {
        const url = layer.url && layer.url.toLowerCase().replace(/_/g, '-');
        //- If there is no URL, this is probably a custom basemap, so just return
        if (!url) { return; }
        //- Try to find the name so it can be added to the basemap gallery
        arcgisBasemap = basemapNames.filter((basemap) => {
          return url.indexOf(basemap) > -1;
        })[0];

        //- Check for other matches here that are known not to work with the above method
        if (!arcgisBasemap && url.indexOf('natgeo') > -1) {
          arcgisBasemap = 'national-geographic';
        }
      });

      //- Check to see if this is a WRI basemap
      basemapLayers.forEach((layer) => {
        const url = layer.templateUrl;
        if (url && url.indexOf(mono_mapboxid) > -1) {
          wriName = 'wri_mono';
        } else if (url && url.indexOf(contextual_mapboxid) > -1) {
          wriName = 'wri_contextual';
        }
      });

      //- Basemaps can cause issues with layer ordering and other things,
      //- remove them here and readd them above in updateBasemap
      basemapLayers.forEach(bm => map.removeLayer(bm.layerObject));
    }

    //- Set the default basemap, this will trigger an update from the LayerPanel
    //- It listens for changes to the basemap in the store, and then triggers updateBasemap above
    if (arcgisBasemap) {
      if (this.arcgisBasemaps.indexOf(arcgisBasemap) === -1) {
        this.arcgisBasemaps.push(arcgisBasemap);
      }
      mapActions.changeBasemap(arcgisBasemap);
    } else if (wriName) {
      mapActions.changeBasemap(wriName);
    } else if (map.getBasemap()) {
      mapActions.changeBasemap(map.getBasemap());
    } else {
      //- Use this as a fallback
      mapActions.changeBasemap('wri_mono');
    }

    //- TODO: Add support for a custom basemap
  }

};
