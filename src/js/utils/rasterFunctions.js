import RasterFunction from 'esri/layers/RasterFunction';
import MosaicRule from 'esri/layers/MosaicRule';

//- These tells me the raster id needed to filter the biomass layer based on canopyDensity
const BIOMASS_DENSITY_ID_LOOKUP = {
  '10': '1',
  '15': '2',
  '20': '3',
  '25': '4',
  '30': '5',
  '50': '6',
  '75': '7'
};

export default {

  /**
  * Generate a Colormap Raster Function that Remaps the data to the output values
  * @param {array} colormap - An Array of arrays representing the colormap, eg. [[1, 225, 225, 225]]
  * @param {array} inputRanges - [inclusive, exclusive], if your doing 1 - 3, should look like [1, 4]
  * @param {array} outputValues
  */
  getColormapRemap: (colormap, inputRanges, outputValues) => {
    return new RasterFunction({
      'rasterFunction': 'Colormap',
      'rasterFunctionArguments': {
        'Colormap': colormap,
        'Raster': {
          'rasterFunction': 'Remap',
          'rasterFunctionArguments': {
            'InputRanges': inputRanges,
            'OutputValues': outputValues,
            'AllowUnmatched': false
          }
        }
      },
      'variableName': 'Raster'
    });
  },

  buildCanopyFunction: (minYear, maxYear, miniumCanopyDensity) => {
    return new RasterFunction({
      'rasterFunction': 'ForestCover_lossyear_density',
      'rasterFunctionArguments': {
        'min_year': +minYear,
        'max_year': +maxYear,
        'min_density': miniumCanopyDensity,
        'max_density': 100
      }
    });
  },

  getBiomassMosaicRule: (miniumCanopyDensity) => {
    return new MosaicRule({
      'where': `OBJECTID = ${BIOMASS_DENSITY_ID_LOOKUP[miniumCanopyDensity]}`,
      'mosaicMethod': 'esriMosaicNorthwest',
      'mosaicOperation': 'MT_FIRST',
      'ascending': true,
      'sortField': ''
    });
  }

};
