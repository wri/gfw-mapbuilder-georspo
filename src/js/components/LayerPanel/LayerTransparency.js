import layerActions from 'actions/LayerActions';
import LayersHelper from 'helpers/LayersHelper';
import React from 'react';

export default class LayerTransparency extends React.Component {

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
    // Convert to number.
    event.target.value = +event.target.value;
    this.setState({ opacity: event.target.value });
    LayersHelper.changeOpacity({
      layerId: this.props.layer.id,
      value: event.target.value
    });
    // ...or... action -> dispatcher -> store? 
    // Seems weird since the map isn't a view...
    // layerActions.changeOpacity({
    //   layerId: this.state.id,
    //   value: event.target.value
    // });
  }
}