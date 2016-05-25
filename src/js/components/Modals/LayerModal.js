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
          <strong className='source-title'>{info.title}</strong>
          <em className='source-description'>{info.subtitle}</em>
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
            <a href={info.learn_more} className='source-learn-more-link'>
              <div className='fa-button white'>Learn More</div>
            </a>
          }
          {!info.download_data ? null :
            <a href={info.download_data} className='source-learn-more-link'>
              <div className='fa-button gold'>Download Data</div>
            </a>
          }
        </div>
      </div>
    );
  }

  renderFromMapService () {

  }

  render () {
    const {layerInfo} = this.state;
    const content = !layerInfo.title ?
      <div className='no-info-available'>{modalText.noInfo}</div> :
      this.renderFromMetadataAPI(layerInfo);


    return (
      <ModalWrapper>
        {content}
        {/*{!layerInfo.title ? <div className='no-info-available'>{modalText.noInfo}</div> :
          this.renderFromMetadataAPI(layerInfo)
          // <div className='layer-modal-content'>
          //   <div className='source-header'>
          //     <strong className='source-title'>{layerInfo.title}</strong>
          //     <em className='source-description'>{layerInfo.subtitle}</em>
          //   </div>
          //   <div className='source-body'>
          //     <div className='source-table'>
          //       {layerInfo.table.map(this.tableMap)}
          //     </div>
          //     <div className='source-summary'>
          //       {layerInfo.overview.map(this.summaryMap)}
          //     </div>
          //     {!layerInfo.customContent ? null :
          //       layerInfo.customContent.map(this.htmlContentMap)
          //     }
          //     {!layerInfo.citation ? null :
          //       <div className='source-credits'>
          //         {layerInfo.citation.map(this.paragraphMap)}
          //       </div>
          //     }
          //     {!layerInfo.moreContent ? null :
          //       layerInfo.moreContent.map(this.htmlContentMap)
          //     }
          //   </div>
          // </div>
        }*/}
      </ModalWrapper>
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

}
