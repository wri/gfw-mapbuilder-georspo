import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import {esriLayerTypes} from 'constants/AppConstants';
import mapActions from 'actions/MapActions';
import text from 'js/languages';
import Search from 'esri/dijit/Search';
import FeatureLayer from 'esri/layers/FeatureLayer';
import InfoTemplate from 'esri/InfoTemplate';
import React, {
  Component,
  PropTypes
} from 'react';

export default class SearchModal extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    webmapInfo: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  componentDidUpdate() {
    this.createSearchWidget();
  }
  componentDidUpdate(prevProps, prevState, prevContext) {
    const {map} = this.context;
    if (map.loaded && !prevContext.map.loaded) {
      this.createSearchWidget(map);
    }
  }

  createSearchWidget = (map) => {
    const {webmapInfo, language} = this.context;
    const layers = webmapInfo.operationalLayers;
    let sources = [];

    if (layers && layers.length) {
      layers.forEach(layer => {
        // If this is a dynamic layer
        if (layer.layerType === esriLayerTypes.DYNAMIC) {
          // If we have layer infos in a dynamic layer, push each one into the sources array
          if (layer.layerObject && layer.layerObject.layerInfos && layer.layerObject.layerInfos.length) {
            sources = sources.concat(layer.layerObject.layerInfos.map((info) => ({
              featureLayer: new FeatureLayer(`${layer.url}/${info.id}`, {
                infoTemplate: new InfoTemplate('', `<div class="search__info-window-callout">${text[language].SEARCH_CLICK_FOR_MORE}</div>`)
              }),
              name: info.name,
              maxResults: 6,
              maxSuggestions: 6,
              enableSuggestions: true,
              minCharacters: 2,
              outFields: ['*'],
              exactMatch: false,
              placeholder: info.name
            })));
          }
        } else if (esriLayerTypes.FEATURE) {
          if (layer.layerObject) {
            sources.push({
              featureLayer: layer.layerObject,
              name: layer.title,
              maxResults: 6,
              maxSuggestions: 6,
              enableSuggestions: true,
              minCharacters: 2,
              outFields: ['*'],
              exactMatch: false,
              placeholder: layer.title
            });
          }
        }
      });
    }

    const searchWidget = new Search({
      map: map,
      enableHighlight: false,
      showInfoWindowOnSelect: true
    }, this.refs.searchNode);

    const defaultSources = searchWidget.get('sources');
    sources = sources.concat(defaultSources);
    searchWidget.set('sources', sources);
    searchWidget.startup();
  };

  onClose = () => {
    mapActions.toggleSearchModal({ visible: false });
  };

  render () {
    const {language} = this.context;

    return (
      <ControlledModalWrapper onClose={this.onClose}>
        <div className='search-widget-label'>
          {text[language].SEARCH_WIDGET_TITLE}
        </div>
        <div id='search-widget' ref='searchNode' className='search-widget'></div>
      </ControlledModalWrapper>
    );
  }
}
