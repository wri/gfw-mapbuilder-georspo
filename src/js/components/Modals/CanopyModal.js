import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import {modalText, assetUrls} from 'js/config';
import {loadJS, loadCSS} from 'utils/loaders';
import mapActions from 'actions/MapActions';
import keys from 'constants/StringKeys';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

export default class CanopyModal extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  componentDidMount() {
    loadJS(assetUrls.jQuery);
    loadJS(assetUrls.rangeSlider).then(() => {
      $('#tree-cover-slider').ionRangeSlider({
        type: 'double',
        values: modalText.canopy.slider,
        hide_min_max: true,
        grid_snap: true,
        to_fixed: true,
        from_min: 1,
        from_max: 7,
        grid: true,
        from: 5,
        onFinish: this.sliderChanged,
        prettify: value => (value + '%')
      });
    }, console.error);
    loadCSS(assetUrls.ionCSS);
    loadCSS(assetUrls.ionSkinCSS);
    // Update with the default values
    // let defaults = mapStore.getState();
    // LayersHelper.updateTreeCoverDefinitions(defaults.canopyDensity);
  }

  sliderChanged (data) {
    console.log(data.from_value);
    // modalActions.updateCanopyDensity(data.from_value);
    // LayersHelper.updateTreeCoverDefinitions(data.from_value);
  }

  close = () => {
    mapActions.toggleCanopyModal({ visible: false });
  };

  render() {
    const {language} = this.context;

    return (
      <ControlledModalWrapper onClose={this.close}>
        <div className='canopy-modal-title'>{text[language][keys.CANOPY_MODAL_TEXT]}</div>
        <div className='trees'>
          <div className='tree-icon' />
          <div className='forest-icon' />
        </div>
        <div className='slider-container'>
          <div id='tree-cover-slider' />
        </div>
      </ControlledModalWrapper>
    );
  }

}
