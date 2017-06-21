import Request from 'utils/request';
import React from 'react';

export default class DynamicLegend extends React.Component {
  constructor (props) {
    super(props);
    this.state = { legendInfos: [] };
  }

  componentDidMount() {
    const layerIds = this.props.layerIds;
    // if(layerIds.length > 1) {
    //   layerIds.map(layer => {
    //     const currLayer = [];
    //     currLayer.push(layer);
    //     Request.getLegendInfos(this.props.url, currLayer).then(legendInfos => {
    //       this.setState({ legendInfos: legendInfos });
    //     });
    //   });
    // } else {
      Request.getLegendInfos(this.props.url, this.props.layerIds).then(legendInfos => {
        this.setState({ legendInfos: legendInfos });
      });
    // }
  }

  itemMapper (item, index) {
    return (
      <div className='legend-row' key={index}>
        <img title={item.label} src={`data:image/png;base64,${item.imageData}`} />
        <div className='legend-label' key={index}>{item.label}</div>
      </div>
    );
  }

  render () {
    return (
      <div className='legend-container'>
        {this.state.legendInfos.length === 0 ? <div className='legend-unavailable'>No Legend</div> :
          <div className='crowdsource-legend'>
            {this.state.legendInfos.map(this.itemMapper, this)}
          </div>
        }
      </div>
    );
  }
}
