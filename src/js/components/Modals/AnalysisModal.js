import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import Instructions from 'components/AnalysisPanel/Instructions';
import DrawTools from 'components/AnalysisPanel/DrawTools';
import Upload from 'components/AnalysisPanel/Upload';
import mapActions from 'actions/MapActions';
import React, { Component } from 'react';

export default class AnalysisModal extends Component {

  close = () => {
    mapActions.toggleAnalysisModal({ visible: false });
  };

  render () {
    return (
      <ControlledModalWrapper onClose={this.close}>
        <Instructions />
        <DrawTools />
        <Upload />
      </ControlledModalWrapper>
    );
  }

}
