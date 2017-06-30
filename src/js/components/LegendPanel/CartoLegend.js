import MapStore from 'stores/MapStore';
import React from 'react';

export default class CartoLegend extends React.Component {

  constructor (props) {
    super(props);
    const {cartoSymbol} = MapStore.getState();
    this.state = {
      cartoSymbol: cartoSymbol
    };
  }

  storeDidUpdate = () => {
    const {cartoSymbol} = MapStore.getState();
    console.log(cartoSymbol);
    if(cartoSymbol !== null) {
      this.setState({ cartoSymbol: cartoSymbol });
    }
  };

  componentDidMount() {
    MapStore.listen(this.storeDidUpdate);
    // Request.getLegendInfos(this.props.url, this.props.layerIds).then(legendInfos => {
    //   if(this.refs.myRef) {
    //     this.setState({ legendInfos: legendInfos });
    //   }
    // });
  }

  render () {
    console.log(this.state.cartoSymbol);
    if(!this.refs.myRef && this.state.cartoSymbol.length === 0){
      return false;
    }
    console.log(this.state.updateIcon);
    return (
      <div className='legend-container' ref="myRef">
        {this.props.title === 0 ? <div className='legend-unavailable'>No Legend</div> :
          <div className='crowdsource-legend'>
            {this.state[0].label.en + 'rrr'}
          </div>
        }
      </div>
    );
  }
}
