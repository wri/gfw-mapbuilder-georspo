import {prepareStateForShare} from 'utils/shareUtils';
import modalActions from 'actions/ModalActions';
import mapActions from 'actions/MapActions';
import {toQuery} from 'utils/params';
import React, {
  Component,
  PropTypes
} from 'react';

//- SVG Elements
const zoomInSvg = '<use xlink:href="#icon-plus" />';
const zoomOutSvg = '<use xlink:href="#icon-minus" />';
const shareSvg = '<use xlink:href="#icon-share" />';
const drawSvg = '<use xlink:href="#icon-draw-upload" />';
const printSvg = '<use xlink:href="#icon-print" />';
const searchSvg = '<use xlink:href="#icon-control-search" />';
const legendSvg = '<use xlink:href="#icon-legend" />';
const toggleSvgOff = '<use xlink:href="#icon-controls-toggle__off" />';
const toggleSvgOn = '<use xlink:href="#icon-controls-toggle__on" />';
const resetIconSvg = '<use xlink:href="#icon-reset" />';

export default class ControlPanel extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  zoomIn = () => {
    const {map} = this.context;
    map.setZoom(map.getZoom() + 1);
  };

  zoomOut = () => {
    const {map} = this.context;
    map.setZoom(map.getZoom() - 1);
  };

  search = () => {
    mapActions.toggleSearchModal({ visible: true });
  };

  share = () => {
    const {map, language, settings} = this.context;
    modalActions.showShareModal(toQuery(prepareStateForShare({
      map: map,
      language: language,
      settings: settings
    })));
  };

  showAnalysisTools = () => {
    mapActions.toggleAnalysisModal({ visible: true });
  };

  showPrintTools = () => {
    mapActions.togglePrintModal({ visible: true });
  };

  showLegend = () => {
    mapActions.toggleLegendVisible();
  };

  togglePanels = () => {
    mapActions.toggleTOCVisible({ visible: !this.props.tableOfContentsVisible });
  };

  resetPage = () => {
    window.location.reload();
  };

  render () {
    let {tableOfContentsVisible} = this.props;

    return (
      <div className='control-panel map-component shadow'>
        <ul className='control-panel__list'>
          <li className='control-panel__zoom-out pointer' title='Zoom Out' onClick={this.zoomOut}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: zoomOutSvg }}/>
          </li>
          <li className='control-panel__zoom-in pointer' title='Zoom In' onClick={this.zoomIn}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: zoomInSvg }}/>
          </li>
          <li className='control-panel__share-map pointer' title='Share' onClick={this.share}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: shareSvg }}/>
          </li>
          <li className='control-panel__print pointer mobile-hide' title='Print' onClick={this.showPrintTools}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: printSvg }}/>
          </li>
          <li className='control-panel__draw-upload pointer' title='Analysis' onClick={this.showAnalysisTools}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: drawSvg }}/>
          </li>
          <li className='control-panel__locate-me pointer' title='Search' onClick={this.search}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: searchSvg }}/>
          </li>
          <li className='control-panel__toggle-panels pointer mobile-hide' title='Toggle Panel' onClick={this.togglePanels}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: tableOfContentsVisible ? toggleSvgOn : toggleSvgOff }}/>
          </li>
          <li className='control-panel__reset pointer mobile-hide' title='Reset' onClick={this.resetPage}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: resetIconSvg }}/>
          </li>
          <li className='control-panel__legend pointer mobile-show' title='Legend' onClick={this.showLegend}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: legendSvg }}/>
          </li>
        </ul>
      </div>
    );
  }

}
