import {prepareStateForShare} from 'utils/shareUtils';
import modalActions from 'actions/ModalActions';
import mapActions from 'actions/MapActions';
import {toQuerystring} from 'utils/params';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

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
    modalActions.showShareModal(toQuerystring(prepareStateForShare({
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

  showTimeline = () => {
    mapActions.toggleMobileTimeWidgetVisible();
  };

  togglePanels = () => {
    mapActions.toggleTOCVisible({ visible: !this.props.tableOfContentsVisible });
  };

  resetPage = () => {
    window.location.reload();
  };

  render () {
    const {tableOfContentsVisible, timeEnabled} = this.props;
    const {language} = this.context;

    return (
      <div className='control-panel map-component shadow'>
        <ul className='control-panel__list'>
          <li className='control-panel__zoom-out pointer' title={text[language].TOOL_ZOOM_OUT} onClick={this.zoomOut}>
            <svg className='svg-icon'><use xlinkHref="#icon-minus" /></svg>
          </li>
          <li className='control-panel__zoom-in pointer' title={text[language].TOOL_ZOOM_IN} onClick={this.zoomIn}>
            <svg className='svg-icon'><use xlinkHref="#icon-plus" /></svg>
          </li>
          <li className='control-panel__share-map pointer' title={text[language].TOOL_SHARE} onClick={this.share}>
            <svg className='svg-icon'><use xlinkHref="#icon-share" /></svg>
          </li>
          <li className='control-panel__print pointer mobile-hide' title={text[language].TOOL_PRINT} onClick={this.showPrintTools}>
            <svg className='svg-icon'><use xlinkHref="#icon-print" /></svg>
          </li>
          <li className='control-panel__draw-upload pointer' title={text[language].TOOL_ANALYSIS} onClick={this.showAnalysisTools}>
            <svg className='svg-icon'><use xlinkHref="#icon-draw-upload" /></svg>
          </li>
          <li className='control-panel__locate-me pointer' title={text[language].SEARCH} onClick={this.search}>
            <svg className='svg-icon'><use xlinkHref="#icon-control-search" /></svg>
          </li>
          <li className='control-panel__toggle-panels pointer mobile-hide' title={text[language].TOOL_TOGGLE} onClick={this.togglePanels}>
            {tableOfContentsVisible ?
              <svg className='svg-icon'><use xlinkHref="#icon-controls-toggle__on" /></svg> :
              <svg className='svg-icon'><use xlinkHref="#icon-controls-toggle__off" /></svg>
            }
          </li>
          <li className='control-panel__reset pointer mobile-hide' title={text[language].TOOL_RESET} onClick={this.resetPage}>
            <svg className='svg-icon'><use xlinkHref="#icon-reset" /></svg>
          </li>
          <li className='control-panel__legend pointer mobile-show' title={text[language].LEGEND} onClick={this.showLegend}>
            <svg className='svg-icon'><use xlinkHref="#icon-legend" /></svg>
          </li>
          <li className={`control-panel__legend pointer mobile-show ${timeEnabled ? '' : 'hidden'}`} title={text[language].TIMELINE} onClick={this.showTimeline}>
            <svg className='svg-icon'><use xlinkHref="#icon-timeline" /></svg>
          </li>
        </ul>
      </div>
    );
  }

}
