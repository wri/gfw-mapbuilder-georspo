import React, { Component } from 'react';
import request from 'utils/request';
import utils from 'utils/AppUtils';
import all from 'dojo/promise/all';

const STATS = {
  url: 'http://gis-gfw.wri.org/arcgis/rest/services/forest_change/MapServer/2',
  field: 'date',
  outFields: ['date']
};

export default class SadControls extends Component {

  constructor (props) {
    super(props);
    this.state = {
      min_month: 0,
      max_month: 0,
      min_year: 0,
      max_year: 0
    };
  }

  componentDidMount () {
    //- Get the bounds for this layer
    all({
      'MIN': request.getLayerStatistics({ type: 'min', ...STATS }),
      'MAX': request.getLayerStatistics({ type: 'max', ...STATS })
    }).then(results => {
      const {MIN, MAX} = results;
      let minDate = MIN.features.length && MIN.features[0].attributes.date;
      let maxDate = MAX.features.length && MAX.features[0].attributes.date;

      if (minDate && maxDate) {
        minDate = new Date(minDate);
        maxDate = new Date(maxDate);

        this.setState({
          min_month: utils.pad(minDate.getMonth() + 1, 0, 2),
          max_month: utils.pad(maxDate.getMonth() + 1, 0, 2),
          min_year: minDate.getFullYear(),
          max_year: maxDate.getFullYear()
        });
      }

    });
  }

  componentDidUpdate () {

  }

  renderMonthOptions () {
    let value;
    return utils.range(1, 12).map(num => {
      value = utils.pad(num, 0, 2);
      return <option value={value}>{value}</option>;
    });
  }

  renderYearOptions (min_year, max_year) {
    return utils.range(min_year, max_year).map(year => {
      return <option value={year}>{year}</option>;
    });
  }

  render () {
    const {min_month, max_month, min_year, max_year} = this.state;
    //- If min_month, or any value for that matter, is still 0, don't render the UI
    if (min_month) { return <div />; }

    return (
      <div />
    );
  }

}
