import layerKeys from 'constants/LayerConstants';
import mapActions from 'actions/MapActions';
import React, {
  Component,
  PropTypes
} from 'react';

let closeSymbolCode = 9660,
    openSymbolCode = 9650;

export default class BasemapGroup extends Component {

  render() {
    let {activeTOCGroup, label} = this.props;
    let active = activeTOCGroup === layerKeys.GROUP_BASEMAP;
    let styles = { display: active ? 'block' : 'none' };

    return (
      <div className='layer-category'>
        <div className='layer-category-label pointer' onClick={this.toggle}>
          {label}
          <span className='layer-category-caret'>{String.fromCharCode(active ? closeSymbolCode : openSymbolCode)}</span>
        </div>
        <div className='layer-category-content' style={styles}>{this.props.children}</div>
      </div>
    );
  }

  toggle = () => {
    mapActions.openTOCAccordion(layerKeys.GROUP_BASEMAP);
  };

}

BasemapGroup.propTypes = {
  label: PropTypes.string.isRequired
};
