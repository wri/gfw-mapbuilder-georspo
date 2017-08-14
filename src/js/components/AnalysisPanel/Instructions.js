import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

export default class Instructions extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  renderInstructionList = (instruction, index) => {
    return (
      <li key={index}>{instruction}</li>
    );
  };

  render () {
    const {language} = this.context;

    return (
      <div className='analysis-instructions'>
        <h4 className='analysis-instructions__header'>
          {text[language].ANALYSIS_INSTRUCTION_HEADER}
        </h4>
        <ol className='analysis-instructions__olist'>
          {text[language].ANALYSIS_INSTRUCTION_LIST.map(this.renderInstructionList)}
        </ol>
        <div className='analysis-instructions__draw-icon-container'>
          <svg className='analysis-instructions__draw-icon'>
            <use xlinkHref="#icon-analysis-poly" />
          </svg>
        </div>
        <div className='analysis-instructions__separator'>
          <span className='analysis-instructions__separator-text'>{text[language].ANALYSIS_OR}</span>
        </div>
      </div>
    );
  }

}
