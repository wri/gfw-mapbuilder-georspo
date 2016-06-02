import {toQuery} from 'utils/params';

const utils = {
  /**
  * Retrieve the object from a given array based on id and value
  * @param {array} - items - Array to search
  * @param {string} - field - Property of unique identifier in object
  * @param {string} - value - value of the unique id
  * @return {Any} - Return whatever object is matched
  */
  getObject: (items, field, value) => {
    let obj;
    items.some((item) => {
      if (item[field] === value) {
        obj = item;
        return true;
      }
    });
    return obj;
  },

  /**
  * Retrieve the object from a given array based on id and value
  * @param {array} - items - Array to search
  * @param {string} - field - Property of unique identifier in object
  * @param {string} - value - value of the unique id
  * @return {boolean} - Return true if object is matched
  */
  containsObject: (items, field, value) => {
    return items.some(item => item[field] === value);
  },

  /**
  * Checks to make sure lat and lng are within global bounds
  * @param {number} lat - Latitude
  * @param {number} lon - Longitude
  * @return {boolean}
  */
  validLatLng: (lat, lon) => {
    return (lat > -90 && lat < 90) && (lon > -180 && lon < 180);
  },

  /**
  * Return true if the document.execCommand exists
  * @return {boolean}
  */
  supportsExecCommand: () => typeof document !== 'undefined' && !!document.execCommand,

  /**
  * Return true if we can succesfully copy item to clipboard, this will query element
  * and try to put the focus on it so we can copy it correctly
  * @param {HTML element} el - Input element
  * @return {boolean}
  */
  copySelectionFrom: el => {
    let status = false;
    if (!utils.supportsExecCommand()) {
      return status;
    }
    // Highlight the input
    el.select();
    // This may not work in all scenarios, wrap in a try catch to prevent any errors
    // and handle accordingly
    try {
      status = document.execCommand('copy');
    } catch (err) {
      console.error(err);
    }
    return status;
  },

  clone: (sourceObject) => {
    return JSON.parse(JSON.stringify(sourceObject));
  },

  /**
  * @param {object} options
  * @property {object} options.selectedFeature - Selected feature should come from infoWindow.getSelectedFeature()
  * @property {string} options.webmap - webmap id
  * @property {string} options.appid - app id
  * @property {string} options.lang - two digit iso code representing current language, en || es || fr || pt
  * @property {number} options.canopyDensity - Current tree cover density settings
  */
  generateReport: (options) => {
    /** webmap or appid
    * Other Params needed
    DONE** title
    DONE** subtitle
    DONE** layerid - layer number in dynamic service
    DONE** service - map service of selected feature
    DONE** idvalue - objectid of the selected feature
    DONE** layerName - id of the layer from AGOL, I need this to add attributes
    ** basemap - basemap to use, default is topo
    ** visibleLayers - visible layers of dynamic layer selected feature belongs too, default is all
    DONE** tcd - tree cover density
    DONE** lang - current app language
    */
    const { selectedFeature, settings, lang, canopyDensity } = options;

    //- Is this a custom feature or a feature from the webmap
    const layer = selectedFeature._layer;
    //- NOTE: LAYER ID FOR REPORT
    //- Depending on how they created the layer in AGOL, there may be different ways to parse these values
    const getLayerId = function getLayerId () {
      return layer.source ? layer.source.mapLayerId : layer.layerId;
    };
    //- from service
    if (layer.url) {
      const objectIdField = layer.objectIdField;
      const idvalue = selectedFeature.attributes[objectIdField];
      const layerid = getLayerId(layer);
      const layerName = layer.id;
      //- NOTE: SERVICE URL FOR REPORT
      //- This may need more testing, the report needs only the service url, see the following:
      //- http://gis..../MapServer and not http://gis..../MapServer/8
      //- http://gis..../MapServer and not http://gis..../MapServer/dynamicServer
      //- These can also vary by how they are created in AGOL
      const service = layer.url.slice(0, layer.url.lastIndexOf('/'));
      const labels = settings.labels[lang];

      const path = toQuery({
        title: labels.title,
        subtitle: labels.subtitle,
        logoUrl: settings.logoUrl,
        logoLinkUrl: settings.logoLinkUrl,
        webmap: settings.webmap,
        idvalue: idvalue,
        service: service,
        layerid: layerid,
        layerName: layerName,
        tcd: canopyDensity,
        lang: lang
      });

      window.open(`report.html?${path}`);

    } else { //- custom
      console.log(`Custom feature: ${selectedFeature}`);
    }

  }

};

export { utils as default };
