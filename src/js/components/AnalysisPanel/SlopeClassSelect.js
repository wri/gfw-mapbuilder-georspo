import mapActions from 'actions/MapActions';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

export default class SlopeClassSelect extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  optionMapper = (item) => {
    return <option key={item} value={item}>{item}</option>;
  };

  onChange = ({target}) => {
    mapActions.updateActiveSlopeClass(target.value);
  };

  render () {
    const {language, settings} = this.context;
    const {activeSlopeClass} = this.props;
    //- Remove the first No Data value
    const classes = settings.slopeClasses.slice(1);

    return (
      <div className='slope-class-select'>
        <label htmlFor='slope-class-selector' className='slope-class-select__label'>
          {text[language].SLOPE_SELECT_LABEL}
        </label>
        <div className='slope-class-select__container relative'>
          <select id='slope-class-selector' className='slope-class-selector' onChange={this.onChange} value={activeSlopeClass}>
            {classes.map(this.optionMapper)}
          </select>
          <div className='slope-class-selector__select-style'>
            {activeSlopeClass || ''}
          </div>
        </div>
      </div>
    );
  }
}
