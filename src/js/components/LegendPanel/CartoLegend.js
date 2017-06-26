import React from 'react';

export default class CartoLegend extends React.Component {

  render () {
    if(!this.refs.myRef){
      return false;
    }
    return (
      <div className='legend-container' ref="myRef">
        {this.props.title === 0 ? <div className='legend-unavailable'>No Legend</div> :
          <div className='crowdsource-legend'>
            {this.props.title}
          </div>
        }
      </div>
    );
  }
}
