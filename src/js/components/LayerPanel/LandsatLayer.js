import basemapUtils from 'utils/basemapUtils';
import mapActions from 'actions/MapActions';

import React, {
  Component,
  PropTypes
} from 'react';

export default class LandsatLayer extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = { yearSelected: null };
  }

  componentDidMount () {
    this.setState({ yearSelected: this.props.years[this.props.years.length - 1] });
  }

  render () {
    const classes = this.props.active ? 'layer-basemap selected' : 'layer-basemap';
    return (
      <div className={classes}>
        <span className='layer-basemap-icon landsat' onClick={this.toggle}></span>
        <span className='layer-basemap-label' onClick={this.toggle}>{this.props.label}</span>
        <div className='relative'>
          <select className='pointer' onChange={this.changeYear.bind(this)}>
            {this.props.years.map(this.yearOption.bind(this))}
          </select>
          <div className='fa-button sml white'>{this.state.yearSelected}</div>
        </div>
      </div>
    );
  }

  yearOption (year, index) {
    const selected = (this.props.years.length - 1 === index) ? true : false;
    return (
      <option value={year} selected={selected}>{year}</option>
    );
  }

  toggle = () => {
    mapActions.changeBasemap(this.props.layerId);
  };

  changeYear (evt) {
    const {map, language, settings} = this.context;
    const year = this.props.years[evt.target.selectedIndex];
    this.setState({ yearSelected: year });
    mapActions.changeBasemap(this.props.layerId);
    basemapUtils.changeLandsatYear(map, year, settings.basemaps[language].landsat);
  }
}

LandsatLayer.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
