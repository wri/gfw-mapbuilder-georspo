import modalActions from 'actions/ModalActions';
import modalStore from 'stores/ModalStore';
import React from 'react';

const closeSvg = '<use xlink:href="#shape-close" />';

export default class ModalWrapper extends React.Component {

  constructor(props) {
    super(props);

    modalStore.listen(this.storeUpdated.bind(this));
    const defaultState = modalStore.getState();
    this.state = {
      layerInfo: defaultState.modalLayerInfo
    };
  }

  storeUpdated () {
    const currentState = modalStore.getState();
    this.setState({ layerInfo: currentState.modalLayerInfo });
  }

  close () {
    modalActions.hideModal(React.findDOMNode(this).parentElement);
  }

  render() {
    const {theme, children} = this.props;
    const contentClass = `modal-content custom-scroll ${theme ? theme : ''}`;

    return (
      <div className='modal-container'>
        <div className='modal-background' onClick={::this.close} />
        <article className='modal shadow'>
          <div title='close' className='close-icon pointer' onClick={::this.close} >
            <svg dangerouslySetInnerHTML={{ __html: closeSvg }}/>
          </div>
            <div className={contentClass}>
              {children}
            </div>
        </article>
      </div>
    );
  }

}
