// import WaterStressLegend from 'components/LayerPanel/WaterStressLegend';
// import LandCoverLegend from 'components/LayerPanel/LandCoverLegend';
// import SedimentLegend from 'components/LayerPanel/SedimentLegend';
import DensityDisplay from 'components/LayerPanel/DensityDisplay';
// import WetlandsLegend from 'components/LayerPanel/WetlandsLegend';
import LayerCheckbox from 'components/LayerPanel/LayerCheckbox';
import FiresControls from 'components/LayerPanel/FiresControls';
import LossControls from 'components/LayerPanel/LossControls';
import LayerGroup from 'components/LayerPanel/LayerGroup';
import BasemapGroup from 'components/LayerPanel/BasemapGroup';
import LandsatLayer from 'components/LayerPanel/LandsatLayer';
import BasemapLayer from 'components/LayerPanel/BasemapLayer';
import LayerKeys from 'constants/LayerConstants';
import basemaps from 'esri/basemaps';
// import DamsLegend from 'components/LayerPanel/DamsLegend';
// import mapStore from 'stores/MapStore';
// import layersHelper from 'js/helpers/LayersHelper';
import React, {
  Component,
  PropTypes
} from 'react';

export default class LayerPanel extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    // mapStore.listen(this.storeUpdated.bind(this));
    // this.state = mapStore.getState();
  }

  storeUpdated () {
    // this.setState(mapStore.getState());
  }

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
    let basemapLayers = [];
    if (basemaps) {
      let basemapNames = Object.keys(basemaps);
      basemapNames = basemapNames.filter(bm => {
        // Rather than showing traditional tiled and vector tile basemap options,
        // only show the vector tile basemap.
        return !basemaps.hasOwnProperty(bm + '-vector');
      });
      basemapLayers = basemapNames.map(bm => {
        return (
          <BasemapLayer icon={basemaps[bm].thumbnailUrl} label={basemaps[bm].title} basemap={bm} />
        );
      });
    }

    let landsat = extraBasemaps[0];
    if (landsat) {
      basemapLayers.unshift(
        <LandsatLayer icon={landsat.thumbnailUrl} label={landsat.title} years={landsat.years} />
      );
    }

    return (
      <BasemapGroup label='Basemap' activeTOCGroup={this.props.activeTOCGroup}>
        {basemapLayers}
      </BasemapGroup>
    );
  };

  render() {
    const {settings, language} = this.context;
    const layers = settings.layers && settings.layers[language] || [];
    const extraBasemaps = settings.basemaps && settings.basemaps[language] || [];
    let groups = [];
    //- Get a unique list of groups
    layers.forEach((layer) => {
      if (groups.indexOf(layer.group) === -1) {
        groups.push({
          label: layer.group,
          key: layer.groupKey
        });
      }
    });
    //- Swap the last two entries, the name can change so we can't use that for the swap
    //- but we need Land Use (or whatever it gets namedin between the two Land Cover groups)
    if (groups.length > 2) {
      let swap = groups[groups.length - 1];
      groups[groups.length - 1] = groups[groups.length - 2];
      groups[groups.length - 2] = swap;
    }
    //- Create the layerGroup components
    let layerGroups = groups.map((group, index) => {
      return this.renderLayerGroup(group, layers, index);
    });

    layerGroups.push(this.renderBasemapGroup(extraBasemaps));

    return (
      <div className={`layer-panel custom-scroll`}>
        {layerGroups}
      </div>
    );
  }

  checkboxMap (groupKey) {
    return layer => {
      let {activeLayers, dynamicLayers, ...props} = this.props;
      // Exclude Layers not part of this group
      if (layer.groupKey !== groupKey) { return null; }
      // TODO: Remove once current layer panel design is approved
      // If it is just a label, render the grop label
      // if (layer.isGroupLabel) { return <div key={layer.id} className='layer-group-label'>{layer.label}</div>; }
      // Some layers have legends or tools and they should be rendered inside the layer checkbox
      let childComponent;
      switch (layer.id) {
        case 'ACTIVE_FIRES':
          childComponent = <FiresControls loaded={this.props.loaded} {...props} />;
          break;
        case 'TREE_COVER_LOSS':
          childComponent = <LossControls layerId={layer.id} loaded={this.props.loaded} {...props} />;
          break;
        case LayerKeys.TREE_COVER:
          childComponent = <DensityDisplay {...props} />;
          break;
        default:
          childComponent = null;
      }

      let checkbox;
      if (layer.subId) {
        let checked = dynamicLayers[layer.id] && dynamicLayers[layer.id].indexOf(layer.subIndex) > -1;
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

}
