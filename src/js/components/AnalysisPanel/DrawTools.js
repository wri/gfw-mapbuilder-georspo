import geometryUtils from 'utils/geometryUtils';
import mapActions from 'actions/MapActions';
import Draw from 'esri/toolbars/draw';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

const drawSvg = '<use xlink:href="#icon-analysis-draw" />';

export default class DrawTools extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      drawButtonActive: false
    };
  }

  componentDidMount () {
    const {map} = this.context;
    // If this component unmounts and destroys itself, recreate it
    if (!this.toolbar && map.loaded) {
      this.createToolbar(map);
    }
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    const {map} = this.context;
    // Wait for the map to load and create it
    if (!this.toolbar && map.loaded) {
      this.createToolbar(map);
    } else if (prevContext.map !== map && map.loaded) { // If the map changes, recreate it
      this.createToolbar(map);
    }
  }

  createToolbar = (map) => {
    this.toolbar = new Draw(map);
    this.toolbar.on('draw-end', (evt) => {
      this.deactivate();
      // Add graphic to map and set as active feature
      const graphic = geometryUtils.generateDrawnPolygon(evt.geometry);
      map.graphics.add(graphic);
      map.infoWindow.setFeatures([graphic]);
    });
  };

  draw = () => {
    // if active, toggle it off
    if (this.state.drawButtonActive) {
      this.deactivate();
    } else {
      this.activate();
      //- If the analysis modal is visible, hide it
      mapActions.toggleAnalysisModal({ visible: false });
    }
  };

  activate = () => {
    const {map} = this.context;
    this.toolbar.activate(Draw.POLYGON);
    this.setState({ drawButtonActive: true });
    // Disable popups while this is active
    map.__clickEventHandle.remove();
  };

  deactivate = () => {
    const {map} = this.context;
    this.toolbar.deactivate();
    this.setState({ drawButtonActive: false });
    // Reconnect the popups and reset the clickEventHandle
    map.__clickEventHandle = map.on('click', map.__clickEventListener);
  };

  renderInstructionList = (instruction, index) => {
    return (
      <li key={index} dangerouslySetInnerHTML={{ __html: instruction }}></li>
    );
  };

  render () {
    const {embeddedInModal} = this.props;
    const {language} = this.context;
    const instructions = embeddedInModal ?
            text[language].ANALYSIS_DRAW_INSTRUCTIONS.slice(1) :
            text[language].ANALYSIS_DRAW_INSTRUCTIONS;

    return (
      <div className='analysis-instructions__draw'>
        <h4 className='analysis-instructions__header'>
          {text[language].ANALYSIS_DRAW_HEADER}
        </h4>
        <ol className='analysis-instructions__olist'>
          {instructions.map(this.renderInstructionList)}
        </ol>
        <div className='analysis-instructions__draw-icon-container'>
          <svg className='analysis-instructions__draw-icon' dangerouslySetInnerHTML={{ __html: drawSvg }} />
        </div>
        <div
          className={`fa-button gold analysis-instructions__draw-button ${this.state.drawButtonActive ? 'active' : ''}`}
          onClick={this.draw}>
          {text[language].ANALYSIS_DRAW_BUTTON}
        </div>
        <div className='analysis-instructions__separator'>
          <span className='analysis-instructions__separator-text'>{text[language].ANALYSIS_OR}</span>
        </div>
      </div>
    );
  }

}

DrawTools.propTypes = {
  embeddedInModal: PropTypes.boolean
};
