// import WaterStressLegend from 'components/LayerPanel/WaterStressLegend';
// import LandCoverLegend from 'components/LayerPanel/LandCoverLegend';
// import SedimentLegend from 'components/LayerPanel/SedimentLegend';
// import DensityDisplay from 'components/LayerPanel/DensityDisplay';
// import WetlandsLegend from 'components/LayerPanel/WetlandsLegend';
import LayerCheckbox from 'components/LayerPanel/LayerCheckbox';
import FiresControls from 'components/LayerPanel/FiresControls';
import LossControls from 'components/LayerPanel/LossControls';
import LayerGroup from 'components/LayerPanel/LayerGroup';
import BasemapGroup from 'components/LayerPanel/BasemapGroup';
import LandsatLayer from 'components/LayerPanel/LandsatLayer';
import BasemapLayer from 'components/LayerPanel/BasemapLayer';
import basemaps from 'esri/basemaps';
import resources from 'resources';
// import DamsLegend from 'components/LayerPanel/DamsLegend';
import mapStore from 'stores/MapStore';
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
    mapStore.listen(this.storeUpdated.bind(this));
    this.state = mapStore.getState();
  }

  storeUpdated () {
    this.setState(mapStore.getState());
  }

  renderLayerGroup = (group, layers) => {
    return (
      <LayerGroup key={group} activeLayers={this.state.activeLayers} label={group}>
        {layers.map(this.checkboxMap(group), this)}
      </LayerGroup>
    );
  };

  renderBasemapGroup = (extraBasemaps) => {
    let basemapLayers = [];
    if (basemaps) {
      let basemapNames = Object.keys(basemaps);
      basemapLayers = basemapNames.map((bm) => {
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
      <BasemapGroup label='Basemap'>
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
        groups.push(layer.group);
      }
    });
    //- Create the layerGroup components
    let layerGroups = groups.map((group) => {
      return this.renderLayerGroup(group, layers);
    });

    layerGroups.push(this.renderBasemapGroup(extraBasemaps));

    return (
      <div className={`layer-panel custom-scroll`}>
        {layerGroups}
      </div>
    );
  }

  checkboxMap (group) {
    return layer => {
      let {activeLayers, dynamicLayers} = this.state;
      // Exclude Layers not part of this group
      if (layer.group !== group) { return null; }
      // TODO: Remove once current layer panel design is approved
      // If it is just a label, render the grop label
      // if (layer.isGroupLabel) { return <div key={layer.id} className='layer-group-label'>{layer.label}</div>; }
      // Some layers have legends or tools and they should be rendered inside the layer checkbox
      let childComponent;
      switch (layer.id) {
      //   case KEYS.waterStress:
      //     childComponent = <WaterStressLegend url={layer.url} layerIds={layer.layerIds} />;
      //     break;
      //   case KEYS.sediment:
      //     childComponent = <SedimentLegend url={layer.url} layerIds={layer.layerIds} />;
      //     break;
      //   case KEYS.majorDams:
      //     childComponent = <DamsLegend url={layer.url} layerIds={layer.layerIds} />;
      //     break;
        case 'ACTIVE_FIRES':
          childComponent = <FiresControls loaded={this.props.loaded} {...this.state} />;
          break;
        case 'TREE_COVER_LOSS':
          childComponent = <LossControls layerId={layer.id} loaded={this.props.loaded} {...this.state} />;
          break;
      //   case KEYS.treeCover:
      //     childComponent = <DensityDisplay {...this.state} />;
      //     break;
      //   case KEYS.landCover:
      //     childComponent = <LandCoverLegend url={layer.url} layerIds={layer.layerIds} />;
      //     break;
      //   case KEYS.wetlands:
      //     childComponent = <WetlandsLegend url={layer.url} layerIds={layer.layerIds} />;
      //     break;
        default:
          childComponent = null;
      }

      if (layer.esriLayer && layer.esriLayer.updating) {
        console.log('\tlayer still updating', layer.subId, layer);
        return null;
      }

      let checkbox;
      if (layer.subId) {
        // console.log('dynamicLayers', dynamicLayers);
        // console.log('LayerPanel::checkbox', layer);
        let checked = dynamicLayers[layer.id] && dynamicLayers[layer.id].indexOf(layer.subIndex) > -1;
        // let checked = activeLayers.indexOf(layer.id) > -1;
        // console.log('checked for', layer.subId, checked);
        checkbox = <LayerCheckbox key={layer.subId} layer={layer} subLayer={true} checked={checked}>
          {childComponent}
        </LayerCheckbox>
      } else {
        checkbox = <LayerCheckbox key={layer.id} layer={layer} checked={activeLayers.indexOf(layer.id) > -1}>
          {childComponent}
        </LayerCheckbox>;
      }
      return checkbox;
      // return <LayerCheckbox key={layer.id} layer={layer} checked={activeLayers.indexOf(layer.id) > -1}>
      // </LayerCheckbox>;

    };
  }

}
