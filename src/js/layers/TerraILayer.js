import TileCanvasLayer from './EsriTileCanvasBase';
import declare from 'dojo/_base/declare';

function pad (num) {
  var str = '00' + num;
  return str.slice(str.length - 3);
}

export default declare('TerraILayer', [TileCanvasLayer], {

  filter: function (data) {
    for (var i = 0; i < data.length; i += 4) {
      // Decode the rgba/pixel so I can filter on confidence and date ranges
      var slice = [data[i], data[i + 1], data[i + 2]];
      var values = this.decodeDate(slice);
      //- Check against min date, and max date
      if (values.year >= 2004) {
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
    const year = Math.floor((gridCode - 1) / 23) + 2004;
    //- Day of loss
    const day = (((gridCode - 1) % 23) * 16) + 1;
    // Intensity of alert
    let intensity = pixel[2];
    // Prevent intensity from being higher then the max value
    if (intensity > 255) { intensity = 255; }
    // Return all components needed for filtering/labeling
    return {
      intensity,
      year,
      day
    };
  },

  setDateRange: function setDateRange (minDate, maxDate) {
    this.options.minDateValue = parseInt(minDate);
    this.options.maxDateValue = parseInt(maxDate);
    this.refresh();
  }

});
