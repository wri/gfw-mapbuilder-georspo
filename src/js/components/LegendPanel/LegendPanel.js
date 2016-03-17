import mapActions from 'actions/MapActions';
import mapStore from 'stores/MapStore';
import React from 'react';

let closeSymbolCode = 9660,
    openSymbolCode = 9650;

const closeSvg = '<use xlink:href="#shape-close" />';

export default class LegendPanel extends React.Component {

  constructor (props) {
    super(props);
    mapStore.listen(this.storeUpdated.bind(this));
    const defaultState = mapStore.getState();
    this.state = {
      layers: [],
      open: defaultState.legendOpen
    };
  }

  storeUpdated () {
    const newState = mapStore.getState();
    let all = newState.allLayers.map((lyr) => brApp.map.getLayer(lyr.id));
    all = all.filter(a => a)
    // this.setState({
    //   layers: all,
    //   open: this.state.open
    // })
    if (this.state.open !== newState.legendOpen) {
      this.setState({ open: newState.legendOpen });
    }
  }

  render () {
    let rootClasses = this.state.open ? 'legend-panel map-component shadow' : 'legend-panel map-component shadow legend-collapsed';

    return (
      <div className={rootClasses}>

        <div className='legend-title mobile-hide' onClick={mapActions.toggleLegendVisible}>
          <span>
            Legend
          </span>
          <span className='layer-category-caret' onClick={mapActions.toggleLegendVisible}>
            {String.fromCharCode(this.state.open ? closeSymbolCode : openSymbolCode)}
          </span>
        </div>

        <div title='close' className='legend-close close-icon pointer mobile-show' onClick={mapActions.toggleLegendVisible}>
          <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: closeSvg }}/>
        </div>

        <div className='legend-layers'>
          <div id='legend' className={`${this.state.open ? '' : 'hidden'}`}></div>
        </div>
      </div>
    );
  }

}
