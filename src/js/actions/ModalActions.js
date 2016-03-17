import {layerInformation} from 'js/config';
import domClass from 'dojo/dom-class';
import dispatcher from 'js/dispatcher';

class ModalActions {

  showLayerInfo (layerId) {
    brApp.debug('ModalActions >>> showLayerInfo');
    let emptyObj = {};
    let layerInfo = layerInformation[layerId] || emptyObj;
    brApp.debug('ModalAction >>> layerInfo', layerInfo);
    console.log(layerInfo);
    if (layerInfo !== emptyObj) {
      domClass.remove('layer-modal', 'hidden');
    }
    return layerInfo;
  }

  showShareModal (params) {
    brApp.debug('ModalActions >>> showShareModal');
    //TODO: Generate a url from bitly that includes Map Store state, this way we can share params
    let url = document.location.href.split('?')[0];
    domClass.remove('share-modal', 'hidden');
    return `${url}?${params}`;
  }

  showAlertsModal () {
    brApp.debug('ModalActions >>> showAlertsModal');
    domClass.remove('alerts-modal', 'hidden');
  }

  showCanopyModal () {
    brApp.debug('ModalActions >>> showCanopyModal');
    domClass.remove('canopy-modal', 'hidden');
  }

  showBasicModal (title, text) {
    brApp.debug('ModalActions >>> showBasicModal');
    this.dispatch({ title: title, text: text });
    domClass.remove('basic-modal', 'hidden');
  }

  hideModal (node) {
    brApp.debug('ModalActions >>> hideModal');
    domClass.add(node, 'hidden');
  }

  updateCanopyDensity (newDensity) {
    brApp.debug('ModalActions >>> updateCanopyDensity');
    this.dispatch(newDensity);
  }

}

export default dispatcher.createActions(ModalActions);
