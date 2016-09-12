//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

export default class TotalLossChart extends Component {
  componentDidMount() {
    const {labels, colors, counts, encoder, options, lossLabels} = this.props;
    const element = this.refs.chart;

    const chartInfo = charts.formatSeriesWithEncoder({
      isSimple: options.simple,
      encoder: encoder,
      counts: counts,
      labels: labels,
      colors: colors,
      Xs: encoder.A, // Loss Bounds
      Ys: encoder.B // Raster were crossing with
    });

    charts.makeTotalLossBarChart(element, lossLabels, chartInfo.colors, chartInfo.series);
  }

  render () {
    return (
      <div ref='chart'></div>
    );
  }
}

TotalLossChart.propTypes = {
  counts: PropTypes.array.isRequired,
  encoder: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  lossLabels: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired
};
