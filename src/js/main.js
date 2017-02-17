/* eslint no-unused-vars: 0 */
import App from 'components/App';
import ShareModal from 'components/Modals/ShareModal';
import {corsServers, assetUrls} from 'js/config';
import {loadJS, loadCSS } from 'utils/loaders';
import generateCSV from 'utils/csvUtils';
import esriConfig from 'esri/config';
import ReactDOM from 'react-dom';
import React from 'react';
import 'babel-polyfill';

let name = 'lluuas';

const main = {

  startup: (url) => {
    console.log(url);
    console.log(this);
    console.log(name);

    name = 'aaa';
    if (!_babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

    window.brApp = {
      // debug: location.search.slice(1).search('debug') > -1
      debugEnabled: true,
      debug: function (message) {
        if (this.debugEnabled) {
          var print = typeof message === 'string' ? console.log : console.dir;
          print.apply(console, [message]);
        }
      }
    };

    // Shim for rAF with timeout for callback
    window.requestAnimationFrame = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) { window.setTimeout(callback, 1000 / 60); };
    })();

    // configureApp();
    // this.lazyloadAssets();
    // const portal = new arcgisPortal.Portal('http://ags104.blueraster.io/portal');
    // portal.signIn().then(loggedInUser => {
    //   console.log(loggedInUser);
    //   console.log(loggedInUser.portal.defaultBasemap);
    // this.initializeApp();
    // });

  },

  configureApp: () => {
    console.log(name);
    corsServers.forEach((server) => { esriConfig.defaults.io.corsEnabledServers.push(server); });
  },

  /**
  * Assets need to be loaded from base (if it is present) + url, or just url if _app.base is not set
  * When deploying to specific versions, this must be used for all relative paths
  */
  lazyloadAssets: () => {
    loadCSS(`${window._app.base ? window._app.base + '/' : ''}css/google-fira.css`);
    loadCSS(`${window._app.base ? window._app.base + '/' : ''}css/app.css`);
    // loadCSS(`${window._app.base ? window._app.base + '/' : ''}vendor/arcgis-api/dijit/themes/tundra/tundra.css`);
    // loadCSS(`${window._app.base ? window._app.base + '/' : ''}vendor/arcgis-api/esri/css/esri.css`);
    loadCSS(`https://js.arcgis.com/${window._app.esri}/dijit/themes/tundra/tundra.css`);
    loadCSS(`https://js.arcgis.com/${window._app.esri}/esri/css/esri.css`);

    const base = window._app.base ? window._app.base + '/' : '';

    loadJS(base + assetUrls.highcharts).then(() => {
      //- Set default Options for Highcharts
      Highcharts.setOptions({
        chart: { style: { fontFamily: '"Fira Sans", Georgia, sans-serif' }},
        lang: { thousandsSep: ',' }
      });
    });
    loadJS(base + assetUrls.highchartsMore);
    loadJS(base + assetUrls.highchartsExports).then(() => {
      //- Add CSV Exporting as an option
      Highcharts.getOptions().exporting.buttons.contextButton.menuItems.push({
        text: 'Download CSV',
        onclick: generateCSV
      });
    });
  },

  initializeApp: (constructorParams) => {
    //TODO: To get our config params: the 'el' prop replaces the root, and the 'config' props is passed into App as props!
    ReactDOM.render(<App constructorParams={constructorParams} />, document.getElementById(constructorParams.el));
    ReactDOM.render(<ShareModal />, document.getElementById('share-modal'));
  }

};

export {main as default};
