import DensityDisplay from 'components/LayerPanel/DensityDisplay';
import TerraIControls from 'components/LayerPanel/TerraIControls';
import LayerCheckbox from 'components/LayerPanel/LayerCheckbox';
import FiresControls from 'components/LayerPanel/FiresControls';
import LossControls from 'components/LayerPanel/LossControls';
import GladControls from 'components/LayerPanel/GladControls';
import SadControls from 'components/LayerPanel/SadControls';
import LayerGroup from 'components/LayerPanel/LayerGroup';
import BasemapGroup from 'components/LayerPanel/BasemapGroup';
import WRIBasemapLayer from 'components/LayerPanel/WRIBasemapLayer';
import LandsatLayer from 'components/LayerPanel/LandsatLayer';
import BasemapLayer from 'components/LayerPanel/BasemapLayer';
import LayerKeys from 'constants/LayerConstants';
import basemapUtils from 'utils/basemapUtils';
import basemaps from 'esri/basemaps';
import utils from 'utils/AppUtils';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

export default class LayerPanel extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  renderLayerGroup = (group, layers) => {
    return (
      <LayerGroup
        key={group.key}
        groupKey={group.key}
        label={group.label}
        {...this.props}>
        {layers.map(this.checkboxMap(group.key), this)}
      </LayerGroup>
    );
  };

  renderBasemapGroup = (extraBasemaps) => {
    const {language} = this.context;
    const {basemap} = this.props;
    let basemapLayers = [];
    if (basemaps) {
      let basemapNames = Object.keys(basemaps);
      basemapNames = basemapNames.filter(bm => {
        // Rather than showing traditional tiled and vector tile basemap options,
        // only show the vector tile basemap.
        // return !basemaps.hasOwnProperty(bm + '-vector');
        /* Only show basemaps WRI wants */
        return basemapUtils.arcgisBasemaps.indexOf(bm) > -1;
      });
      basemapLayers = basemapNames.map(bm => {
        return (
          <BasemapLayer
            icon={basemaps[bm].thumbnailUrl}
            label={basemaps[bm].title}
            basemap={bm}
            active={basemap === bm} />
        );
      });
    }

    const wriMonoBasemap = extraBasemaps.wri_mono;
    if (wriMonoBasemap) {
      basemapLayers.unshift(
        <WRIBasemapLayer
          layerId='wri_mono'
          label={wriMonoBasemap.title}
          icon={wriMonoBasemap.thumbnailUrl}
          active={basemap === 'wri_mono'} />
      );
    }

    const wriContextualBasemap = extraBasemaps.wri_contextual;
    if (wriContextualBasemap) {
      basemapLayers.unshift(
        <WRIBasemapLayer
          layerId='wri_contextual'
          label={wriContextualBasemap.title}
          icon={wriContextualBasemap.thumbnailUrl}
          active={basemap === 'wri_contextual'} />
      );
    }

    const landsat = extraBasemaps.landsat;
    if (landsat) {
      basemapLayers.unshift(
        <LandsatLayer
          layerId='landsat'
          icon={landsat.thumbnailUrl}
          label={landsat.title}
          years={landsat.years}
          active={basemap === 'landsat'} />
      );
    }

    return (
      <BasemapGroup label={text[language].BASEMAP} activeTOCGroup={this.props.activeTOCGroup}>
        {basemapLayers}
      </BasemapGroup>
    );
  };

  checkboxMap (groupKey) {
    return layer => {
      const {activeLayers, dynamicLayers, ...props} = this.props;
      // Exclude Layers not part of this group
      if (layer.groupKey !== groupKey) { return null; }
      // TODO: Remove once current layer panel design is approved
      // If it is just a label, render the grop label
      // if (layer.isGroupLabel) { return <div key={layer.id} className='layer-group-label'>{layer.label}</div>; }
      // Some layers have legends or tools and they should be rendered inside the layer checkbox
      let childComponent;
      switch (layer.id) {
        case 'ACTIVE_FIRES':
          childComponent = <FiresControls loaded={props.loaded} {...props} />;
          break;
        case 'TREE_COVER_LOSS':
          childComponent = [
            <LossControls key='tcl_loss_control' layerId={layer.id} loaded={props.loaded} {...props} />,
            <DensityDisplay key='tcl_density-display' {...props} />
          ];
          break;
        case LayerKeys.TREE_COVER:
          childComponent = <DensityDisplay {...props} />;
          break;
        case LayerKeys.IMAZON_SAD:
          childComponent = <SadControls
              layer={layer}
              startMonth={props.imazonStartMonth}
              endMonth={props.imazonEndMonth}
              startYear={props.imazonStartYear}
              endYear={props.imazonEndYear}
            />;
          break;
        case LayerKeys.GLAD_ALERTS:
          childComponent = <GladControls layer={layer} />;
        break;
        case LayerKeys.TERRA_I_ALERTS:
          childComponent = <TerraIControls layer={layer} />;
        break;
        default:
          childComponent = null;
      }

      let checkbox;
      if (layer.subId) {
        const checked = dynamicLayers[layer.id] && dynamicLayers[layer.id].indexOf(layer.subIndex) > -1;
        checkbox = <LayerCheckbox key={layer.subId} layer={layer} subLayer={true} checked={checked}>
          {childComponent}
        </LayerCheckbox>;
      } else {
        checkbox = <LayerCheckbox key={layer.id} layer={layer} checked={activeLayers.indexOf(layer.id) > -1}>
          {childComponent}
        </LayerCheckbox>;
      }
      return checkbox;
    };
  }

  render() {
    const {settings, language} = this.context;
    const layers = settings.layers && settings.layers[language] || [];
    const extraBasemaps = settings.basemaps && settings.basemaps[language] || [];
    const groups = [];
    //- Get a unique list of groups, first remove layers that dont belong to a group
    layers.filter(layer => layer.group).forEach((layer) => {
      if (!utils.containsObject(groups, 'key', layer.groupKey)) {
      // if (groups.indexOf(layer.group) === -1) {
        groups.push({
          label: layer.group,
          key: layer.groupKey
        });
      }
    });

    //- Swap the last two entries, the name can change so we can't use that for the swap
    //- but we need Land Use (or whatever it gets namedin between the two Land Cover groups)
    if (groups.length > 2) {
      const swap = groups[groups.length - 1];
      groups[groups.length - 1] = groups[groups.length - 2];
      groups[groups.length - 2] = swap;
    }
    //- Create the layerGroup components
    const layerGroups = groups.map((group, index) => {
      return this.renderLayerGroup(group, layers, index);
    });

    layerGroups.push(this.renderBasemapGroup(extraBasemaps));

    return (
      <div className={`layer-panel custom-scroll`}>
        {layerGroups}
      </div>
    );
  }

}
