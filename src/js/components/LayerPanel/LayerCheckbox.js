import layerActions from 'actions/LayerActions';
import modalActions from 'actions/ModalActions';
import LayersHelper from 'helpers/LayersHelper';
import LayerTransparency from './LayerTransparency';
import React, {
  Component,
  PropTypes
} from 'react';

// Info Icon Markup for innerHTML
let useSvg = '<use xlink:href="#shape-info" />';

export default class LayerCheckbox extends React.Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      if (this.props.checked) {
        if (this.props.subLayer) {
          LayersHelper.showSubLayer(this.props.layer)
        } else {
          LayersHelper.showLayer(this.props.layer.id);
        }
      } else {
        if (this.props.subLayer) {
          LayersHelper.hideSubLayer(this.props.layer)
        } else {
          LayersHelper.hideLayer(this.props.layer.id);
        }
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.checked !== this.props.checked || !!this.props.children;
  }

  render() {
    // console.log('checkbox render', this.props.layer.id);
    let {layer} = this.props;
    let {label, sublabel} = layer;
    let {language} = this.context;
    let checked = this.props.checked ? 'active' : '';
    let disabled = layer.disabled ? 'disabled': '';
    let hidden = LayersHelper.isLayerVisible(layer, language) ? '' : 'hidden';

    return (
      <div className={`layer-checkbox relative ${layer.className} ${checked} ${disabled} ${hidden}`} >
        <span onClick={this.toggleLayer.bind(this)} className='toggle-switch pointer'><span/></span>
        <span onClick={this.toggleLayer.bind(this)} className='layer-checkbox-label pointer'>{label}</span>
        {!sublabel ? null : <div className='layer-checkbox-sublabel'>{sublabel}</div>}
        <span className='info-icon pointer' onClick={this.showInfo.bind(this)}>
          <svg dangerouslySetInnerHTML={{ __html: useSvg }}/>
        </span>
        {!this.props.children ? null :
          <div className={`layer-content-container flex ${this.props.checked ? '' : 'hidden'}`}>
            {this.props.children}
          </div>
        }
        <LayerTransparency layer={layer} visible={this.props.checked}></LayerTransparency>
      </div>
    );
  }

  showInfo () {
    console.log('showInfo for layer', this.props.layer.id);
    let layer = this.props.layer;
    if (layer.disabled) { return; }
    modalActions.showLayerInfo(this.props.layer.id);
  }

  toggleLayer () {
    let {layer} = this.props;
    if (layer.disabled) { return; }
    if (layer.subId) {
      // TODO:  Update visible layers.
      // console.log('sub layer', layer);
      if (this.props.checked) {
        layerActions.removeSubLayer(layer);
      } else {
        layerActions.addSubLayer(layer);
      }
    } else {
      if (this.props.checked) {
        layerActions.removeActiveLayer(layer.id);
      } else {
        layerActions.addActiveLayer(layer.id);
      }
    }
  }

}

LayerCheckbox.propTypes = {
  layer: React.PropTypes.object.isRequired,
  checked: React.PropTypes.bool.isRequired
};
