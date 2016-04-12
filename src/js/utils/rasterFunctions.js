import RasterFunction from 'esri/layers/RasterFunction';

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
  }

};
