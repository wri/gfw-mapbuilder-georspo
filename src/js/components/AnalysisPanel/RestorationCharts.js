import React, {PropTypes, Component} from 'react';
import appUtils from 'utils/AppUtils';
import charts from 'utils/charts';
import text from 'js/languages';

const formatData = (counts, labels, colors) => {
  return labels.map((label, index) => {
    const value = typeof counts[index] === 'number' ?
      appUtils.roundToHundred(counts[index]) :
      counts[index];

    return {
      name: label,
      data: [value],
      color: colors[index]
    };
  }).filter((item) => {
    return item.data[0] && item.name !== 'No Data';
  });
};

/**
* Make sure both values are either truthy or falsy, otherwise return flase
*/
const haveSameBoolState = (a, b) => (!!a && !!b) || (!a && !b);

export default class RestorationCharts extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = { hasErrors: false };
  }

  componentDidMount() {
    const {slopeChart, landCoverChart, populationChart, treeCoverChart, rainfallChart} = this.refs;
    const {results} = this.props;
    const {settings, language} = this.context;
    //- Format the data into series highcharts can easily consume
    const slopeData = formatData(results.slope, settings.slopeClasses, settings.slopeColors);
    const lcData = formatData(results.landCover, settings.landCoverClasses, settings.landCoverColors);
    const popData = formatData(results.population, settings.populationClasses, settings.populationColors);
    const tcData = formatData(results.treeCover, settings.treeCoverClasses, settings.treeCoverColors);
    const rainfallData = formatData(results.rainfall, settings.rainfallClasses, settings.rainfallColors);
    //- If there is data and this chart is enabled, show it, make sure they both have the same
    //- boolean state otherwise something went wrong (e.g. true with data or false and no data),
    //- and we should show the error message
    if (
      haveSameBoolState(settings.restorationSlopePotential, slopeData.length) &&
      haveSameBoolState(settings.restorationLandCover, lcData.length) &&
      haveSameBoolState(settings.restorationPopulation, popData.length) &&
      haveSameBoolState(settings.restorationTreeCover, tcData.length) &&
      haveSameBoolState(settings.restorationRainfall, rainfallData.length)
    ) {
      if (settings.restorationSlopePotential) {
        charts.makeRestorationBarChart(slopeChart, text[language].ANALYSIS_SLOPE_CHART_HEADER, slopeData);
      }
      if (settings.restorationLandCover) {
        charts.makeRestorationBarChart(landCoverChart, text[language].ANALYSIS_LAND_COVER_CHART_HEADER, lcData);
      }
      if (settings.restorationPopulation) {
        charts.makeRestorationBarChart(populationChart, text[language].ANALYSIS_POPULATION_CHART_HEADER, popData);
      }
      if (settings.restorationTreeCover) {
        charts.makeRestorationBarChart(treeCoverChart, text[language].ANALYSIS_TREE_COVER_CHART_HEADER, tcData);
      }

      if (settings.restorationRainfall) {
        charts.makeRestorationBarChart(rainfallChart, text[language].ANALYSIS_RAINFALL_CHART_HEADER, rainfallData);
      }
    } else {
      this.setState({ hasErrors: true });
    }
  }

  render () {
    const {language, settings} = this.context;
    const {hasErrors} = this.state;

    return hasErrors ? <div className='restoration-error'>{text[language].ANALYSIS_RESTORATION_ERROR}</div> :
      (
        <div className='restoration-charts'>
          <div ref='slopeChart' className={`analysis__chart-container${settings.restorationSlopePotential ? '' : ' hidden'}`} />
          <div ref='landCoverChart' className={`analysis__chart-container${settings.restorationLandCover ? '' : ' hidden'}`} />
          <div ref='populationChart' className={`analysis__chart-container${settings.restorationPopulation ? '' : ' hidden'}`} />
          <div ref='treeCoverChart' className={`analysis__chart-container${settings.restorationTreeCover ? '' : ' hidden'}`} />
          <div ref='rainfallChart' className={`analysis__chart-container${settings.restorationRainfall ? '' : ' hidden'}`} />
        </div>
      );
  }
}

RestorationCharts.propTypes = {
  results: PropTypes.object.isRequired
};
