import React, {Component, PropTypes} from 'react';
import layerKeys from 'constants/LayerConstants';
import text from 'js/languages';

export default class CustomFeatureControl extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  editName = ({target}) => {
    const {feature} = this.props;
    feature.attributes.name = target.value;
    // This is generally bad practice, I should update state, but the Name already exists
    // in the feature passed in as props, doing this negates the need for state storing duplicate
    // data which would be an anti-pattern anyway
    this.forceUpdate();
  };

  deleteFeature = () => {
    const {feature} = this.props;
    const {map} = this.context;
    map.infoWindow.clearFeatures();
    const layer = map.getLayer(layerKeys.USER_FEATURES);
    layer.remove(feature);
  };

  render () {
    const {language} = this.context;
    const {feature} = this.props;

    return (
      <div className='custom-feature__header'>
        <input className='custom-feature__input' type='text' value={feature.attributes.name} onChange={this.editName} />
        <div className='custom-feature__delete pointer' onClick={this.deleteFeature}>{text[language].DELETE}</div>
      </div>
    );
  }
}

CustomFeatureControl.propTypes = {
  feature: PropTypes.object.isRequired
};
