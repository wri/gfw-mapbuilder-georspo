import layerActions from 'actions/LayerActions';
import layerUtils from 'utils/layerUtils';
import layerKeys from 'constants/LayerConstants';
import rasterFuncs from 'utils/rasterFunctions';
import React, { Component, PropTypes } from 'react';

let lossOptions = [];

export default class LossControls extends Component {
  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };

  componentDidMount () {
    let url = 'http://gis-treecover.wri.org/arcgis/rest/services/ForestCover_lossyear/ImageServer';
    layerUtils.getLayerMetadata(url).then((results) => {
      let min = results.minValues[0];
      let max = results.maxValues[0];
      for ( let i = min; i <= max; i++ ) {
        lossOptions.push({ label: 2000 + i + '', value: i });
      }
      //- Update the defaults to be the last year
      layerActions.updateLossTimeline({
        fromSelectedIndex: lossOptions.length - 2,
        toSelectedIndex: lossOptions.length - 1
      });
      //- Set the options in the store so others can use it
      layerActions.setLossOptions(lossOptions);
    });
  }

  componentDidUpdate (prevProps) {
    //- If the options are ready and something has changed
    let {lossFromSelectIndex, lossToSelectIndex, canopyDensity} = this.props;
    if (this.props.lossOptions.length &&
        (prevProps.lossFromSelectIndex !== lossFromSelectIndex ||
        prevProps.lossToSelectIndex !== lossToSelectIndex ||
        prevProps.canopyDensity !== canopyDensity)
    ) {
      let layer = this.context.map.getLayer(layerKeys.TREE_COVER_LOSS);
      let fromYear = lossOptions[lossFromSelectIndex].label;
      let toYear = lossOptions[lossToSelectIndex].label;
      let renderingRule = rasterFuncs.buildCanopyFunction(fromYear, toYear, canopyDensity);
      if (layer) {
        layer.setRenderingRule(renderingRule);
      }
    }
  }

  render () {
    if (lossOptions.length === 0) {
      return <div className='timeline-container loss flex'>loading...</div>;
    }

    let fromItem = lossOptions[this.props.lossFromSelectIndex];
    let toItem = lossOptions[this.props.lossToSelectIndex];

    return (
      <div className='timeline-container loss flex'>
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
    );
  }

  optionsMap (selectType) {
    // Disable options in the 'from' select that are greater than the selected value in the 'to' select
    // and vice versa, disable 'to' options less than the selected value in the 'from' select
    let fromMax = lossOptions[this.props.lossToSelectIndex].value;
    let toMin = lossOptions[this.props.lossFromSelectIndex].value;
    return (item, index) => {
      let disabled = selectType === 'from' ? item.value >= fromMax : item.value <= toMin;
      return <option key={index} value={item.value} disabled={disabled}>{item.label}</option>;
    };
  }

  fromChanged (evt) {
    if (evt.target.selectedIndex !== this.props.lossFromSelectIndex) {
      layerActions.updateLossTimeline({
        fromSelectedIndex: evt.target.selectedIndex,
        toSelectedIndex: this.props.lossToSelectIndex
      });
    }
  }

  toChanged (evt) {
    if (evt.target.selectedIndex !== this.props.lossToSelectIndex) {
      layerActions.updateLossTimeline({
        fromSelectedIndex: this.props.lossFromSelectIndex,
        toSelectedIndex: evt.target.selectedIndex
      });
    }
  }

}
