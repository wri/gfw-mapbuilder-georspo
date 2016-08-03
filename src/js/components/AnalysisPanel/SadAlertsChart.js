import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

export default class SadAlertsChart extends Component {

  componentDidMount () {
    const {categories, series} = charts.formatSadAlerts(this.props);
    const {chart} = this.refs;
    charts.makeStackedBarChart(chart, categories, series);
  }

  render () {
    return (
      <div ref='chart' />
    );
  }

}

SadAlertsChart.propTypes = {
  alerts: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
  names: PropTypes.object.isRequired
};
