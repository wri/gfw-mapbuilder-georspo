import ModalWrapper from 'components/Modals/ModalWrapper';
import modalStore from 'stores/ModalStore';
import {modalText} from 'js/config';
import React from 'react';

export default class Modal extends React.Component {

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

  renderFromMetadataAPI (info) {
    return (
      <div className='layer-modal-content'>
        <div className='source-header'>
          <h2 className='source-title'>{info.title}</h2>
          <h3 className='source-subtitle'>{info.subtitle}</h3>
        </div>
        <div className='source-body'>
          <div className='source-table'>
            {!info.function ? null : this.tableMap('Function', info.function)}
            {!info.resolution ? null : this.tableMap('Resolution', info.resolution)}
            {!info.geographic_coverage ? null : this.tableMap('Geographic Coverage', info.geographic_coverage)}
            {!info.source ? null : this.tableMap('Source', info.source)}
            {!info.frequency_of_updates ? null : this.tableMap('Frequency', info.frequency_of_updates)}
            {!info.date_of_content ? null : this.tableMap('Date of Content', info.date_of_content)}
            {!info.cautions ? null : this.tableMap('Cautions', info.cautions)}
            {!info.license ? null : this.tableMap('License', info.license)}
          </div>
          {!info.overview ? null :
            <div className='source-summary'>
              <h3>Overview</h3>
              <div dangerouslySetInnerHTML={{ __html: info.overview }} />
            </div>
          }
          {!info.citation ? null :
            <div className='source-credits'>
              <h4>Citation:</h4>
              <div dangerouslySetInnerHTML={{ __html: info.citation }} />
            </div>
          }
          {!info.learn_more ? null :
            <div className='flex'>
              <a href={info.learn_more} className='source-learn-more-link fa-button white' target='_blank'>
                Learn More
              </a>
            </div>
          }
        </div>
        {!info.download_data ? null :
          <div className='source-footer'>
            <a href={info.download_data} className='source-download fa-button gold' target='_blank'>
              Download Data
            </a>
          </div>
        }
      </div>
    );
  }

  renderFromMapService (info) {
    return (
      <div className='layer-modal-content'>
        <div className='source-header'>
          <h2 className='source-title'>{info.name}</h2>
          <h3 className='source-subtitle'>{info.type}</h3>
        </div>
        <div className='source-table'>
          {this.tableMap('Description', info.description || modalText.noInfo)}
        </div>
      </div>
    );
  }

  tableMap (label, content) {
    return (
      <dl className='source-row'>
        <dt>{label}</dt>
        <dd dangerouslySetInnerHTML={{ __html: content }}></dd>
      </dl>
    );
  }

  render () {
    const {layerInfo} = this.state;
    const theme = layerInfo && layerInfo.download_data ? '' : 'no-download';
    const content = !layerInfo ? <div className='no-info-available'>{modalText.noInfo}</div> :
      (layerInfo.currentVersion ?
        this.renderFromMapService(layerInfo) :
        this.renderFromMetadataAPI(layerInfo)
      );

    return (
      <ModalWrapper theme={theme}>
        {content}
      </ModalWrapper>
    );
  }

}
