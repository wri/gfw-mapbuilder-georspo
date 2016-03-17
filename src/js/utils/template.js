import arcgisUtils from 'esri/arcgis/utils';
import {getUrlParams} from 'utils/params';
import Deferred from 'dojo/Deferred';
import lang from 'dojo/_base/lang';
import resources from 'resources';
import {urls} from 'js/config';

const SEPARATOR = ';';

/**
* Takes a string and parse it into an array based on separator, e.g hey;you; => ['hey', 'you', '']
* This will remove any blanks from the array as well, e.g. ['hey', 'you', ''] => ['hey', 'you']
*/
const parseIntoArray = (resourceString) => {
  return resourceString.split(SEPARATOR).filter((value) => {
    return value !== undefined && value !== '';
  });
};

export default {

  /**
  * Fetch application information from arcgis online and merge it in to our local resources
  * @param {string=} id - optional app id, if you dont provide it, it will attempt to get it from url
  * @return {promise} promise
  */
  getAppInfo: (id) => {
    let promise = new Deferred();
    const appid = id ? id : getUrlParams(location.href).appid;

    if (!appid) {
      promise.resolve(resources);
      return promise;
    }

    arcgisUtils.getItem(appid).then(res => {

      let agolValues = res.itemData && res.itemData.values;

      //- If we dont have agol settings, save the defaults, else merge them in
      if (!agolValues) {
        promise.resolve(resources);
      } else {
        //- This will merge all the settings in, but some things need a little massaging
        lang.mixin(resources, agolValues);

        //- Put the appid in settings so its easy to get to elsewhere in the app without rereading the url
        resources.appid = appid;

        //- LANGUAGE SETTINGS START
        resources.labels = {};
        resources.labels[resources.language] = {
          title: resources.title,
          subtitle: resources.subtitle
          // flagTitle: resources.flagTitle
        };
        //- parse map themes for default laguage if present
        let names = resources.mapThemes ? parseIntoArray(resources.mapThemes) : [];
        let appids = resources.mapThemeIds ? parseIntoArray(resources.mapThemeIds) : [];
        if (names.length === appids.length && names.length > 0) {
          resources.labels[resources.language].themes = [];
          names.forEach((name, i) => {
            resources.labels[resources.language].themes.push({
              label: name.trim(),
              url: `${urls.liveSite}?appid=${appids[i].trim()}`
            });
          });
        }
        //- Add content for second language if configured
        if (resources.useAlternativeLanguage) {
          resources.labels[resources.alternativeLanguage] = {
            title: resources.alternativeLanguageTitle,
            subtitle: resources.alternativeLanguageSubtitle
            // flagTitle: resources.secondLanguageFlagTitle
          };
          //- parse map themes for second laguage if present
          let secondNames = resources.alternativeMapThemes ? parseIntoArray(resources.alternativeMapThemes) : [];
          if (secondNames.length === appids.length && names.length > 0) {
            resources.labels[resources.alternativeLanguage].themes = [];
            secondNames.forEach((name, i) => {
              resources.labels[resources.alternativeLanguage].themes.push({
                label: name.trim(),
                url: `${urls.liveSite}?appid=${appids[i].trim()}`
              });
            });
          }
        }
        //- LANGUAGE SETTINGS END

        //- TODO: Remove Layers from resources.layers if configured

        promise.resolve(resources);
      }

    }, err => {
      if (brApp.debug) { console.warn(`template.getAppInfo >> ${err.message}`); }
      promise.resolve();
    });

    return promise;
  }

};
