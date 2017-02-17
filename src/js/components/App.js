import {createTracker} from 'utils/googleAnalytics';
import lang from 'dojo/_base/lang';
import appActions from 'actions/AppActions';
import Header from 'components/Header';
import AppStore from 'stores/AppStore';
import template from 'utils/template';
import Map from 'components/Map';
import React, {
  Component,
  PropTypes
} from 'react';

export default class App extends Component {

  static childContextTypes = {
    language: PropTypes.string,
    settings: PropTypes.object
  };

  getChildContext = () => {
    return {
      language: this.state.language,
      settings: this.state.settings
    };
  };

  constructor (props) {
    super(props);
    this.state = AppStore.getState();
  }

  componentDidMount() {
    AppStore.listen(this.storeDidUpdate);
    template.getAppInfo().then(settings => {
      if (this.props.constructorParams.config) {
        console.log('props', this.props.constructorParams);
        lang.mixin(settings, this.props.constructorParams.config);
      }
      console.log('settings', settings);

      appActions.applySettings(settings);
      this.updateTitle(settings);
      if (settings.analyticsCode) {
        createTracker(settings.analyticsCode);
      }
    });
  }

  storeDidUpdate = () => {
    this.setState(AppStore.getState());
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.language !== prevState.language) {
      this.updateTitle(this.state.settings);
    }
  }

  updateTitle = (settings) => {
    const {language} = this.state;
    const labels = settings.labels[language];
    if (labels && labels.title) {
      document.title = labels.title;
    }
  };

  render () {
    return (
      <div className='root'>
        <Header />
        <Map {...this.state} />
      </div>
    );
  }

}
