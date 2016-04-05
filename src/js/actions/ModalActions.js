import {layerInformation} from 'js/config';
import domClass from 'dojo/dom-class';
import dispatcher from 'js/dispatcher';

class ModalActions {

  showLayerInfo (layerId) {
    let emptyObj = {};
    let layerInfo = layerInformation[layerId] || emptyObj;
    if (layerInfo !== emptyObj) {
      domClass.remove('layer-modal', 'hidden');
    }
    return layerInfo;
  }

  showShareModal (params) {
    //TODO: Generate a url from bitly that includes Map Store state, this way we can share params
    let url = document.location.href.split('?')[0];
    domClass.remove('share-modal', 'hidden');
    return `${url}?${params}`;
  }

  showAlertsModal () {
    domClass.remove('alerts-modal', 'hidden');
  }

  showCanopyModal () {
    domClass.remove('canopy-modal', 'hidden');
    return {};
  }

  showBasicModal (title, text) {
    this.dispatch({ title: title, text: text });
    domClass.remove('basic-modal', 'hidden');
  }

  hideModal (node) {
    domClass.add(node, 'hidden');
    return {};
  }

  updateCanopyDensity (newDensity) {
    this.dispatch(newDensity);
  }

}

export default dispatcher.createActions(ModalActions);
