import mapStore from 'stores/MapStore';
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
    return (
      <dl className='source-row'>
        <dt>{item.label}</dt>
        <dd>{item.value}</dd>
      </dl>
    );
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
    let selectedFeature, selectedIndex = 0;
    let layerName, attributes = [];

    if ( infoWindow && infoWindow.getSelectedFeature ) {
      count = infoWindow.count;
      selectedFeature = infoWindow.getSelectedFeature();
      selectedIndex = infoWindow.selectedIndex;
    }
    if ( selectedFeature ) {
      attributes = Object.keys(selectedFeature.attributes);
      attributes = attributes.map((a) => {
        return { label: a, value: selectedFeature.attributes[a] }
      });
      layerName = selectedFeature._layer.name;
    } else {
      attributes = [{ label: 'No features selected. Click the map to make a selection.', value: '' }];
    }
    return (
      <div className='infoWindow'>
        <div className={`feature-controls ${selectedFeature ? '' : 'hidden'}`}>
          <span>{count} features selected.</span>
          <span className={`arrow right ${selectedIndex < count-1 ? '' : 'disabled'}`} onClick={this.next.bind(this)}>Next</span>
          <span className={`arrow left ${selectedIndex > 0 ? '' : 'disabled'}`} onClick={this.previous.bind(this)}>Prev</span>
        </div>
        <div className={`layer-name ${selectedFeature ? '' : 'hidden'}`}>
          Layer:  {layerName}
        </div>
        <div className='attribute-display custom-scroll'>
          {attributes.map(this.attribute)}
        </div>
        <div className={`actions flex ${selectedFeature ? '' : 'hidden'}`}>
          <button class='actionButton'>Print Report</button>
          <button class='actionButton'>Subscribe</button>
        </div>
      </div>
    );
  }

}

InfoWindow.propTypes = {
  map: React.PropTypes.object.isRequired
};
