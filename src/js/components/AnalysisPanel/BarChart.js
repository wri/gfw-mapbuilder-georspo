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
      <div ref='chart' className='analysis__chart-container'></div>
    );
  }
}

BarChart.propTypes = {
  counts: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};
