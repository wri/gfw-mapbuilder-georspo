import dispatcher from 'js/dispatcher';

class AppActions {

  setLanguage = (language) => language;
  applySettings = (settings) => settings;

}

export default dispatcher.createActions(AppActions);
