import mapActions from 'actions/MapActions';
import keys from 'constants/StringKeys';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

const showModal = function showModal () {
  mapActions.toggleCanopyModal({ visible: true });
};

export default class DensityDisplay extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  render () {
    const {language} = this.context;

    return (
      <div className='tree-cover-canopy-display'>
        <span className='canopy-label'>{text[language][keys.DENSITY_FIRST]}</span>
        <span className='canopy-button pointer' onClick={showModal}>{this.props.canopyDensity}</span>
        <span className='canopy-label'>{text[language][keys.DENSITY_SECOND]}</span>
      </div>
    );
  }
}
