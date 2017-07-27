import LayersHelper from 'helpers/LayersHelper';
import {layerPanelText} from 'js/config';
import React, {PropTypes} from 'react';

const firesOptions = layerPanelText.firesOptions;

export default class FiresControls extends React.Component {

  static contextTypes = {
    map: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps, prevState, prevContext) {
    const value = firesOptions[this.props.firesSelectIndex].value;

    if (prevProps.firesSelectIndex !== this.props.firesSelectIndex) {
      LayersHelper.updateFiresLayerDefinitions(value, this.props.layer.id);
    }

    // Anytime the map changes to a new map, update that here
    const {map} = this.context;
    if (prevContext.map !== map) {
      const signal = map.on('update-end', () => {
        signal.remove();
        LayersHelper.updateFiresLayerDefinitions(value, this.props.layer.id);
      });
    }
  }

  optionsMap (item, index) {
    return <option key={index} value={item.value}>{item.label}</option>;
  }

  changeFiresTimeline = (evt) => {
    this.props.selectChangeAction(evt.target.selectedIndex);
  }

  render () {
    const activeItem = firesOptions[this.props.firesSelectIndex];

    return (
      <div className='timeline-container relative fires'>
        <select className='pointer' value={activeItem.value} onChange={this.changeFiresTimeline}>
          {firesOptions.map(this.optionsMap, this)}
        </select>
        <div className='active-fires-control fa-button sml white'>{activeItem.label}</div>
      </div>
    );
  }

}
