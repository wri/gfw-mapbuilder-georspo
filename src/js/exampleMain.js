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

console.log('in exampleMain!!');
const exampleMain = {

  startup: (url) => {
    console.log(url);
    console.log(this);

    // TODO: load critical in our startup!

    if (!_babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

    window.brApp = {
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

  },

  configureApp: () => {
    corsServers.forEach((server) => { esriConfig.defaults.io.corsEnabledServers.push(server); });
  },

  /**
  * Assets need to be loaded from base (if it is present) + url, or just url if _app.base is not set
  * When deploying to specific versions, this must be used for all relative paths
  */
  lazyloadAssets: () => {
    // console.log(window._app.base);
    loadCSS('css/critical.css');
    loadCSS('css/google-fira.css');
    loadCSS('css/app.css');
    loadCSS('https://js.arcgis.com/3.17/dijit/themes/tundra/tundra.css');
    loadCSS('https://js.arcgis.com/3.17/esri/css/esri.css');
    // loadCSS(`${window._app.base ? window._app.base + '/' : ''}css/critical.css`);
    // loadCSS(`${window._app.base ? window._app.base + '/' : ''}css/google-fira.css`);
    // loadCSS(`${window._app.base ? window._app.base + '/' : ''}css/app.css`);
    // loadCSS(`https://js.arcgis.com/${window._app.esri}/dijit/themes/tundra/tundra.css`);
    // loadCSS(`https://js.arcgis.com/${window._app.esri}/esri/css/esri.css`);

    // const base = window._app.base ? window._app.base + '/' : '';

    loadJS(assetUrls.highcharts).then(() => {
      //- Set default Options for Highcharts
      Highcharts.setOptions({
        chart: { style: { fontFamily: '"Fira Sans", Georgia, sans-serif' }},
        lang: { thousandsSep: ',' }
      });
    });
    loadJS(assetUrls.highchartsMore);
    loadJS(assetUrls.highchartsExports).then(() => {
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

export {exampleMain as default};

// export default {
//   startup: exampleMain.startup,
//   configureApp: exampleMain.startup,
//   lazyloadAssets: exampleMain.lazyloadAssets,
//   initializeApp: exampleMain.initializeApp
// };
