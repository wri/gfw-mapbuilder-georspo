import esriRequest from 'esri/request';
import basemaps from 'esri/basemaps';

// TODO:  move this somewher else.
import esriConfig from 'esri/config';

let basemapNames = Object.keys(basemaps);

export default {
  getLayerMetadata: (url) => {

    let domain = 'gis-treecover.wri.org';
    let cors = esriConfig.defaults.io.corsEnabledServers;
    if ( cors.indexOf(domain) === -1 ) {
      cors.push(domain);
    }

    return esriRequest({
      url: url,
      content: {
        f: 'json'
      }
    });
  },

  getBasemapName: (basemapLayers) => {
    console.log('getBasemapName', basemapLayers);
    let name;
    basemapLayers.forEach((layer) => {
      let url = layer.url.toLowerCase().replace(/_/g, '-');
      for ( let i = 0; i < basemapNames.length; i++ ) {
        if (url.indexOf(basemapNames[i]) > -1 ) {
          name = basemapNames[i];
          console.log('getBasemapName found one!', name);
          break;
        }
      }
    })
    return name || 'topo';
  }
}
