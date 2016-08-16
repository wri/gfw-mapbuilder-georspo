//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';
import text from 'js/languages';
import number from 'dojo/number';

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
    //- Data is in million tons for emission, multiply by a million so we can show tons
    //- If they change this on the API Side, remove this code
    Object.keys(data.biomass_loss_by_year).forEach((key) => {
      data.biomass_loss_by_year[key] *= 1000000;
    });

    const {series, grossLoss, grossEmissions} = charts.formatSeriesForBiomassLoss({
      data,
      lossColor: colors.loss,
      carbonColor: colors.carbon,
      lossName: text[language].ANALYSIS_CARBON_LOSS,
      carbonName: 't CO2'
    });

    //- Data is in million tons for emission, multiply by a million so we can show tons
    // If they update the api, remove the * 1000000
    this.setState({
      loading: false,
      grossEmissions: grossEmissions * 1000000,
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
            <span>{number.format(grossLoss, { places: 0 })} ha</span>
          </div>
          <div className='analysis__legend-container'>
            <span>{text[language].ANALYSIS_CARBON_EMISSION}</span>
            <span>{number.format(grossEmissions, { places: 0 })} t CO<sub>2</sub></span>
          </div>
        </div>
      </div>
    );
  }

}

BiomassChart.propTypes = {
  data: PropTypes.object.isRequired
};
