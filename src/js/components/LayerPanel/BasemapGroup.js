import layerKeys from 'constants/LayerConstants';
import mapActions from 'actions/MapActions';
import React, {
  Component,
  PropTypes
} from 'react';

const closeSymbolCode = 9660,
    openSymbolCode = 9650;

export default class BasemapGroup extends Component {

  render() {
    const {activeTOCGroup, label} = this.props;
    const active = activeTOCGroup === layerKeys.GROUP_BASEMAP;
    const styles = { display: active ? 'block' : 'none' };

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
    const {activeTOCGroup} = this.props;
    const updatedKey = activeTOCGroup === layerKeys.GROUP_BASEMAP ? '' : layerKeys.GROUP_BASEMAP;
    mapActions.openTOCAccordion(updatedKey);
  };

}

BasemapGroup.propTypes = {
  label: PropTypes.string.isRequired
};
