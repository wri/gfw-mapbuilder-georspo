import ReportSubscribeButtons from 'components/Shared/ReportSubscribe';
import DateFormats from 'constants/DateFormats';
import dojoDate from 'dojo/date/locale';
import keys from 'constants/StringKeys';
import dojoNumber from 'dojo/number';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

const polygonSvg = '<use xlink:href="#icon-analysis-poly" />';

export default class InfoWindow extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  attribute (item) {
    if (item.value === '') {
      return (
        <p>{item.label}</p>
      );
    } else {
      return (
        <dl className='source-row'>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </dl>
      );
    }
  }

  previous = () => {
    this.props.map.infoWindow.selectPrevious();
  };

  next = () => {
    this.props.map.infoWindow.selectNext();
  };

  renderInstructionList = (instruction, index) => {
    return (
      <li key={index}>{instruction}</li>
    );
  };

  render () {
    const {infoWindow} = this.props.map;
    const {language} = this.context;
    let count = 0;
    let selectedFeature, selectedIndex = 0, title = '';
    let attributes = [];
    let displayInfo, visibleFields;

    if ( infoWindow && infoWindow.getSelectedFeature ) {
      count = infoWindow.count;
      selectedFeature = infoWindow.getSelectedFeature();
      selectedIndex = infoWindow.selectedIndex;
    }
    if ( selectedFeature ) {
      displayInfo = selectedFeature.infoTemplate || selectedFeature._graphicsLayer.infoTemplate;
      visibleFields = displayInfo ? displayInfo.info.fieldInfos.filter(f => f.visible) : [];
      title = selectedFeature.getTitle();
      attributes = visibleFields.map(f => {
        let info = { label: f.label, value: selectedFeature.attributes[f.fieldName] };
        // Use date and number formats for each field if they exist.
        if (f.format) {
          if (f.format.hasOwnProperty('dateFormat')) {
            // Date as a timestamp that needs to be turned into a string.
            let when = new Date(info.value);
            info.value = dojoDate.format(when, DateFormats[f.format.dateFormat]);
          }
          if (f.format.hasOwnProperty('places')) {
            // Number to format with dojo/number.
            info.value = dojoNumber.format(info.value, f.format);
          }
        }
        return info;
      });
    }

    return (
      <div className='infoWindow relative'>
        <div className={`infoWindow__content ${selectedFeature ? '' : 'hidden'}`}>
          <div className='feature-controls'>
            <span>{count} features selected.</span>
            <span className={`arrow right ${selectedIndex < count - 1 ? '' : 'disabled'}`} onClick={this.next}>Next</span>
            <span className={`arrow left ${selectedIndex > 0 ? '' : 'disabled'}`} onClick={this.previous}>Prev</span>
          </div>
          <div className='feature-name'>
            {title}
          </div>
          <div className='attribute-display custom-scroll'>
            {attributes.map(this.attribute)}
          </div>
        </div>
        <div className={`infoWindow__instructions ${selectedFeature ? 'hidden' : ''}`}>
          <h4 className='analysis-instructions__header'>
            {text[language][keys.INFO_WINDOW_INSTRUCTION_HEADER]}
          </h4>
          <ol className='analysis-instructions__olist'>
            {text[language][keys.INFO_WINDOW_INSTRUCTION_LIST].map(this.renderInstructionList)}
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
