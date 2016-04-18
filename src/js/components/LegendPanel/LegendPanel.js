import mapActions from 'actions/MapActions';
import React from 'react';

let closeSymbolCode = 9660,
    openSymbolCode = 9650;

const closeSvg = '<use xlink:href="#shape-close" />';

export default class LegendPanel extends React.Component {

  render () {
    let {
      tableOfContentsVisible,
      legendOpen
    } = this.props;

    let rootClasses = legendOpen ? 'legend-panel map-component shadow' : 'legend-panel map-component shadow legend-collapsed';

    //- Hide the legend if the TOC is not visible (eye button)
    if (!tableOfContentsVisible) {
      rootClasses += ' hidden';
    }

    return (
      <div className={rootClasses}>

        <div className='legend-title mobile-hide' onClick={mapActions.toggleLegendVisible}>
          <span>
            Legend
          </span>
          <span className='layer-category-caret' onClick={mapActions.toggleLegendVisible}>
            {String.fromCharCode(legendOpen ? closeSymbolCode : openSymbolCode)}
          </span>
        </div>

        <div title='close' className='legend-close close-icon pointer mobile-show' onClick={mapActions.toggleLegendVisible}>
          <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: closeSvg }}/>
        </div>

        <div className='legend-layers'>
          <div id='legend' className={`${legendOpen ? '' : 'hidden'}`}></div>
        </div>
      </div>
    );
  }

}
