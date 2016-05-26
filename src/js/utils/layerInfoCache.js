/**
* Cache for information about each layer, to be shown in the modal
*/
import esriRequest from 'esri/request';
import Deferred from 'dojo/Deferred';
import {urls} from 'js/config';

const _cache = {};

/**
* Fetch the metadata from GFW's Metadata API
* @param {string} url - api url plus technical name, e.g. urls.metadataApi + '/tree_cover_loss'
* @return {Deferred} promise
*/
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

/**
* Fetch the metadata from ArcGIS Online via the item Id
* @param {string} url - Url includes the item id and refers to ArcGIS Online sharing url, urls.metadataXmlEndpoint(layer.itemId)
* @return {Deferred} promise
*/
function getXMLTask (url) {
  return esriRequest({
    url,
    handleAs: 'xml',
    callbackParamName: 'callback'
  });
}

/**
* Fetch the metadata from ArcGIS MapService, this is the last resort
* @param {string} url - Map Service URL
* @return {Deferred} promise
*/
function getServiceInfoTask (url) {
  return esriRequest({
    url,
    handleAs: 'json',
    content: {f: 'json'},
    callbackParamName: 'callback'
  });
}

/**
* Reduce the xml document to the desired JSON format
* @param {document} xmlDoc - xml document to parse
* @return {object} result
* @return {string} result.title
* @return {string} result.subtitle
* @return {string} result.cautions
* @return {string} result.overview
* @return {string} result.citation
* @return {string} result.source
* @return {string} result.other
* @return {string} result.function
* @return {string} result.download_data
* @return {string} result.tags
* @return {string} result.learn_more
* @return {string} result.frequency_of_updates
* @return {string} result.geographic_coverage
* @return {string} result.license
* @return {string} result.date_of_content
* @return {string} result.resolution
*/
function reduceXML (xmlDoc) {
  const result = {};
  const cautions = xmlDoc.getElementsByTagName('useLimit'),
        subtitle = xmlDoc.getElementsByTagName('resAltTitle'),
        overview = xmlDoc.getElementsByTagName('idAbs'),
        citation = xmlDoc.getElementsByTagName('otherCitDet'),
        title = xmlDoc.getElementsByTagName('resTitle'),
        source = xmlDoc.getElementsByTagName('srcDesc'),
        other = xmlDoc.getElementsByTagName('suppInfo'),
        functions = xmlDoc.getElementsByTagName('idPurp'),
        download_data = xmlDoc.getElementsByTagName('linkage'),
        tags = xmlDoc.getElementsByTagName('searchKeys'),
        learn_more = xmlDoc.getElementsByTagName('linkage'),
        frequency_of_updates = xmlDoc.getElementsByTagName('duration'),
        geographic_coverage = xmlDoc.getElementsByTagName('exDesc'),
        license = xmlDoc.getElementsByTagName('othConsts'),
        date_of_content = xmlDoc.getElementsByTagName('exDesc'),
        resolution = xmlDoc.getElementsByTagName('rfDenom');

  if (cautions.length) {
    result.cautions = cautions[0].innerHTML;
  }

  if (subtitle.length) {
    result.subtitle = subtitle[0].innerHTML;
  }

  if (overview.length) {
    result.overview = overview[0].innerHTML;
  }

  if (citation.length) {
    result.citation = citation[0].innerHTML;
  }

  if (title.length) {
    result.title = title[0].innerHTML;
  }

  if (source.length) {
    result.source = source[0].innerHTML;
  }

  if (other.length) {
    result.other = other[0].innerHTML;
  }

  if (functions.length) {
    result.function = functions[0].innerHTML;
  }

  if (download_data.length) {
    const parentName = 'onLineSrc';
    const download_data_elements = [];
    for (let i = 0; i < download_data.length; i++) {
      if (download_data[i].parentElement.nodeName === parentName) {
        download_data_elements.push(download_data[i]);
      }
    }
    if (download_data_elements.length) {
      result.download_data = download_data_elements[0].innerHTML;
    }
  }

  if (tags.length) {
    const keywords = [];
    const tag = tags[0];
    for (let i = 0; i < tag.children.length; i++) {
      keywords.push(tag.children[i].innerHTML);
    }
    result.tags = keywords.join(', ');
  }

  if (learn_more.length) {
    const parentName = 'citOnlineRes';
    const learn_more_elements = [];
    for (let i = 0; i < learn_more.length; i++) {
      if (learn_more[i].parentElement.nodeName === parentName) {
        learn_more_elements.push(learn_more[i]);
      }
    }
    if (learn_more_elements.length) {
      result.learn_more = learn_more_elements[0].innerHTML;
    }
  }

  if (frequency_of_updates.length) {
    result.subtitle = frequency_of_updates[0].innerHTML;
  }

  if (geographic_coverage.length) {
    result.subtitle = geographic_coverage[0].innerHTML;
  }

  if (license.length) {
    result.subtitle = license[0].innerHTML;
  }

  if (date_of_content.length) {
    result.subtitle = date_of_content[0].innerHTML;
  }

  if (resolution.length) {
    result.subtitle = resolution[0].innerHTML;
  }

  return result;
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
        promise.resolve(reduceXML(xmlDocument));
      });
    } else if (layer.esriLayer) {
      const {esriLayer, subIndex, subId} = layer;
      url = `${esriLayer.url}/${subIndex !== undefined ? subIndex : ''}`;
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
