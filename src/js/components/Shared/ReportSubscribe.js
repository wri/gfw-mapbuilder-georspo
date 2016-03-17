import React, { PropTypes, Component } from 'react';
import keys from 'constants/StringKeys';
import appUtils from 'utils/AppUtils';
import text from 'js/languages';

export default class ReportSubscribeButtons extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  printReport = () => {
    const { map, settings, language } = this.context;
    const selectedFeature = map.infoWindow && map.infoWindow.getSelectedFeature();

    if (selectedFeature) {
      appUtils.generateReport({
        selectedFeature: selectedFeature,
        settings: settings,
        canopyDensity: 30,
        lang: language
      });
    }

  };

  render () {
    const { language } = this.context;

    return (
      <div className='report-sub-buttons'>
        <button className='fa-button gold' onClick={this.printReport}>
          {text[language][keys.PRINT_REPORT]}
        </button>
        <button className='fa-button gold'>
          {text[language][keys.SUBSCRIBE]}
        </button>
      </div>
    );
  }

}
