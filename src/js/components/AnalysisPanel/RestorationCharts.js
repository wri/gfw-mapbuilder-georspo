/* eslint no-unused-vars: 0 */
//- These charts have a dependency of highcharts
import text from 'js/languages';
import keys from 'constants/StringKeys';
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

const formatData = (counts, labels, colors) => {
  return labels.map((label, index) => {
    return {
      name: label,
      data: [counts[index]],
      color: colors[index]
    };
  }).filter((item) => {
    return item.data[0] && item.name !== 'No Data';
  });
};

export default class RestorationCharts extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  componentDidMount() {
    const {slopeChart, landCoverChart, populationChart, treeCoverChart} = this.refs;
    const {results, config} = this.props;
    const {language} = this.context;
    //- Format the data into series highcharts can easily consume
    const slopeData = formatData(results.slope, config.slopeClasses, config.slopeColors);
    const lcData = formatData(results.landCover, text[language][keys.ANALYSIS_RESTORATION_LC_LABELS], config.landCoverColors);
    const popData = formatData(results.population, config.populationClasses, config.populationColors);
    const tcData = formatData(results.treeCover, config.treeCoverClasses, config.treeCoverColors);
    //- Generate Charts
    charts.makeRestorationBarChart(slopeChart, 'Slope', slopeData);
    charts.makeRestorationBarChart(landCoverChart, 'Land Cover', lcData);
    charts.makeRestorationBarChart(populationChart, 'Population Density', popData);
    charts.makeRestorationBarChart(treeCoverChart, '% Tree cover', tcData);
  }

  render () {
    return (
      <div className='restoration-charts'>
        <div ref='slopeChart' />
        <div ref='landCoverChart' />
        <div ref='populationChart' />
        <div ref='treeCoverChart' />
      </div>
    );
  }
}

RestorationCharts.propTypes = {
  results: PropTypes.object.isRequried,
  config: PropTypes.object.isRequried
};
