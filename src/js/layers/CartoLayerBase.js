import SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol';
import webMercatorUtils from 'esri/geometry/webMercatorUtils';
import SimpleFillSymbol from 'esri/symbols/SimpleFillSymbol';
import SimpleLineSymbol from 'esri/symbols/SimpleLineSymbol';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import geojsonUtil from 'utils/arcgis-to-geojson';
import InfoTemplate from 'esri/InfoTemplate';
import layerUtils from 'utils/layerUtils';
import declare from 'dojo/_base/declare';
import Graphic from 'esri/graphic';
import request from 'dojo/request';
import dojoJSON from 'dojo/json';
import {urls} from 'js/config';
import Color from 'esri/Color';


export default declare('CartoLayer', [GraphicsLayer], {
  /*
   * params must contain
   * - user <string> CartoDB User Name
   * - symbolDictionary <object> Dictionary of symbols for features.
   *   - symbol options: point | mulitpoint | polyline | polygon
   * - infoTemplate <esri/InfoTemplate>
   */
  constructor: function(resource) {
    const { cartoColor, cartoIcon, cartoUser, cartoQuery, cartoDataType, cartoLineWidth, popup, id, cartoApiKey } = resource;
    switch (cartoDataType) {
      case 'point':
        this.setPointParams(cartoColor, cartoIcon, cartoUser);
        break;
      case 'line':
        this.setLineParams(cartoColor, cartoUser, cartoLineWidth);
        break;
      case 'polygon':
        this.setPolygonParams(cartoColor, cartoUser);
        break;
    }

    this.cartoUser = cartoUser;
    // this.symbolDictionary = resource.symbolDictionary || null;
    this.infoTemplate = popup || null;
    this.cartoQuery = cartoQuery;
    this.cartoApiKey = cartoApiKey;
    this.id = id;
    this.visible = false;
  },

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

  /**
   * The main query function of the CartoDBLayer
   * @param {string} queryString
   */
  query: function(queryString) {
    var _url = urls.cartoDataEndpoint(this.cartoUser, queryString, this.cartoApiKey);
    request(_url).then(data => {
      var geojson = dojoJSON.parse(data);
      // assumes global Terraformer with ArcGIS Parser loaded
      // var esriJson = Terraformer.ArcGIS.convert(geojson);
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
          //set symbol for graphic and set info template
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
          this.add(graphic);
        }
      });
      this.setInfoTemplate(layerUtils.makeInfoTemplate(this.infoTemplate, 'en'));
      this.emit('querySuccess', this.graphics);
    });
  }
});
