import React, {Component, PropTypes} from 'react';

export default class ToggleSwitch extends Component {
  render () {
    const {checked, label, onChange, disabled} = this.props;
    const checkedClass = checked ? 'active' : '';
    const disabledClass = disabled ? 'disabled' : '';

    return (
      <div className={`toggle-switch__container ${checkedClass} ${disabledClass}`}>
        <span onClick={onChange} className='toggle-switch pointer'><span /></span>
        <span onClick={onChange} className='toggle-switch__label pointer'>{label}</span>
      </div>
    );
  }
}

ToggleSwitch.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};
