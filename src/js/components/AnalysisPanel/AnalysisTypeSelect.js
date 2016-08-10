import analysisKeys from 'constants/AnalysisConstants';
import layerKeys from 'constants/LayerConstants';
import mapActions from 'actions/MapActions';
import appUtils from 'utils/AppUtils';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

export default class AnalysisTypeSelect extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired
  };

  constructor (props, context) {
    super(props, context);
    // Get options for the select
    const options = this.prepareOptions(context.language);
    this.state = { options };
    // Set the default analysis type
    mapActions.setAnalysisType.defer({
      target: { value: options[0].value }
    });
  }

  componentWillReceiveProps (nextProps, nextContext) {
    const {language} = this.context;
    if (language !== nextContext.language) {
      this.setState({ options: this.prepareOptions(nextContext.language) });
    }
  }

  prepareOptions = (language) => {
    const {settings} = this.context;
    const layers = settings.layers[language];
    let options = text[language].ANALYSIS_SELECT_TYPE_OPTIONS;
    //- Remove options not included based on settings
    //- Also, remove Tree Cover Options if those layers are not in the settings.layers.config
    options = options.filter((option) => {
      switch (option.value) {
        case analysisKeys.SLOPE:
          return settings.restorationModule;
        case analysisKeys.INTACT_LOSS:
          return settings.intactForests;
        case analysisKeys.BIO_LOSS:
          return settings.aboveGroundBiomass;
        case analysisKeys.LC_LOSS:
          return settings.landCover;
        case analysisKeys.LCC:
          return settings.landCover;
        case analysisKeys.FIRES:
          return settings.activeFires;
        case analysisKeys.MANGROVE_LOSS:
          return settings.mangroves;
        case analysisKeys.SAD_ALERTS:
          return settings.sadAlerts;
        case analysisKeys.GLAD_ALERTS:
          return settings.gladAlerts;
        case analysisKeys.TC_LOSS:
          return appUtils.containsObject(layers, 'id', layerKeys.TREE_COVER_LOSS);
        case analysisKeys.TC_LOSS_GAIN:
          return appUtils.containsObject(layers, 'id', layerKeys.TREE_COVER_GAIN);
        default:
          return true;
      }
    });
    //- Merge in the restoration options if the module is enabled
    if (settings.restorationModule) {
      const {restorationOptions} = settings.labels[language];
      restorationOptions.forEach((restorationOption) => {
        options.unshift({
          value: restorationOption.id,
          label: restorationOption.label,
          group: analysisKeys.ANALYSIS_GROUP_RESTORATION
        });
      });
    }

    return options;
  }

  renderOption = (group) => {
    return (option, index) => {
      // If this option is not a member of the correct group, dont render it
      if (option.group !== group) { return null; }
      return <option key={index} value={option.value}>{option.label}</option>;
    };
  };

  renderGroup = (groupKey) => {
    const {language} = this.context;
    const {options} = this.state;
    return (
      <optgroup key={groupKey} label={text[language][groupKey]}>
        {options.map(this.renderOption(groupKey))}
      </optgroup>
    );
  };

  render () {
    const {activeAnalysisType} = this.props;
    const {options} = this.state;
    let groupKeys = [];
    const groups = {};
    let activeOption;
    let optionElements;
    //- Get a unique list of groups so I can render groups if necessary
    options.forEach((option) => { groups[option.group] = true; });
    groupKeys = Object.keys(groups);
    //- Get the selected option
    activeOption = options.filter((option) => option.value === activeAnalysisType)[0];

    if (groupKeys.length === 1) {
      optionElements = options.map(this.renderOption(groupKeys[0]));
    } else {
      optionElements = groupKeys.map(this.renderGroup);
    }

    return (
      <div className='relative'>
        <select
          value={activeAnalysisType}
          className='analysis-results__select pointer'
          onChange={mapActions.setAnalysisType}>
          {optionElements}
        </select>
        <div className='analysis-results__select-style'>
          {activeOption && activeOption.label || ''}
        </div>
      </div>
    );
  }

}
