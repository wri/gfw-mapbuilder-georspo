//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

export default class TotalLossChart extends Component {
  componentDidMount() {
    const {labels, colors, counts, encoder, options, lossLabels} = this.props;
    const element = this.refs.chart;
    let Xs = encoder.A; // Loss Bounds
    let Ys = encoder.B; // Raster were crossing with

    const chartInfo = charts.formatSeriesWithEncoder({
      isSimple: options.simple,
      encoder: encoder,
      counts: counts,
      labels: labels,
      colors: colors,
      Xs: Xs,
      Ys: Ys
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
  counts: PropTypes.array.isRequried,
  encoder: PropTypes.object.isRequried,
  options: PropTypes.object.isRequried,
  lossLabels: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequried
};
