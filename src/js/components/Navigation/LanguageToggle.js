import appActions from 'actions/AppActions';
import keys from 'constants/StringKeys';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

const languageSvg = '<use xlink:href="#icon-h-language" />';

const getLanguageLabel = (isocode) => {
  switch (isocode) {
    case 'en':
      return 'English';
    case 'fr':
      return 'Français';
    case 'es':
      return 'Spanish';
    case 'pr':
      return 'Portugese';
  }
};

export default class LanguageToggle extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  createListButton = (currentLanguage, language) => {
    return (
      <li
        key={language}
        className={`app-header__language pointer ${currentLanguage === language ? 'active' : ''}`}
        onClick={this.toggleLanguage}
        data-lang={language}>
        {getLanguageLabel(language)}
      </li>
    );
  };

  toggleLanguage = (evt) => {
    const {target} = evt;
    const lang = target.getAttribute('data-lang');
    if (lang) {
      appActions.setLanguage(lang);
    }
  };

  render () {
    const {
      language,
      settings
    } = this.context;

    let languageButtons = [];
    for (let lang in settings.labels) {
      languageButtons.push(this.createListButton(language, lang));
    }

    return (
      <li className='app-header__nav-link app-header__nav-link--language pointer'>
        <svg className='svg-icon__nav' dangerouslySetInnerHTML={{ __html: languageSvg }}/>
        {text[language][keys.NAV_LANGUAGE]}
        <ul className='app-header__language-list shadow pointer'>
          {languageButtons}
        </ul>
      </li>
    );
  }

}
