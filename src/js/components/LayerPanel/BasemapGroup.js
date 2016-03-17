import React, {
  Component,
  PropTypes
} from 'react';

let closeSymbolCode = 9660,
    openSymbolCode = 9650;

export default class BasemapGroup extends Component {

  constructor (props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    let styles = { display: this.state.open ? 'block' : 'none' };
    return (
      <div className='layer-category'>
        <div className='layer-category-label pointer' onClick={this.toggle.bind(this)}>
          {this.props.label}
          <span className='layer-category-caret'>{String.fromCharCode(this.state.open ? closeSymbolCode : openSymbolCode)}</span>
        </div>
        <div className='layer-category-content' style={styles}>{this.props.children}</div>
      </div>
    );
  }

  toggle () {
    this.setState({ open: !this.state.open });
  }

}

BasemapGroup.propTypes = {
  label: PropTypes.string.isRequired
};
