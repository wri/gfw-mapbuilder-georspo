import ReportSubscribeButtons from 'components/Shared/ReportSubscribe';
import DateFormats from 'constants/DateFormats';
import dojoDate from 'dojo/date/locale';
import dojoNumber from 'dojo/number';
import React, {
  Component,
  PropTypes
} from 'react';

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

  previous () {
    this.props.map.infoWindow.selectPrevious();
  }

  next () {
    this.props.map.infoWindow.selectNext();
  }

  render () {
    let {infoWindow} = this.props.map;
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
    } else {
      attributes = [{ label: 'No features selected. Click the map to make a selection.', value: '' }];
    }

    return (
      <div className='infoWindow relative'>
        <div className='infoWindow__content'>
          <div className={`feature-controls ${selectedFeature ? '' : 'hidden'}`}>
            <span>{count} features selected.</span>
            <span className={`arrow right ${selectedIndex < count - 1 ? '' : 'disabled'}`} onClick={this.next.bind(this)}>Next</span>
            <span className={`arrow left ${selectedIndex > 0 ? '' : 'disabled'}`} onClick={this.previous.bind(this)}>Prev</span>
          </div>
          <div className={`feature-name ${selectedFeature ? '' : 'hidden'}`}>
            {title}
          </div>
          <div className='attribute-display custom-scroll'>
            {attributes.map(this.attribute)}
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
