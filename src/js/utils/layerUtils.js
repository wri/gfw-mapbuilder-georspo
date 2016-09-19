import InfoTemplate from 'esri/InfoTemplate';
import esriRequest from 'esri/request';

export default {
  getLayerMetadata: (url) => {
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
