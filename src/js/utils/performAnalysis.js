import analysisKeys from 'constants/AnalysisConstants';
import analysisUtils from 'utils/analysisUtils';
import {analysisConfig} from 'js/config';
import Deferred from 'dojo/Deferred';
import all from 'dojo/promise/all';

/**
* @param {string} analysisType - Value from Analysis Select, also key to options in config
* @param {Polygon} geometry - Esri Polygon
* @param {number} canopyDensity - Tree Cover Canopy density setting
* @param {object} settings - Application settings from resources.js
* @return {promise}
*/
export default function performAnalysis (analysisType, geometry, canopyDensity, settings) {
  const restorationUrl = settings && settings.restorationImageServer;
  const config = analysisConfig[analysisType];
  let promise = new Deferred();

  switch (analysisType) {
    case analysisKeys.FIRES:
      analysisUtils.getFireCount(config.url, geometry).then(promise.resolve);
    break;
    case analysisKeys.LCC:
      analysisUtils.getMosaic(config.lockRaster, geometry).then(promise.resolve);
    break;
    case analysisKeys.TC_LOSS:
      analysisUtils.getCountsWithDensity(config.id, geometry, canopyDensity).then(promise.resolve);
    break;
    case analysisKeys.SLOPE:
      analysisUtils.getSlope(restorationUrl, 1, config.id, config.restoration, geometry).then(promise.resolve);
    break;
    case analysisKeys.TC_LOSS_GAIN:
      all([
        analysisUtils.getCountsWithDensity(config.lossRaster, geometry, canopyDensity),
        analysisUtils.getCountsWithDensity(config.gainRaster, geometry, canopyDensity)
      ]).then((response) => {
        promise.resolve({
          lossCounts: response[0].counts,
          gainCounts: response[1].counts
        });
      });
    break;
    case analysisKeys.LC_LOSS:
    case analysisKeys.BIO_LOSS:
      analysisUtils.getCrossedWithLoss(config, analysisConfig[analysisKeys.TC_LOSS], geometry, {
        canopyDensity: canopyDensity
      }).then(promise.resolve);
    break;
    case analysisKeys.INTACT_LOSS:
      analysisUtils.getCrossedWithLoss(config, analysisConfig[analysisKeys.TC_LOSS], geometry, {
        canopyDensity: canopyDensity,
        simple: true
      }).then(promise.resolve);
    break;
    default:
      //- This should only be the restoration analysis, since analysisType is a rasterId
      analysisUtils.getRestoration(restorationUrl, analysisType, geometry).then(promise.resolve);
    break;
  }

  return promise;
}
