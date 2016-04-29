import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import graphicsUtils from 'esri/graphicsUtils';
import mapActions from 'actions/MapActions';
import ComboBox from 'dijit/form/ComboBox';
import Memory from 'dojo/store/Memory';
import request from 'utils/request';
import utils from 'utils/AppUtils';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

let currentPromise,
    searchDijit,
    searchStore;

export default class SearchModal extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    webmapInfo: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  // state = {
  //   suggestions: []
  // };

  componentDidMount() {
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
                id: result.feature.attributes.OBJECTID,
                name: result.value,
                layerId: result.layerId,
                layerName: result.layerName
              });
              searchDijit.store.setData(data);
            });
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
              const layerInfo = utils.getObject(searchLayer.layers, 'id', item.layerId);
              feature._layer = { name: item.layerName };
              feature.infoTemplate = { info: layerInfo ? layerInfo.popupInfo : {} };
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
  }

  onClose = () => {
    mapActions.toggleSearchModal({ visible: false });
  };

  // keyUp = ({target}) => {
  //   const {language, webmapInfo} = this.context;
  //   //- Find a layer to search, this logic comes from the old Forest Atlas,
  //   //- We will need to discuss how to implement in the new version to support as many layers/fields as possible
  //   //- and still be performant
  //   let searchLayer = webmapInfo.operationalLayers.filter((layer) => {
  //     return layer.id.search(`_${language}`) > -1;
  //   })[0];
  //
  //   if (searchLayer && searchLayer.url && target.value !== '') {
  //     if (currentPromise && !currentPromise.isResolved()) {
  //       currentPromise.cancel();
  //     }
  //
  //     currentPromise = request.findTaskByLayer(target.value, searchLayer);
  //     currentPromise.then((results) => {
  //       this.setState({ suggestions: results});
  //     });
  //   } else {
  //     this.setState({ suggestions: []});
  //   }
  // };
  //
  // renderSuggestions = (suggestion) => {
  //   return (
  //     <div>{suggestion.value}</div>
  //   );
  // };

  render () {
    return (
      <ControlledModalWrapper onClose={this.onClose}>
        <div id='search-widget'></div>
      </ControlledModalWrapper>
    );
  }
}
