import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

export default class SadAlertsChart extends Component {

  componentDidMount () {
    const {alerts} = this.props;
    const categories = [], series = [], degraded = [], deforest = [];
    let year, month;

    //- Create an array of labels and series objects for highcharts
    for (year in alerts) {
      for (month in alerts[year]) {
        categories.push(`${month}/${year}`);
        degraded.push((alerts[year][month].degrad / 10000) || 0);
        deforest.push((alerts[year][month].defor / 10000) || 0);
      }
    }

    series.push({
      name: 'Deforestation',
      data: deforest
    });

    series.push({
      name: 'Degradation',
      data: degraded
    });

    console.log(categories);
    console.log(series);

    // [{ name , color, data }]
  }

  render () {
    return (
      <div ref='chart' />
    );
  }

}

SadAlertsChart.propTypes = {
  features: PropTypes.array.isRequired
};
