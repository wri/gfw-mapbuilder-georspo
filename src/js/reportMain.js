/* eslint no-unused-vars: 0 */
import IdentityManager from 'esri/IdentityManager';
import {corsServers, assetUrls} from 'js/config';
import {loadJS} from 'utils/loaders';
import esriConfig from 'esri/config';
import report from 'report/report';
import 'babel-polyfill';

if (!_babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

window.brApp = {
  debug: location.search.slice(1).search('debug=true') > -1
};

let configureApp = () => {
  corsServers.forEach((server) => { esriConfig.defaults.io.corsEnabledServers.push(server); });
};

let lazyloadAssets = () => {
  window.highchartsPromise = loadJS(assetUrls.highcharts);
  window.highchartsPromise.then(() => {
    Highcharts.setOptions({
      chart: { style: { fontFamily: '"Fira Sans", Georgia, sans-serif' }},
      lang: { thousandsSep: ',' }
    });
  });
  loadJS(assetUrls.highchartsMore);
};

let start = () => {
  report.run();
};

configureApp();
lazyloadAssets();
start();
