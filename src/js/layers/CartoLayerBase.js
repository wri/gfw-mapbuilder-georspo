import SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol';
import webMercatorUtils from 'esri/geometry/webMercatorUtils';
import SimpleFillSymbol from 'esri/symbols/SimpleFillSymbol';
import SimpleLineSymbol from 'esri/symbols/SimpleLineSymbol';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import layerInfoCache from 'utils/layerInfoCache';
import geojsonUtil from 'utils/arcgis-to-geojson';
import InfoTemplate from 'esri/InfoTemplate';
import layerUtils from 'utils/layerUtils';
// import appActions from 'actions/AppActions';
import Deferred from 'dojo/Deferred';
import Graphic from 'esri/graphic';
import request from 'dojo/request';
import resources from 'resources';
import dojoJSON from 'dojo/json';
import {urls} from 'js/config';
import Color from 'esri/Color';
import declare from 'dojo/_base/declare';

export default declare('CartoLayer', [GraphicsLayer], {
  /*
   * params must contain
   * - user <string> CartoDB User Name
   * - symbolDictionary <object> Dictionary of symbols for features.
   *   - symbol options: point | mulitpoint | polyline | polygon
   * - infoTemplate <esri/InfoTemplate>
   */
  constructor: function(resource) {
    const { cartoColor, cartoIcon, cartoUser, cartoQuery, cartoDataType, cartoLineWidth, popup, id, cartoApiKey, cartoTemplateId } = resource;
    this.cartoUser = cartoUser;
    this.cartoTemplateId = cartoTemplateId;
    this.infoTemplate = popup || null;
    this.cartoQuery = cartoQuery;
    this.cartoApiKey = cartoApiKey;
    this.cartoColor = cartoColor;
    this.cartoIcon = cartoIcon;
    this.cartoDataType = cartoDataType;
    this.cartoLineWidth = cartoLineWidth;
    this.id = id;
    this.visible = false;
    this.cartoLayers = null;
  },

  /*
   *  Takes in the data type of the carto layer
   *  Returns the a symbolDictionary to draw the shapes onto the map
  */
  setParameters: function(cartoDataType) {
    switch (cartoDataType) {
      case 'Point':
      this.setPointParams(this.cartoColor, this.cartoIcon, this.cartoUser);
      break;
      case 'MultiLineString':
      this.setLineParams(this.cartoColor, this.cartoUser, this.cartoLineWidth);
      break;
      case 'MultiPolygon':
      this.setPolygonParams(this.cartoColor, this.cartoUser);
      break;
    }
  },

  /*
  *  Gets the layer name from the Carto metadata call
  **/
  getLayerName: function(layer, layerId) {
    const promise = new Deferred();
    layerInfoCache.fetch(layer, layerId).then(layerInfo => {
      this.modalLayerInfo = layerInfo;
      promise.resolve(layerInfo);
    });
    return promise;
  },

  processCartoCSS: function(cartoCSS) {
    // Converting from cartoCSS to arrays
    let right = cartoCSS.match(/[^:\]]+(?=;)/g);
    let left = cartoCSS.match(/.+?(?=:)/g);
    right = right.map(function(string) { return string.trim(); });
    left = left.map(function(string) { return string.trim(); });
    // Creating an object out of the cartoCSS
    const cartoObj = {};
    left.forEach((leftProp, index) => {
      cartoObj[leftProp] = right[index];
    });
  },

  /*
  * Using a Carto map template, get the layers
  * Returns an object of layers with their ID, data type, and query
  **/
  getLayers: function() {
    // Getting the Carto template url
    const _url = urls.cartoTemplateEndpoint(this.cartoUser, this.cartoTemplateId, this.cartoApiKey);
    let json = {};

    // Making a call to get the Carto template
    request(_url).then((template) => {
      json = dojoJSON.parse(template);
      const layers = json.template.layergroup.layers;
      const cartoMapID = json.template.layergroup.stat_tag;
      const cartoLayers = resources.layerPanel.GROUP_CARTO.layers;
      const deferreds = [];

      this.getLayerName(cartoLayers[0], cartoMapID).then(response => {
        layers.forEach((layer, i) => {
          
          // Continue if the layer is a data layer or else skip
          if(layer.options.cartocss === undefined) {
            return;
          }
          const cartoTemplate = 'CARTO_TEMPLATE' + i;

          // Getting the query out of the original carto returned query
          const cartoQuery = layer.options.sql.match(/\((.*?)\)/)[1];

          // Querying carto to get the geojson layer
          this.query(cartoQuery, cartoTemplate, i - 1, callback)
          // deferreds.push(cartoType);

          // all(deferreds).then
          this.processCartoCSS(layer.options.cartocss, cartoType);

          cartoLayers.push({
              order: i + 1,
              id: cartoTemplate,
              type: 'carto',
              url: 'cartoLayer',
              colormap: [[1, 0, 179, 0]],
              opacity: 0.8,
              label: {
                en: response.layerNames[i - 1],
                fr: response.layerNames[i - 1],
                es: response.layerNames[i - 1],
                pt: response.layerNames[i - 1],
                id: response.layerNames[i - 1],
                zh: response.layerNames[i - 1]
              },
              sublabel: {
                en: '(carto_layer)',
                fr: '(carto_layer)',
                es: '(carto_layer)',
                pt: '(carto_layer)',
                id: '(carto_layer)',
                zh: '(carto_layer)'
              },
              popup: {
                title: {
                  en: response.layerNames[i - 1]
                },
                content: {
                  en: []
                }
              }
            });
        });
        // Removing the first carto layer as it is the template
        cartoLayers.shift();
        const tempResources = resources;
        tempResources.layerPanel.GROUP_CARTO.layers = cartoLayers;
        this.cartoLayers = cartoLayers;
        this.loaded = true;
        this.emit('tim');
      });
    });
  },

  /**
  * Adds the layer to the list of graphics. This could be improved not to use
  * the global brApp.map
  **/
  addLayer: function(graphic, id, meta) {
    const graphLayer = new GraphicsLayer({
      id: id,
      visible: false
    });
    for(var i = 0; i < graphic.length; i++) {
      graphLayer.add(graphic[i]);
      graphLayer.setInfoTemplate(layerUtils.makeInfoTemplate(meta, 'en'));
    }
    graphLayer.title = meta.title.en;
    graphLayer.type = 'CARTO';
    brApp.map.addLayer(graphLayer);
    brApp.map.removeLayer('CARTO_TEMPLATE');
    graphLayer.redraw();
  },

  /**
  * Sets the parameters for the Carto points
  **/
  setPointParams: function (cartoColor, cartoIcon, cartoUser) {
    var marker = SimpleMarkerSymbol();
    marker.setPath(cartoIcon);
    marker.setColor(new Color(cartoColor));
    marker.setAngle(-1);
    marker.setStyle(SimpleMarkerSymbol.STYLE_PATH);
    const params = {
      user: cartoUser,
      symbolDictionary: {
        point: marker
      }
    };
    this.symbolDictionary = params.symbolDictionary;
  },

  /**
  * Sets the parameters for the Carto polylines
  **/
  setLineParams: function (cartoColor, cartoUser, cartoLineWidth) {
    var line = SimpleLineSymbol();
    line.setStyle(SimpleLineSymbol.STYLE_SOLID);
    line.setColor(new Color(cartoColor));
    line.setWidth(cartoLineWidth);

    const params = {
      user: cartoUser,
      symbolDictionary: {
        polyline: line
      }
    };
    this.symbolDictionary = params.symbolDictionary;
  },

  /**
  * Sets the parameters for the Carto polygons
  **/
  setPolygonParams: function (cartoColor, cartoUser) {
    var polygon = SimpleFillSymbol();
    polygon.setStyle(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([52, 152, 219]), 2));
    polygon.setStyle(SimpleLineSymbol.STYLE_SOLID);
    polygon.setColor(new Color(cartoColor));

    const params = {
      user: cartoUser,
      symbolDictionary: {
        polygon: polygon
      }
    };
    this.symbolDictionary = params.symbolDictionary;
  },

  setMetadataFields: function(properties, layerNumber) {
    const popupContent = resources.layerPanel.GROUP_CARTO.layers[layerNumber].popup.content.en;
    for(var property in properties) {
      popupContent.push({
        label: property,
        fieldExpression: property
      });
    }
    const meta = resources.layerPanel.GROUP_CARTO.layers[layerNumber].popup;
    return meta;
  },

  /**
   * The main query function of the CartoDBLayer
   * @param {string} queryString
   */
  query: function(cartoQuery, cartoTemplate, layerNumber) {
    const promise = new Deferred();
    var _url = urls.cartoDataEndpoint(this.cartoUser, cartoQuery, this.cartoApiKey);
    const cartoLayers = resources.layerPanel.GROUP_CARTO.layers;
    const errCount = [];
    var esriJsonLayer = [];
    request.id = 2;

    request(_url, {timeout: 15000}).then((data) => {
      var geojson = dojoJSON.parse(data);
      const meta = this.setMetadataFields(geojson.features[0].properties, layerNumber);
      this.setParameters(geojson.features[0].geometry.type);
      const esriJson = geojsonUtil.geojsonToArcGIS(geojson);

      esriJson.forEach(feature => {
        if (feature.geometry) {
          var graphic = new Graphic(feature);
          //project geometry to web mercator if needed

          if (graphic.geometry.spatialReference.wkid === 4326){
            graphic.setGeometry(
              webMercatorUtils.geographicToWebMercator(graphic.geometry)
            );
          }

          // Set the symbolDictionary depending on the geometry type
          if (!!this.symbolDictionary) {
            graphic.setSymbol(
              this.symbolDictionary[graphic.geometry.type]
            );
          }
          else {
            return this.emit('queryDrawError', {
              message: 'No symbolDictionary for feature'
            });
          }
          esriJsonLayer.push(graphic);
        }
      });
      this.addLayer(esriJsonLayer, cartoTemplate, meta);
    }, (graphic) => {
      const cartoLayerLength = resources.layerPanel.GROUP_CARTO.layers.length + errCount;
      delete cartoLayers[(cartoLayerLength - 1) - layerNumber];
      const tempResources = resources;
      tempResources.layerPanel.GROUP_CARTO.layers = cartoLayers;
      this.cartoLayers = cartoLayers;
      this.loaded = true;
      this.emit('onCartoLayerAdd');
      promise.resolve(graphic.geometry.type);
    });
  }
});
