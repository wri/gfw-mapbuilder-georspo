import mapActions from 'actions/MapActions';
import React, {
  Component,
  PropTypes
} from 'react';

export default class BasemapLayer extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  render () {
    const {active, basemap, label, icon} = this.props;
    const classes = active ? 'layer-basemap selected' : 'layer-basemap';

    return (
      <div className={classes} onClick={this.changeBasemap.bind(this)}>
        <span className={`layer-basemap-icon ${basemap}`}>
          <img src={`${icon}`} />
        </span>
        <span className='layer-basemap-label'>{label}</span>
      </div>
    );
  }

  changeBasemap () {
    mapActions.changeBasemap(this.props.basemap);
  }
}

BasemapLayer.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
};
