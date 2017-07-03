import Request from 'utils/request';
import React from 'react';

export default class DynamicLegend extends React.Component {
 
    constructor (props) {
       console.log('DynamicLegend + CONSTRUCTOR');
    super(props);
    this.state = { legendInfos: [] };
  }

  componentDidMount() {
     console.log('DynamicLegend + CONSTRUCTOR');
    Request.getLegendInfos(this.props.url, this.props.layerIds).then(legendInfos => {
      if(this.refs.myRef) {
        this.setState({ legendInfos: legendInfos });
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.legendInfos.length !== this.state.legendInfos.length;
  }

  itemMapper (item, index) {
     console.log('DynamicLegend + CONSTRUCTOR');
    return (
      <div className='legend-row' key={index}>
        <img className='legend-icon' title={item.label} src={`data:image/png;base64,${item.imageData}`} />
        <div className='legend-label' key={index}>{item.label}</div>
      </div>
    );
  }

  render () {
     console.log('DynamicLegend + CONSTRUCTOR');
    return (
      <div className='legend-container' ref="myRef">
        {this.state.legendInfos.length === 0 ? <div className='legend-unavailable'>No Legend</div> :
          <div className='crowdsource-legend'>
            {this.state.legendInfos.map(this.itemMapper, this)}
          </div>
        }
      </div>
    );
  }
}
