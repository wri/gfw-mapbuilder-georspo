import InfoTemplate from 'esri/InfoTemplate';
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
  },

  /**
  * @param {object} config
  * @param {string} config.title - Title for the info template
  * @param {string} config.content - Content for the info template
  */
  makeInfoTemplate: (config) => {
    return new InfoTemplate(config);
  }
};
