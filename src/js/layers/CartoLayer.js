import SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol';
import SimpleFillSymbol from 'esri/symbols/SimpleFillSymbol';
import SimpleLineSymbol from 'esri/symbols/SimpleLineSymbol';
import CartoLayerBase from './CartoLayerBase';
import graphicsUtils from 'esri/graphicsUtils';
import declare from 'dojo/_base/declare';
import Color from 'esri/Color';

export default declare('CartoLayer', [CartoLayerBase], {
  queryBuilder: function() {
    this.query(this.cartoQuery);
  }
});
