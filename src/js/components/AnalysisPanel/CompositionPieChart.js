//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

export default class CompositionPieChart extends Component {
  componentDidMount() {
    const {labels, colors, counts, name} = this.props;
    const series = charts.formatCompositionAnalysis({
      labels: labels,
      colors: colors,
      counts: counts,
      name: name
    });

    charts.makeCompositionPieChart(this.refs.chart, series);
  }

  render () {
    return (
      <div ref='chart' className='analysis__chart-container'></div>
    );
  }
}

CompositionPieChart.propTypes = {
  counts: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};
