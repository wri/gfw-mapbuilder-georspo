import React, {Component, PropTypes} from 'react';
import charts from 'utils/charts';

export default class GladAlertsChart extends Component {

  componentDidMount () {
    const {chart} = this.refs;
    const {data} = this.props;
    console.log(data);
    charts.makeTimeSeriesCharts(chart, {
      data
    });
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
