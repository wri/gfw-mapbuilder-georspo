//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

export default class SlopeBarChart extends Component {
  componentDidMount() {
    const {labels, colors, counts, tooltips} = this.props;
    const element = this.refs.chart;
    const series = [{
      name: 'Get from Callee',
      data: counts
    }];

    charts.makeSlopeBarChart(element, labels, colors, tooltips, series);
  }

  render () {
    return (
      <div ref='chart' id='slope-breakdown'></div>
    );
  }
}

SlopeBarChart.propTypes = {
  counts: PropTypes.array.isRequried,
  labels: PropTypes.array.isRequried,
  colors: PropTypes.array.isRequried,
  tooltips: PropTypes.array.isRequried
};
