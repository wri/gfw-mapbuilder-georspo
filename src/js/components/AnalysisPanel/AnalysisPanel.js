import Instructions from 'components/AnalysisPanel/Instructions';
import DrawTools from 'components/AnalysisPanel/DrawTools';
import Upload from 'components/AnalysisPanel/Upload';
import Analysis from 'components/AnalysisPanel/Analysis';
import analysisKeys from 'constants/AnalysisConstants';
import React, {
  Component,
  PropTypes
} from 'react';

export default class AnalysisPanel extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  render () {
    const {map} = this.context;
    let selectedFeature;
    let content;

    //- Infer the selected feature from the info window
    if (map.infoWindow && map.infoWindow.getSelectedFeature()) {
      selectedFeature = map.infoWindow.getSelectedFeature();
    }

    if (selectedFeature !== undefined &&
      selectedFeature.geometry &&
      selectedFeature.geometry.type === analysisKeys.GEOMETRY_POLYGON
    ) {
      content = <Analysis selectedFeature={selectedFeature} {...this.props} />;
    } else {
      content = [<Instructions key='instructions' />, <DrawTools key='tools' />, <Upload key='upload'/>];
    }

    return (
      <div className='analysis-panel custom-scroll relative'>
        {content}
      </div>
    );
  }

}
