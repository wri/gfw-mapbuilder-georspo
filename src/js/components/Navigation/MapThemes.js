import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

export default class MapThemes extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  renderThemeList = (lang) => {
    return (theme, index) => {
      const {target} = this.props;
      return (
        <li key={index} className='app-header__theme'>
          <a target={target} href={`${theme.url}&l=${lang}`}>{theme.label}</a>
        </li>
      );
    };
  };

  render () {
    const {language} = this.context;
    const {themes} = this.props;

    return (
      <li className='app-header__nav-link app-header__nav-link--map-themes pointer'>
        <svg className='svg-icon__nav'>
          <use xlinkHref="#icon-h-themes" />
        </svg>
        {text[language].NAV_MAP_THEMES}
        <ul className='app-header__theme-list shadow'>
          {themes.map(this.renderThemeList(language))}
        </ul>
      </li>
    );
  }

}

MapThemes.propTypes = {
  themes: PropTypes.array.isRequired,
  target: PropTypes.string.isRequired
};
