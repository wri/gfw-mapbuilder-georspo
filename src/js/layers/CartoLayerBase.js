import SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol';
import webMercatorUtils from 'esri/geometry/webMercatorUtils';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import geojsonUtil from 'utils/arcgis-to-geojson';
import InfoTemplate from 'esri/InfoTemplate';
import layerUtils from 'utils/layerUtils';
import declare from 'dojo/_base/declare';
import Graphic from 'esri/graphic';
import request from 'dojo/request';
import dojoJSON from 'dojo/json';
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
    var marker = SimpleMarkerSymbol();
    marker.setPath(resource.cartoIcon);
    marker.setColor(new Color(resource.cartoColor));
    marker.setAngle(-1);
    marker.setStyle(SimpleMarkerSymbol.STYLE_PATH);
    const params = {
      symbolDictionary: {
        point: marker
      }
    };
    this.symbolDictionary = params.symbolDictionary;
    var urlBuilder = [
      '//',
      resource.cartoUser,
      '.cartodb.com/api/v2/sql?format=GeoJSON&q='
    ];
    this.cartoURL = urlBuilder.join('');
    this.cartoUser = resource.cartoUser;
    // this.symbolDictionary = resource.symbolDictionary || null;
    debugger;
    this.infoTemplate = resource.popup || null;
    this.cartoQuery = resource.cartoQuery;
    this.id = resource.id;
    this.visible = false;
  },

  setParams: function () {
    var marker = SimpleMarkerSymbol();
    marker.setPath('M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z');
    marker.setColor(new Color([92, 92, 92, 1]));
    marker.setAngle(-1);
    marker.setStyle(SimpleMarkerSymbol.STYLE_PATH);
    const params = {
      user: this.cartoUser,
      symbolDictionary: {
        point: marker
      }
    };

    return params;
  },

  /**
   * The main query function of the CartoDBLayer
   * @param {string} queryString
   */
  query: function(queryString) {

    var _url = this.cartoURL.concat(queryString);
    request(_url).then(data => {
      var geojson = dojoJSON.parse(data);
      // assumes global Terraformer with ArcGIS Parser loaded
      // var esriJson = Terraformer.ArcGIS.convert(geojson);
      const esriJson = geojsonUtil.geojsonToArcGIS(geojson);
      esriJson.forEach(x => {
        if (x.geometry) {
          var graphic = new Graphic(x);
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

          // if (!!this.infoTemplate) {
          //   console.log('test');
          //   layerUtils.makeInfoTemplate(this.infoTemplate);
          // } else {
          //   graphic.setInfoTemplate(new InfoTemplate('Attributes', '${*}'));
          // }
          this.add(graphic);
        }
      });
      console.log(this.setInfoTemplate);
      this.setInfoTemplate(layerUtils.makeInfoTemplate(this.infoTemplate));
      this.emit('querySuccess', this.graphics);
    });
  }
});
