import layerActions from 'actions/LayerActions';
import layerUtils from 'js/utils/layerUtils';
import LayersHelper from 'helpers/LayersHelper';
import {layerPanelText} from 'js/config';
import React, { Component, PropTypes } from 'react';

let lossOptions = [];

export default class LossControls extends Component {
  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      loaded: false,
      lossFromSelectIndex: null,
      lossToSelectIndex: null
    };
  }

  componentDidMount () {
    // TODO:  pull from config.
    let url = 'http://gis-treecover.wri.org/arcgis/rest/services/ForestCover_lossyear/ImageServer';
    layerUtils.getLayerMetadata(url).then((results) => {
      let min = results.minValues[0];
      let max = results.maxValues[0];
      for ( let i = min; i <= max; i++ ) {
        lossOptions.push({ label: 2000 + i + '', value: i });
      }
      this.setState({
        loaded: true,
        lossFromSelectIndex: lossOptions.length-2,
        lossToSelectIndex: lossOptions.length-1
      });
    });
  }

  componentDidUpdate (prevProps) {
    if (this.state.loaded && this.context.map.loaded) {
      let {lossFromSelectIndex, lossToSelectIndex} = this.state;
      let layer = this.context.map.getLayer(this.props.layerId);
      let {language} = this.context;
      if (layer) {
        LayersHelper.updateLossLayerDefinitions(layer, language, lossFromSelectIndex, lossToSelectIndex);
      }
    }
  }

  renderSelects () {
    let selects = <div className='timeline-container loss flex'>loading...</div>;
    if ( this.props.loaded ) {
      let fromItem = lossOptions[this.state.lossFromSelectIndex];
      let toItem = lossOptions[this.state.lossToSelectIndex];
      selects = <div className='timeline-container loss flex'>
        <div className='loss-from relative'>
          <select onChange={this.fromChanged.bind(this)} className='pointer' value={fromItem.value}>
            {lossOptions.map(this.optionsMap('from'))}
          </select>
          <div className='loss-from-button fa-button sml white'>{fromItem.label}</div>
        </div>
        <div className='loss-timeline-spacer'>to</div>
        <div className='loss-to relative'>
          <select onChange={this.toChanged.bind(this)} className='pointer' value={toItem.value}>
            {lossOptions.map(this.optionsMap('to'))}
          </select>
          <div className='loss-to-button fa-button sml white'>{toItem.label}</div>
        </div>
      </div>
    }
    return selects;
  }

  render () {
    return (
      this.renderSelects()
    );
  }

  optionsMap (selectType) {
    // Disable options in the 'from' select that are greater than the selected value in the 'to' select
    // and vice versa, disable 'to' options less than the selected value in the 'from' select
    let fromMax = lossOptions[this.state.lossToSelectIndex].value;
    let toMin = lossOptions[this.state.lossFromSelectIndex].value;
    return (item, index) => {
      let disabled = selectType === 'from' ? item.value >= fromMax : item.value <= toMin;
      return <option key={index} value={item.value} disabled={disabled}>{item.label}</option>;
    };
  }

  fromChanged (evt) {
    if (evt.target.selectedIndex !== this.state.lossFromSelectIndex) {
      this.setState({
        loaded: true,
        lossFromSelectIndex: evt.target.selectedIndex,
        lossToSelectIndex: this.state.lossToSelectIndex
      });
      layerActions.changeLossFromTimeline(evt.target.selectedIndex);
    }
  }

  toChanged (evt) {
    if (evt.target.selectedIndex !== this.state.lossToSelectIndex) {
      this.setState({
        loaded: true,
        lossFromSelectIndex: this.state.lossFromSelectIndex,
        lossToSelectIndex: evt.target.selectedIndex
      });
      layerActions.changeLossToTimeline(evt.target.selectedIndex);
    }
  }

}

LossControls.propTypes = {
  layerId: PropTypes.string.isRequired
};
