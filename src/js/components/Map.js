/* eslint no-unused-vars: 0 */
/* Creating some esri dijits needs the above rule disabled, choosing this over no-new */
import AnalysisModal from 'components/Modals/AnalysisModal';
import Controls from 'components/MapControls/ControlPanel';
import CanopyModal from 'components/Modals/CanopyModal';
import Legend from 'components/LegendPanel/LegendPanel';
import TabButtons from 'components/TabPanel/TabButtons';
import SearchModal from 'components/Modals/SearchModal';
import PrintModal from 'components/Modals/PrintModal';
import {applyStateFromUrl} from 'utils/shareUtils';
import TabView from 'components/TabPanel/TabView';
import layerKeys from 'constants/LayerConstants';
import arcgisUtils from 'esri/arcgis/utils';
import mapActions from 'actions/MapActions';
import Scalebar from 'esri/dijit/Scalebar';
import {getUrlParams} from 'utils/params';
import layerUtils from 'utils/layerUtils';
import MapStore from 'stores/MapStore';
import {mapConfig} from 'js/config';
import React, {
  Component,
  PropTypes
} from 'react';

export default class Map extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  static childContextTypes = {
    webmapInfo: PropTypes.object,
    map: PropTypes.object
  };

  getChildContext = () => {
    return {
      webmapInfo: this.webmapInfo,
      map: this.map
    };
  };

  constructor (props) {
    super(props);
    this.map = {};
    this.webmapInfo = {};
    this.state = MapStore.getState();
  }

  componentDidMount() {
    MapStore.listen(this.storeDidUpdate);
  }

  componentDidUpdate (prevProps) {
    const settings = this.props.settings;
    if (prevProps.settings.webmap !== settings.webmap) {
      this.createMap(settings);
    }
  }

  storeDidUpdate = () => {
    this.setState(MapStore.getState());
  };

  createMap = (settings) => {
    const {language} = this.context;
    arcgisUtils.createMap(settings.webmap, this.refs.map, { mapOptions: mapConfig.options }).then(response => {
      this.webmapInfo = response.itemInfo.itemData;
      // Add operational layers from the webmap to the array of layers from the config file.
      const {itemData} = response.itemInfo;
      itemData.operationalLayers.forEach((ol) => {
        // TODO:  filter out layers specific to selected language.
        // For dynamic layers, create a layer entry for each sublayer.
        if (ol.layerType === 'ArcGISMapServiceLayer') {
          ol.resourceInfo.layers.forEach(lyr => {
            const visible = ol.layerObject.visibleLayers.indexOf(lyr.id) > -1;
            const scaleDependency = (lyr.minScale > 0 || lyr.maxScale > 0);
            settings.layers[language].push({
              id: ol.id,
              subId: `${ol.id}_${lyr.id}`,
              subIndex: lyr.id,
              hasScaleDependency: scaleDependency,
              maxScale: lyr.maxScale,
              minScale: lyr.minScale,
              group: settings.labels[language].webmapMenuName,
              groupKey: layerKeys.GROUP_WEBMAP,
              label: lyr.name,
              opacity: 1,
              visible: visible,
              esriLayer: ol.layerObject
            });
          });
        } else {
          settings.layers[language].push({
            id: ol.id,
            group: settings.labels[language].webmapMenuName,
            groupKey: layerKeys.GROUP_WEBMAP,
            label: ol.title,
            opacity: ol.opacity,
            visible: ol.visibility,
            esriLayer: ol.layerObject
          });
        }
      });

      this.map = response.map;
      // Remove any basemap or reference layers so they don't interfere with the
      // basemap switcher in the layer panel works.
      const basemap = itemData && itemData.baseMap;
      if (basemap.baseMapLayers.length) {
        const basemapName = layerUtils.getBasemapName(basemap.baseMapLayers);
        basemap.baseMapLayers.forEach(bm => this.map.removeLayer(bm.layerObject));
        this.map.setBasemap(basemapName);
      }

      this.map.graphics.clear();
      this.map.infoWindow.set('popupWindow', false);
      //- Attach events I need for the info window
      this.map.infoWindow.on('show, hide, set-features, selection-change', mapActions.infoWindowUpdated);
      this.map.on('zoom-end', mapActions.mapUpdated);
      //- When custom features are clicked, apply them to the info window, this will trigger above event
      this.map.graphics.on('click', (evt) => {
        evt.stopPropagation();
        this.map.infoWindow.setFeatures([evt.graphic]);
      });

      //- Add a scalebar
      const scalebar = new Scalebar({
        map: this.map
      });

      const updateEnd = this.map.on('update-end', () => {
        updateEnd.remove();
        mapActions.createLayers(this.map, settings.layers[language]);
        //- Set the default basemap in the store
        mapActions.changeBasemap(this.map.getBasemap());
        //- Apply the mask layer defintion if present
        if (settings.iso && settings.iso !== '') {
          const maskLayer = this.map.getLayer(layerKeys.MASK);
          if (maskLayer) {
            const layerDefs = [];
            maskLayer.visibleLayers.forEach((layerNum) => {
              layerDefs[layerNum] = `code_iso3 <> '${encodeURIComponent(settings.iso)}'`;
            });
            maskLayer.setLayerDefinitions(layerDefs);
            maskLayer.show();
          }
        }
      });
      //- Load any shared state if available
      applyStateFromUrl(this.map, getUrlParams(location.search));
      //- Make the map a global in debug mode for easier debugging
      if (brApp.debug) { brApp.map = this.map; }

    });
  };

  render () {
    const {
      printModalVisible,
      analysisModalVisible,
      searchModalVisible,
      canopyModalVisible
    } = this.state;

    return (
      <div className='map-container'>
        <div ref='map' className='map'>
          <Controls {...this.state} />
          <TabButtons {...this.state} />
          <TabView {...this.state} />
          <Legend {...this.state} />
        </div>
        <div className={`analysis-modal-container modal-wrapper ${analysisModalVisible ? '' : 'hidden'}`}>
          <AnalysisModal />
        </div>
        <div className={`print-modal-container modal-wrapper ${printModalVisible ? '' : 'hidden'}`}>
          <PrintModal />
        </div>
        <div className={`search-modal-container modal-wrapper ${searchModalVisible ? '' : 'hidden'}`}>
          <SearchModal />
        </div>
        <div className={`canopy-modal-container modal-wrapper ${canopyModalVisible ? '' : 'hidden'}`}>
          <CanopyModal />
        </div>
      </div>
    );
  }
}
