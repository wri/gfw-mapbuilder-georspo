import geometryUtils from 'utils/geometryUtils';
import mapActions from 'actions/MapActions';
import Draw from 'esri/toolbars/draw';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

const drawSvg = '<use xlink:href="#icon-analysis-draw" />';

let toolbar;

export default class Tools extends Component {

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
    if (!toolbar && map.loaded) {
      toolbar = new Draw(map);
      toolbar.on('draw-end', (evt) => {
        toolbar.deactivate();
        this.setState({ drawButtonActive: false });
        let graphic = geometryUtils.generateDrawnPolygon(evt.geometry);
        map.graphics.add(graphic);
      });
    }
  }

  draw = () => {
    toolbar.activate(Draw.FREEHAND_POLYGON);
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
    const {language} = this.context;

    return (
      <div className='analysis-instructions__draw'>
        <h4 className='analysis-instructions__header'>
          {text[language].ANALYSIS_DRAW_HEADER}
        </h4>
        <ol className='analysis-instructions__olist'>
          {text[language].ANALYSIS_DRAW_INSTRUCTIONS.map(this.renderInstructionList)}
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
