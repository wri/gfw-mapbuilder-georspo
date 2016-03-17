import MobileNavigation from 'components/Navigation/MobileNavigation';
import React, { Component, PropTypes} from 'react';

export default class MobileMenu extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  render () {
    const {
      language,
      settings
    } = this.context;

    let {labels} = settings,
        title, subtitle;

    if (labels) {
      let text = labels[language];
      title = text.title;
      subtitle = text.subtitle;
    } else {
      title = '';
      subtitle = '';
    }


    return (
      <div className='mobile-menu'>
        <div className='mobile-menu__logo-container'>
          <a href={settings.logoLinkUrl} target='_blank'>
            <img className='mobile-menu__logo' src={settings.logoUrl} />
          </a>
        </div>
        <div className='mobile-menu__title-container'>
          <div className='mobile-menu__title'>{title}</div>
          <div className='mobile-menu__subtitle'>{subtitle}</div>
        </div>
        <MobileNavigation />
      </div>
    );
  }
}
