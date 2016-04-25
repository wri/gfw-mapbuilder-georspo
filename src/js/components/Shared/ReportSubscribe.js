import React, { PropTypes, Component } from 'react';
import mapStore from 'stores/MapStore';
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
      const {canopyDensity} = mapStore.getState();
      appUtils.generateReport({
        selectedFeature: selectedFeature,
        canopyDensity: canopyDensity,
        settings: settings,
        lang: language
      });
    }

  };

  render () {
    const { language, settings } = this.context;

    return (
      <div className='report-sub-buttons'>
        <button className='fa-button gold' onClick={this.printReport}>
          {text[language].PRINT_REPORT}
        </button>
        {!settings.includeSubscribeButton ? null :
          <button className='fa-button gold'>
            {text[language].SUBSCRIBE}
          </button>
        }
      </div>
    );
  }

}
