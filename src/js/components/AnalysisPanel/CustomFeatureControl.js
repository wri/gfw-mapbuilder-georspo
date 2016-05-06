import React, {Component, PropTypes} from 'react';
import text from 'js/languages';

export default class CustomFeatureControl extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  editName = ({target}) => {
    const {feature} = this.props;
    feature.attributes.Name = target.value;
  };

  deleteFeature = () => {
    const {feature} = this.props;
    const {map} = this.context;
    map.infoWindow.clearFeatures();
    map.graphics.remove(feature);
  };

  render () {
    const {language} = this.context;
    const {feature} = this.props;

    return (
      <div className='custom-feature__header'>
        <input className='custom-feature__input' type='text' defaultValue={feature.attributes.Name} onChange={this.editName} />
        <div className='custom-feature__delete pointer' onClick={this.deleteFeature}>{text[language].DELETE}</div>
      </div>
    );
  }
}

CustomFeatureControl.propTypes = {
  feature: PropTypes.object.isRequired
};
