/**
* Cache for information about each layer, to be shown in the modal
*/
import esriRequest from 'esri/request';
import Deferred from 'dojo/Deferred';
import {urls} from 'js/config';

const _cache = {};

function getMetadataTask (url) {
  const promise = new Deferred();
  const request = new XMLHttpRequest();
  request.addEventListener('load', () => {
    promise.resolve(JSON.parse(request.response));
  });
  request.open('GET', url);
  request.send();
  return promise;
}

function getXMLTask (url) {
  return esriRequest({
    url,
    handleAs: 'xml',
    callbackParamName: 'callback'
  });
}

function getServiceInfoTask (url, content) {
  return esriRequest({
    url,
    content,
    handleAs: 'json',
    callbackParamName: 'callback'
  });
}

export default {

  get (layerId) {
    return _cache[layerId];
  },

  fetch (layer) {
    const promise = new Deferred();
    let url;
    // If a technicalName is configured, fetch from the metadata API
    // else, attempt to fetch it from the mapservice
    if (layer.technicalName) {
      url = `${urls.metadataApi}/${layer.technicalName}`;
      getMetadataTask(url).then(results => {
        _cache[layer.id] = results;
        promise.resolve(results);
      });
    } else if (layer.itemId) {
      url = urls.metadataXmlEndpoint(layer.itemId);
      getXMLTask(url).then(xmlDocument => {
        // console.log(xmlDocument.getElementsByTagName('linkage'));
        promise.resolve();
      });
    } else if (layer.esriLayer) {
      const {esriLayer, subIndex, subId} = layer;
      url = `${esriLayer.url}/${subIndex !== undefined ? subIndex : ''}`;
      // get from esriLayer json, no need to request it
      getServiceInfoTask(url, {f: 'json'}).then(results => {
        _cache[subId] = results;
        promise.resolve(results);
      });
    } else {
      promise.resolve();
    }
    return promise;
  }

};
