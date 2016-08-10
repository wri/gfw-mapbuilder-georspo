import React, {Component, PropTypes} from 'react';
import charts from 'utils/charts';

export default class GladAlertsChart extends Component {

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

GladAlertsChart.propTypes = {
  data: PropTypes.array.isRequired
};
