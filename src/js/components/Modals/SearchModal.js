import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import {attributes} from 'constants/AppConstants';
import graphicsUtils from 'esri/graphicsUtils';
import mapActions from 'actions/MapActions';
import ComboBox from 'dijit/form/ComboBox';
import Memory from 'dojo/store/Memory';
import request from 'utils/request';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

let currentPromise,
    searchDijit,
    searchStore;

const INFO_WINDOW_REG_EX = /{(.*)}/;

export default class SearchModal extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    webmapInfo: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.createSearchWidget();
  }

  createSearchWidget = () => {
    let {language} = this.context;
    let searchLayer;
    searchStore = new Memory({ data: [] });
    searchDijit = new ComboBox({
      store: searchStore,
      searchAttr: 'name',
      placeholder: text[language].SEARCH,
      onKeyUp: (evt) => {
        const {webmapInfo} = this.context;
        language = this.context.language;
        searchLayer = webmapInfo.operationalLayers.filter((layer) => {
          return layer.id.search(`_${language}`) > -1;
        })[0];

        const {target, keyCode} = evt;
        if (searchLayer && searchLayer.url && target.value !== '' && keyCode !== 13) {
          if (currentPromise && !currentPromise.isResolved()) {
            currentPromise.cancel();
          }

          currentPromise = request.findTaskByLayer(target.value, searchLayer);
          currentPromise.then((results) => {
            const data = [];
            results.forEach((result) => {
              data.push({
                id: result.feature.attributes.OBJECTID || result.feature.attributes.objectid,
                name: `${result.value} [${result.layerName}]`,
                layerId: result.layerId,
                layerName: result.layerName
              });
            });
            searchDijit.store.setData(data);
          });
        }
      },
      onChange: () => {
        const {map} = this.context;
        const {item} = searchDijit;
        if (item) {
          const url = `${searchLayer.url}/${item.layerId}`;
          request.queryTaskById(url, item.id).then((response) => {
            // TODO: DISCUSS, THIS IS A HACK TO MAKE TO THE CURRENT SETUP WORK,
            // WE SHOULD REVISE THE WHOLE SEARCH EXPERIENCE FOR MANY REASONS,
            // Current search depends on dynamic layers with language code and only works on 1,
            // Does not include any geosearch capabilities, just a search on a layer
            response.features.map((feature) => {
              const layer = map.getLayer(`${searchLayer.layerObject.id}_${item.layerId}`);
              let title = '', content = '';
              //- Set this attribute so I can do custom things in InfoWindow
              feature.attributes.__source = attributes.SOURCE_SEARCH;
              //- We need to build up the content, if the layer does not exist,
              //- its because no info template was configured in AGOL
              if (layer && layer.infoTemplate && layer.infoTemplate.info) {
                const {info} = layer.infoTemplate;
                title = info.title.replace(INFO_WINDOW_REG_EX, ($1, $2) => feature.attributes[$2] ? feature.attributes[$2] : '');
                content = this.generateEsriPopupContent(info, feature);
              } else {
                content = `<div class='infoWindow__no-configure'>
                  No Popup information configured in webmap or layer not available.
                </div>`;
              }
              //- Set the Info Template
              feature.infoTemplate = {
                title: title,
                content: content
              };
            });
            map.infoWindow.setFeatures(response.features);
            this.onClose();
            const extent = graphicsUtils.graphicsExtent(response.features);
            if (extent) {
              map.setExtent(extent.expand(1.2), true);
            }
          });
        }
      }
    }, 'search-widget');
    searchDijit.startup();
  };

  generateEsriPopupContent = (info, feature) => {
    //- Esri Wrapper class - Content class - Table class - Label class - Field class
    // .esriViewPopup .mainSection .attrTable .attrName & .attrValue
    let content = '';
    info.fieldInfos.filter((item) => item.visible).forEach((item) => {
      content += `<tr>
        <td class='attrName'>${item.label}</td>
        <td class='attrValue'>${feature.attributes[item.fieldName]}</td>
      </tr>`;
    });

    //- Add Esri's Classes so we do not need to apply any styling
    return `<div class='esriViewPopup'><div class='mainSection'>
      <table class='attrTable'>${content}</table>
    </div></div>`;
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
        <div id='search-widget'></div>
      </ControlledModalWrapper>
    );
  }
}
