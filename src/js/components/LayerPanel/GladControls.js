import ToggleSwitch from 'components/Shared/ToggleSwitch';
import React, {Component, PropTypes} from 'react';

export default class GladControls extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = { unconfirmed: false };
  }

  toggleConfirmedAlerts = () => {
    this.setState({ unconfirmed: !this.state.unconfirmed });
    const {map} = this.context;
    const {layer} = this.props;
    const confirmation = this.state.unconfirmed ? 'all' : 'confirmed';
    map.getLayer(layer.id).setConfidenceLevel(confirmation);
  };

  render () {
    const {unconfirmed} = this.state;

    return (
      <div className='glad-controls'>
        <ToggleSwitch label='Hide unconfirmed alerts' checked={unconfirmed} onChange={this.toggleConfirmedAlerts} />
      </div>
    );
  }

}
