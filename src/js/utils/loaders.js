import Deferred from 'dojo/Deferred';
//- the Deferred is needed as it is easier to tell if it is resolved
//- I can probably get rid of these when I figure out the best way to
//- tell if ES6 Promises are resolved cross browser

const loaders = {

  loadCSS: url => {
    let sheet = document.createElement('link');
    sheet.rel = 'stylesheet';
    sheet.type = 'text/css';
    sheet.href = url;
    requestAnimationFrame(function () { document.getElementsByTagName('head')[0].appendChild(sheet); });
  },

  loadJS: (url, async) => {
    var promise = new Deferred();
    let script = document.createElement('script');
    script.src = url;
    script.async = async || false;
    script.onload = promise.resolve;
    script.onerror = promise.reject;
    requestAnimationFrame(function () { document.getElementsByTagName('head')[0].appendChild(script); });
    return promise;
  }

  // loadJS: (url, async) => {
  //   let promise = new Promise((resolve, reject) => {
      // let script = document.createElement('script');
      // script.src = url;
      // script.async = async || false;
      // script.onload = resolve;
      // script.onerror = reject;
      // requestAnimationFrame(function () { document.getElementsByTagName('head')[0].appendChild(script); });
  //   });
  //   return promise;
  // }

};

export const loadCSS = loaders.loadCSS;
export const loadJS = loaders.loadJS;
