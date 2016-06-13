import LayerDrawingOptions from 'esri/layers/LayerDrawingOptions';
import React, {Component, PropTypes} from 'react';

export default class LayerTransparency extends Component {

  static contextTypes = {
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = { opacity: props.layer.opacity || 1 };
  }

  render () {
    return (
      <div className={`layer-transparency ${this.props.visible ? '' : 'hidden'}`}>
        <input type="range" min="0" max="1" step="0.01"
          value={this.state.opacity}
          onChange={this.changeOpacity.bind(this)} />
        <div>Transparency</div>
      </div>
    );
  }

  changeOpacity (event) {
    const {map} = this.context;
    const {layer} = this.props;
    // Convert to number.
    const value = +event.target.value;

    const mapLayer = map.getLayer(layer.id);

    // - This is a dynamic layer and we need to set the opactiy for the appropriate layer
    if (layer.subIndex && mapLayer) {
      const options = mapLayer.layerDrawingOptions || [];
      // Transparency is the reverse of other layers, 0.25 opacity = transparency of value 75
      options[layer.subIndex] = new LayerDrawingOptions({ transparency: 100 - (value * 100) });
      mapLayer.setLayerDrawingOptions(options);
    } else if (mapLayer) {
      mapLayer.setOpacity(value);
    }

    this.setState({ opacity: value });
  }
}
