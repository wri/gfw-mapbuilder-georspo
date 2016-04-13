import tabKeys from 'constants/TabViewConstants';
import mapActions from 'actions/MapActions';
import text from 'js/languages';
import React, {Component, PropTypes} from 'react';

//- Parse Keys for easier access
const {
  DOCUMENTS,
  LAYERS,
  ANALYSIS,
  INFO_WINDOW,
  NARRATIVE,
  MORE
} = tabKeys;

const documentsSvg = '<use xlink:href="#icon-documents" />';
const dataSvg = '<use xlink:href="#icon-data" />';
const layersSvg = '<use xlink:href="#icon-basemap" />';
const narrativeSvg = '<use xlink:href="#shape-info" />';
const analysisSvg = '<use xlink:href="#icon-analysis" />';
const menuSvg = '<use xlink:href="#icon-menu" />';

export default class TabButtons extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired
  };

  componentDidMount() {
    let activeTab = window && window.innerWidth > 950 ? NARRATIVE : '';
    mapActions.changeActiveTab(activeTab);
  }

  changeTab = (evt) => {
    const {currentTarget} = evt;
    const {activeTab} = this.props;
    let id = currentTarget.getAttribute('data-value');
    //- If they clicked the already active tab, set activeTab to '' which will hide the contents
    if (id === activeTab) { id = ''; }
    mapActions.changeActiveTab(id);
  };

  getClassName = (id) => {
    const {activeTab} = this.props;
    return `tab-buttons__tab pointer relative ${activeTab === id ? 'active' : ''}`;
  };

  render () {
    const {settings, language} = this.context;
    let {tableOfContentsVisible} = this.props;

    return (
      <nav className={`tab-buttons map-component ${tableOfContentsVisible ? '' : 'hidden'}`}>
        <ul className='tab-buttons__header'>
          <li className={this.getClassName(NARRATIVE)} data-value={NARRATIVE} onClick={this.changeTab}>
            <svg className='svg-icon tab-icon-narrative' dangerouslySetInnerHTML={{ __html: narrativeSvg }}/>
            <span className='tab-tooltip'>{text[language].NARRATIVE}</span>
            <span className='tab-buttons__tab-label mobile-show'>
              {text[language].NARRATIVE}
            </span>
          </li>
          <li className={this.getClassName(LAYERS)} data-value={LAYERS} onClick={this.changeTab}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: layersSvg }}/>
            <span className='tab-tooltip'>{text[language].LAYERS}</span>
            <span className='tab-buttons__tab-label mobile-show'>
              {text[language].LAYERS}
            </span>
          </li>
          <li className={this.getClassName(INFO_WINDOW)} data-value={INFO_WINDOW} onClick={this.changeTab}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: dataSvg }}/>
            <span className='tab-tooltip'>{text[language].DATA}</span>
            <span className='tab-buttons__tab-label mobile-show'>
              {text[language].DATA}
            </span>
          </li>
          <li className={this.getClassName(ANALYSIS)} data-value={ANALYSIS} onClick={this.changeTab}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: analysisSvg }}/>
            <span className='tab-tooltip'>{text[language].ANALYZE}</span>
            <span className='tab-buttons__tab-label mobile-show'>
              {text[language].ANALYZE}
            </span>
          </li>
          {!settings.includeDocumentsTab ? null :
            <li className={this.getClassName(DOCUMENTS)} data-value={DOCUMENTS} onClick={this.changeTab}>
              <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: documentsSvg }}/>
              <span className='tab-tooltip'>{text[language].DOCUMENTS}</span>
              <span className='tab-buttons__tab-label mobile-show'>
                {text[language].DOCS}
              </span>
            </li>
          }
          <li className={`${this.getClassName(MORE)} mobile-show`} data-value={MORE} onClick={this.changeTab}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: menuSvg }}/>
            <span className='tab-buttons__tab-label mobile-show'>
              {text[language].MORE}
            </span>
          </li>
        </ul>
      </nav>
    );
  }

}

TabButtons.propTypes = {
  activeTab: React.PropTypes.string.isRequired
};
