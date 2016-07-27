//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

export default class BiomassChart extends Component {

  componentDidMount() {
    const {data} = this.props;
    const {
      co2_loss_by_year,
      tree_loss_by_year,
      biomass_loss_by_year
    } = data;

    const totalCO2Loss = Object.keys(co2_loss_by_year).map(key => co2_loss_by_year[key]).reduce((a, b) => a + b, 0);
    const carbonEmissions = Object.keys(biomass_loss_by_year).map(key => biomass_loss_by_year[key]);
    const treeCoverLoss = Object.keys(tree_loss_by_year).map(key => tree_loss_by_year[key]);
    const totalLoss = treeCoverLoss.reduce((a, b) => a + b, 0);

    console.log('MtCO2', totalCO2Loss);
    console.log('Carbon', carbonEmissions);
    console.log('TCL', treeCoverLoss);
    console.log('TL', totalLoss);

    charts.makeBiomassLossChart(this.refs.chart, data);
  }


  render () {
    return (
      <div ref='chart' className='biomass-loss'></div>
    );
  }

}

BiomassChart.propTypes = {
  data: PropTypes.object.isRequired
};
