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

  componentWillReceiveProps() {
    const {map} = this.context;
    if (!this.toolbar && map.loaded) {
      this.createToolbar(map);
    }
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    const {map} = this.context;
    if (prevContext.map !== map && map.loaded) {
      // delete here and let willReceiveProps recreate it
      delete this.toolbar;
    }
  }

  createToolbar = (map) => {
    this.toolbar = new Draw(map);
    this.toolbar.on('draw-end', (evt) => {
      this.toolbar.deactivate();
      this.setState({ drawButtonActive: false });
      const graphic = geometryUtils.generateDrawnPolygon(evt.geometry);
      map.graphics.add(graphic);
      map.infoWindow.setFeatures([graphic]);
    });
  };

  draw = () => {
    this.toolbar.activate(Draw.FREEHAND_POLYGON);
    this.setState({ drawButtonActive: true });
    //- If the analysis modal is visible, hide it
    mapActions.toggleAnalysisModal({ visible: false });
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
