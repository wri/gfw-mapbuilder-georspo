import React, {Component, PropTypes} from 'react';
import charts from 'utils/charts';

export default class TimeSeriesChart extends Component {

  componentDidMount () {
    const {chart} = this.refs;
    charts.makeTimeSeriesCharts(chart, this.props);
  }

  render () {
    return (
      <div ref='chart' />
    );
  }

}

TimeSeriesChart.propTypes = {
  data: PropTypes.array.isRequired
};
