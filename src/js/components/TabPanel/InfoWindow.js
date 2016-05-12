import CustomFeatureControl from 'components/AnalysisPanel/CustomFeatureControl';
import ReportSubscribeButtons from 'components/Shared/ReportSubscribe';
import {attributes} from 'constants/AppConstants';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

const closeSvg = '<use xlink:href="#shape-close" />';
const polygonSvg = '<use xlink:href="#icon-analysis-poly" />';

export default class InfoWindow extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  previous = () => {
    this.props.map.infoWindow.selectPrevious();
  };

  next = () => {
    this.props.map.infoWindow.selectNext();
  };

  clearFeatures = () => {
    const {map} = this.context;
    map.infoWindow.clearFeatures();
  };

  renderInstructionList = (instruction, index) => {
    return (
      <li key={index}>{instruction}</li>
    );
  };

  render () {
    const {infoWindow} = this.props.map;
    const {language} = this.context;
    let count = 0, selectedIndex = 0;
    let selectedFeature, content, title;

    if ( infoWindow && infoWindow.getSelectedFeature ) {
      count = infoWindow.count;
      selectedFeature = infoWindow.getSelectedFeature();
      selectedIndex = infoWindow.selectedIndex;
      content = infoWindow._contentPane.innerHTML;
    }

    if (selectedFeature) {
      if (selectedFeature.attributes.__source === attributes.SOURCE_SEARCH) {
        title = (
          <div className='infoWindow__title'>
            {selectedFeature.infoTemplate.title}
          </div>
        );
      }
      //- For Drawn Features, Give them a Control which can rename or delete the feature
      if (selectedFeature.attributes.__source === attributes.SOURCE_DRAW) {
        title = (
          <div className='infoWindow__title'>
            <CustomFeatureControl feature={selectedFeature} />
          </div>
        );
      }
    }

    return (
      <div className='infoWindow relative'>
        <div className={`infoWindow__content ${selectedFeature ? '' : 'hidden'}`}>
          <div className='feature-controls'>
            <span>{count} features selected.</span>
            <svg onClick={this.clearFeatures}
              className='infoWindow__clearFeatures-icon pointer'
              dangerouslySetInnerHTML={{ __html: closeSvg }} />
            <span className={`arrow right ${selectedIndex < count - 1 ? '' : 'disabled'}`} onClick={this.next}>Next</span>
            <span className={`arrow left ${selectedIndex > 0 ? '' : 'disabled'}`} onClick={this.previous}>Prev</span>
          </div>
          <div className='infoWindow__attribute-display custom-scroll'>
            {title}
            <div dangerouslySetInnerHTML={{__html: content }} />
          </div>
        </div>
        <div className={`infoWindow__instructions ${selectedFeature ? 'hidden' : ''}`}>
          <h4 className='analysis-instructions__header'>
            {text[language].INFO_WINDOW_INSTRUCTION_HEADER}
          </h4>
          <ol className='analysis-instructions__olist'>
            {text[language].INFO_WINDOW_INSTRUCTION_LIST.map(this.renderInstructionList)}
          </ol>
          <div className='analysis-instructions__draw-icon-container'>
            <svg className='analysis-instructions__draw-icon' dangerouslySetInnerHTML={{ __html: polygonSvg }} />
          </div>
        </div>
        <div className='infoWindow__footer'>
          <ReportSubscribeButtons />
        </div>
      </div>
    );
  }

}

InfoWindow.propTypes = {
  map: React.PropTypes.object.isRequired
};
