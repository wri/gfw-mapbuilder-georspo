import esriRequest from 'esri/request';
import esriConfig from 'esri/config';

export default {
  getLayerMetadata: (url) => {

    const domain = 'gis-treecover.wri.org';
    const cors = esriConfig.defaults.io.corsEnabledServers;
    if ( cors.indexOf(domain) === -1 ) {
      cors.push(domain);
    }

    return esriRequest({
      url: url,
      content: {
        f: 'json'
      }
    });
  }
};
