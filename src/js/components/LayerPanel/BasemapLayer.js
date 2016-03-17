import mapActions from 'actions/MapActions';
import mapStore from 'stores/MapStore';
import React, {
  Component,
  PropTypes
} from 'react';

export default class BasemapLayer extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    mapStore.listen(this.storeUpdated.bind(this));
    this.state = { visible: false };
  }

  render () {
    let classes = this.state.visible ? 'layer-basemap selected' : 'layer-basemap';
    return (
      <div className={classes} onClick={this.changeBasemap.bind(this)}>
        <span className={`layer-basemap-icon ${this.props.basemap.toLowerCase()}`}>
          <img src={`${this.props.icon}`} />
        </span>
        <span className='layer-basemap-label'>{this.props.label}</span>
      </div>
    );
  }

  changeBasemap () {
    let activeBasemap = this.context.map.getBasemap();
    if (activeBasemap !== this.props.basemap.toLowerCase()) {
      mapActions.changeBasemap(this.context.map, this.props.basemap);
    }
  }

  storeUpdated () {
    let {basemap} = mapStore.getState();
    let visible = (basemap === this.props.basemap.toLowerCase());
    this.setState({ visible: visible });
  }
}

BasemapLayer.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
