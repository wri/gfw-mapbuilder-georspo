import TileCanvasLayer from './EsriTileCanvasBase';
import declare from 'dojo/_base/declare';
import utils from 'utils/AppUtils';

/**
* NOTE: options.maxDateValue will get set the first time setDateRange is called, this happens
* after the TerraIControls component requests the json from ImageServer and parses the grid code
* from the maxValues property
*/

const baseJulianYear = 2000;

export default declare('TerraILayer', [TileCanvasLayer], {

  filter: function (data) {
    for (var i = 0; i < data.length; i += 4) {
      // Decode the rgba/pixel so I can filter on confidence and date ranges
      var slice = [data[i], data[i + 1], data[i + 2]];
      var values = this.decodeDate(slice);
      //- Check against min and max date
      if (values.date >= this.options.minDateValue && values.date <= this.options.maxDateValue) {
        // Set the alpha to the intensity
        data[i + 3] = values.intensity;
        // Make the pixel pink for glad alerts
        // Note, this may mess up the decode date function if it's called at a future date as the decoded information comes from the pixel
        data[i] = 255; // R
        data[i + 1] = 102; // G
        data[i + 2] = 153; // B
      } else {
        // Hide the pixel
        data[i + 3] = 0;
      }
    }
    return data;
  },

  decodeDate: function (pixel) {
    // Terra-I Grid Code, red band + green band
    const gridCode = pixel[0] + pixel[1];
    //- Year of loss
    const date = this.getJulianDateFromGridCode(gridCode);
    // Intensity of alert
    let intensity = pixel[2];
    // Prevent intensity from being higher then the max value
    if (intensity > 255) { intensity = 255; }
    // Return all components needed for filtering/labeling
    return {
      intensity,
      date
    };
  },

  //- Math provided by WRI ,we want julian year like so, 4220, Equals 220th day in 2004 (4000 + 220 days)
  getJulianDateFromGridCode: function (gridCode) {
    const {year, day} = utils.getDateFromGridCode(gridCode);
    return ((year % baseJulianYear) * 1000) + day;
  },

  setDateRange: function setDateRange (minDate, maxDate) {
    this.options.minDateValue = parseInt(minDate);
    this.options.maxDateValue = parseInt(maxDate);
    this.refresh();
  }

});
