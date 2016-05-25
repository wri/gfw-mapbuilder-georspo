import layerInfoCache from 'utils/layerInfoCache';
import modalActions from 'actions/ModalActions';
import dispatcher from 'js/dispatcher';
import domClass from 'dojo/dom-class';

class ModalStore {

  constructor () {
    this.bitlyUrl = '';
    this.modalLayerInfo = {};
    this.basicModalText = '';
    this.basicModalTitle = '';

    this.bindListeners({
      showLayerInfo: modalActions.showLayerInfo,
      updateBitlyUrl: modalActions.showShareModal,
      showBasicModal: modalActions.showBasicModal
    });
  }

  showLayerInfo (layer) {
    // Grab the id of the sublayer if it exists, else, grab the normal id
    const id = layer.subId ? layer.subId : layer.id;
    const info = layerInfoCache.get(id);
    if (info) {
      domClass.remove('layer-modal', 'hidden');
      this.modalLayerInfo = info;
    } else {
      layerInfoCache.fetch(layer).then(layerInfo => {
        domClass.remove('layer-modal', 'hidden');
        this.modalLayerInfo = layerInfo;
        this.emitChange();
      });
    }
  }

  updateBitlyUrl (bitlyUrl) {
    this.bitlyUrl = bitlyUrl;
  }

  showBasicModal (payload) {
    this.basicModalText = payload.text;
    this.basicModalTitle = payload.title;
  }

}

export default dispatcher.createStore(ModalStore, 'ModalStore');
