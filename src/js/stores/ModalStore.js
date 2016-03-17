import modalActions from 'actions/ModalActions';
import dispatcher from 'js/dispatcher';

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

  showLayerInfo (layerInfo) {
    brApp.debug('ModalStore >>> showLayerInfo');
    console.log('layerInfo', layerInfo);
    this.modalLayerInfo = layerInfo;
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
