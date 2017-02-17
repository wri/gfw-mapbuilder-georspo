import appActions from 'actions/AppActions';
import dispatcher from 'js/dispatcher';

class AppStore {

  constructor () {

    this.language = 'en';
    this.settings = {};
    this.activeWebmap = undefined;

    this.bindListeners({
      setLanguage: appActions.setLanguage,
      applySettings: appActions.applySettings
    });

  }

  setLanguage (language) {
    this.language = language;
    // If were using the default language, use the default webmap, else use the alternativeWebmap
    if (this.settings.alternativeWebmap) {
      this.activeWebmap = language === this.settings.language ? this.settings.webmap : this.settings.alternativeWebmap;
    }
  }

  applySettings (settings) {
    console.log('applyinggg:', settings);
    this.settings = settings;
    this.language = settings.language;
    this.activeWebmap = settings.webmap;
  }

}

export default dispatcher.createStore(AppStore, 'AppStore');
