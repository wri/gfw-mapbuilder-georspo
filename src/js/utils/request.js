// import {layerConfig, errors} from 'js/config';
// import SpatialReference from 'esri/SpatialReference';
// import GraphicsHelper from 'helpers/GraphicsHelper';
// import GeoProcessor from 'esri/tasks/Geoprocessor';
// import FeatureSet from 'esri/tasks/FeatureSet';
import FindParameters from 'esri/tasks/FindParameters';
import QueryTask from 'esri/tasks/QueryTask';
import FindTask from 'esri/tasks/FindTask';
import esriRequest from 'esri/request';
import Query from 'esri/tasks/query';
import Deferred from 'dojo/Deferred';
// import utils from 'utils/AppUtils';
// import KEYS from 'js/constants';

const request = {

  /**
  * @param {string} url - Url for an esri map service
  * @param {array} layerIds - An array of layer ids
  * @return {Deferred} deferred - A promise, will return either an array of layerInfos or an empty array
  */
  getLegendInfos: (url, layerIds) => {
    let deferred = new Deferred();

    esriRequest({
      url: `${url}/legend`,
      handleAs: 'json',
      callbackParamName: 'callback',
      content: { f: 'json' }
    }).then(res => {
      if (res && res.layers && res.layers.length > 0) {
        let layers = res.layers.filter(layer => layerIds.indexOf(layer.layerId) > -1);
        let legendInfos = layers.length === 1 ? layers[0].legend : layers.map(layer => layer.legend);
        deferred.resolve(legendInfos || []);
      }
    }, err => {
      console.error(err);
      deferred.resolve([]);
    });

    return deferred;
  },

  /**
  * @param {string} url - Portal URL for the generate features service
  * @param {object} content - payload for the request
  * @param {DOM} form - form containing an input with files attached to it
  * @return {promise}
  */
  upload (url, content, form) {
    return esriRequest({
      url: url,
      form: form,
      content: content,
      handleAs: 'json'
    });
  },

  queryTaskById (url, objectId) {
    const task = new QueryTask(url);
    const query = new Query();
    query.objectIds = [objectId];
    query.outFields = ['*'];
    query.returnGeometry = true;
    query.maxAllowableOffset = 0;
    return task.execute(query);
  },

  queryTaskByGeometry (url, geometry) {
    const task = new QueryTask(url);
    const query = new Query();
    query.returnGeometry = false;
    query.maxAllowableOffset = 0;
    query.geometry = geometry;
    query.outFields = ['*'];
    return task.execute(query);
  },

  findTaskByLayer (searchValue, options) {
    const task = new FindTask(options.url);
    const params = new FindParameters();
    params.returnGeometry = false;
    params.searchText = searchValue;
    if (options.visibleLayers) {
      params.layerIds = options.visibleLayers;
    }
    return task.execute(params);
  }

};

export {request as default};
