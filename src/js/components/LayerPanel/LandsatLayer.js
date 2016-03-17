import mapActions from 'actions/MapActions';

import React, {
  Component,
  PropTypes
} from 'react';

export default class LandsatLayer extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      yearSelected: null
    }
  }

  componentDidMount () {
    this.setState({
      yearSelected: this.props.years[this.props.years.length-1]
    })
  }

  render () {
    let classes = this.state.visible ? 'layer-basemap selected' : 'layer-basemap';
    return (
      <div className={classes}>
        <span className='layer-basemap-icon landsat' onClick={this.toggle.bind(this)}></span>
        <span className='layer-basemap-label' onClick={this.toggle.bind(this)}>{this.props.label}</span>
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
    let selected = (this.props.years.length-1 === index) ? true : false;
    return (
      <option value={year} selected={selected}>{year}</option>
    )
  }

  toggle () {
    let {map, language} = this.context;
    this.setState({ visible: !this.state.visible });
    mapActions.toggleLandsat(map, language);
  }

  changeYear (evt) {
    let {map, language} = this.context;
    let year = this.props.years[evt.target.selectedIndex];
    this.setState({ yearSelected: year });
    mapActions.changeLandsatYear(map, language, year);
  }
}

LandsatLayer.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
