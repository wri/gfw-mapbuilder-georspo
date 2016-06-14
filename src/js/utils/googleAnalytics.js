let trackerCreated = false;
/**
* Initialize the tracker with a tracking code
* @param {string} trackingCode - ex. UA-XXXXXXX-X
*/
export function createTracker (trackingCode) {
  if (ga) {
    ga('create', trackingCode, 'auto');
    ga('send', 'pageview');
    trackerCreated = true;
  }
}

/**
* Simple wrapper around the analytics api
* @param {string} category - Category, something like Map, Report, HomePage, etc.
* @param {string} action - Action, something like Click, Toggle, Analysis, Upload, Draw
* @param {string} label - Label, something like Layer: ${layerName}
* @param {number=} value - Optional numeric value tied to the event
*/
export function analytics (category, action, label, value) {
  if (!trackerCreated) { return; }
  const payload = { hitType: 'event' };
  payload.eventCategory = category;
  payload.eventAction = action;
  payload.eventLabel = label;
  if (value) { payload.eventValue = value; }

  if (ga) {
    ga('send', payload);
  }
}
