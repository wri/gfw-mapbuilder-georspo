import layerKeys from 'constants/LayerConstants';
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
    const promise = new Deferred();
    const appid = id ? id : getUrlParams(location.href).appid;

    if (!appid) {
      promise.resolve(resources);
      return promise;
    }

    arcgisUtils.getItem(appid).then(res => {

      const agolValues = res.itemData && res.itemData.values;

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
          subtitle: resources.subtitle,
          narrative: resources.narrative,
          webmapMenuName: resources.webmapMenuName
        };
        //- parse map themes for default laguage if present
        const names = resources.mapThemes ? parseIntoArray(resources.mapThemes) : [];
        const appids = resources.mapThemeIds ? parseIntoArray(resources.mapThemeIds) : [];
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
            subtitle: resources.alternativeLanguageSubtitle,
            narrative: resources.alternativeNarrative || resources.narrative,
            webmapMenuName: resources.alternativeWebmapMenuName || resources.webmapMenuName
          };
          //- parse map themes for second laguage if present
          const secondNames = resources.alternativeMapThemes ? parseIntoArray(resources.alternativeMapThemes) : [];
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

        //- Restoration Module Configurations
        if (resources.restorationModule) {
          //- Parse the restoration module options if they are in AGOL
          if (resources.restorationOptions) {
            const optionLabels = parseIntoArray(resources.restorationOptions);
            const rasterIds = parseIntoArray(resources.restorationOptionsRasterIds);
            //- Make it in a format easier to consume in our components
            resources.restorationModuleOptions = [];
            optionLabels.forEach((label, index) => {
              resources.restorationModuleOptions.push({
                id: `$${rasterIds[index]}`,
                label: label
              });
            });
          }
          //- Parse slope class names if present
          if (resources.slopeClassNames) {
            resources.slopeClasses = parseIntoArray(resources.slopeClassNames);
            resources.slopeColors = parseIntoArray(resources.slopeClassColors);
          }
          //- Parse tree cover class names if present
          if (resources.treeCoverClassNames) {
            resources.treeCoverClasses = parseIntoArray(resources.treeCoverClassNames);
            resources.treeCoverColors = parseIntoArray(resources.treeCoverClassColors);
          }
        }

        //- TODO: Remove Layers from resources.layers if configured
        Object.keys(resources.layers).forEach((language) => {
          resources.layers[language] = resources.layers[language].filter((layer) => {
            switch (layer.id) {
              case layerKeys.ACTIVE_FIRES:
                return resources.activeFires;
              case layerKeys.LAND_COVER:
                return resources.landCover;
              case layerKeys.AG_BIOMASS:
                return resources.aboveGroundBiomass;
              case layerKeys.IFL:
                return resources.intactForests;
              default:
                return true;
            }
          });
        });

        console.log(resources);

        promise.resolve(resources);
      }

    }, err => {
      if (brApp.debug) { console.warn(`template.getAppInfo >> ${err.message}`); }
      promise.resolve();
    });

    return promise;
  }

};
