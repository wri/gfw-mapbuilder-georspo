//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';
import text from 'js/languages';

export default class BiomassChart extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      grossEmissions: 0,
      grossLoss: 0
    };
  }

  componentDidMount() {
    const {data, colors, labels} = this.props;
    const {language} = this.context;
    const {series, grossLoss, grossEmissions} = charts.formatSeriesForBiomassLoss({
      data: data,
      lossColor: colors.loss,
      carbonColor: colors.carbon,
      lossName: text[language].ANALYSIS_CARBON_LOSS,
      carbonName: 'MtCO2'
    });

    this.setState({
      loading: false,
      grossEmissions,
      grossLoss
    });

    charts.makeBiomassLossChart(this.refs.chart, {
      series,
      categories: labels
    });

  }

  render () {
    const {grossEmissions, grossLoss, loading} = this.state;
    const {language} = this.context;

    return (
      <div>
        <div ref='chart' className='biomass-loss analysis__chart-container'></div>
        <div className={loading ? 'hidden' : ''}>
          <div className='analysis__legend-container'>
            <span>{text[language].ANALYSIS_CARBON_LOSS}</span>
            <span>{Math.round(grossLoss)} ha</span>
          </div>
          <div className='analysis__legend-container'>
            <span>{text[language].ANALYSIS_CARBON_EMISSION}</span>
            <span>{Math.round(grossEmissions)}m MtCO2</span>
          </div>
        </div>
      </div>
    );
  }

}

BiomassChart.propTypes = {
  data: PropTypes.object.isRequired
};
