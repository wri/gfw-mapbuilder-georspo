//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

export default class BarChart extends Component {
  componentDidMount() {
    const {labels, colors, counts, name} = this.props;
    let series = [{
      name: name,
      data: counts
    }];

    charts.makeSimpleBarChart(this.refs.chart, labels, colors, series);
  }

  render () {
    return (
      <div ref='chart'></div>
    );
  }
}

BarChart.propTypes = {
  counts: PropTypes.array.isRequried,
  labels: PropTypes.array.isRequried,
  colors: PropTypes.array.isRequried,
  name: PropTypes.string.isRequried
};
