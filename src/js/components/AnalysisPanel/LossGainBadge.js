import keys from 'constants/StringKeys';
import text from 'js/languages';
import React, {PropTypes} from 'react';

const LossGainBadge = (props, context) => {
  const {lossCounts, gainCounts} = props;
  const {language} = context;

  const lossTotal = lossCounts.reduce((a, b) => { return a + b; }, 0);
  const gainTotal = gainCounts.reduce((a, b) => { return a + b; }, 0);

  return (
    <div className='results__loss-gain'>
      <div className='results__loss-badge'>
        <div className='results__loss-gain--label'>{text[language][keys.ANALYSIS_TOTAL_LOSS_LABEL]}</div>
        <div className='results__loss-gain--range'>{text[language][keys.ANALYSIS_TOTAL_LOSS_RANGE]}</div>
        <span className='results__loss--count'>{lossTotal}</span>
        <span className='results__loss--unit'>Ha</span>
      </div>
      <div className='results__gain-badge'>
        <div className='results__loss-gain--label'>{text[language][keys.ANALYSIS_TOTAL_GAIN_LABEL]}</div>
        <div className='results__loss-gain--range'>{text[language][keys.ANALYSIS_TOTAL_GAIN_RANGE]}</div>
        <span className='results__gain--count'>{gainTotal}</span>
        <span className='results__gain--unit'>Ha</span>
      </div>
    </div>
  );
};

LossGainBadge.propTypes = {
  lossCounts: PropTypes.array.isRequired,
  gainCounts: PropTypes.array.isRequired
};

LossGainBadge.contextTypes = {
  language: PropTypes.string.isRequired
};

export { LossGainBadge as default };
