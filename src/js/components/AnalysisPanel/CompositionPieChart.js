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
      <div ref='chart'></div>
    );
  }
}

CompositionPieChart.propTypes = {
  counts: PropTypes.array.isRequried,
  labels: PropTypes.array.isRequried,
  colors: PropTypes.array.isRequried,
  name: PropTypes.string.isRequried
};
