import Polygon from 'esri/geometry/Polygon';
import Point from 'esri/geometry/Point';
import Graphic from 'esri/graphic';

const graphicsHelper = {

  /**
  * Generate a point from the lat/lon inputs, or any valid lat/lon
  * @param {number} lat - Valid latitude between -90 and 90
  * @param {number} lon - Valid longitude between -180 and 180
  * @return {point} point - return an esri point object that can be used for future methods
  */
  generatePointFromLatLng: (lat, lon) => {
    return new Point(lon, lat);
  },

  /**
  * Generate a Graphic from the provided feature JSON
  * @param {object} feature - must have geometry and should have attributes
  * @return {Graphic} - return an Esri Graphic object that can be used for future methods
  */
  makePolygon: feature => {
    if (!feature.geometry.spatialReference) { feature.geometry.spatialReference = { wkid: 102100 }; }
    return new Graphic(
      new Polygon(feature.geometry),
      null, //- No symbol necessary
      feature.attributes || {}
    );
  },

  /**
  * Clear all features from the map
  * TODO: May be able to delete this as this may not be necessary
  */
  clearFeatures () {
    brApp.map.graphics.clear();
  }

};

export { graphicsHelper as default };
