import layerActions from 'actions/LayerActions';
import React, {
  Component,
  PropTypes
} from 'react';

export default class LayerToggles extends Component {
  render () {
    return (
      <div className='layer-toggles'>
        <span>Layers</span>
        <span onClick={this.clearAll.bind(this)} className='right small'>clear all</span>
        <span onClick={this.selectAll.bind(this)} className='right small'>select all</span>
      </div>
    )
  }

  clearAll () {
    layerActions.removeAll();
  }

  selectAll() {
    layerActions.addAll();
  }
}
