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
      appActions.applySettings(settings);
    });
  }

  storeDidUpdate = () => {
    this.setState(AppStore.getState());
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
