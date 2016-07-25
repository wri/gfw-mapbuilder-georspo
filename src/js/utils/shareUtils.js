export function prepareStateForShare (options) {
  const {map, settings, language} = options;
  const shareState = {};
  //- Application info
  if (settings.appid) { shareState.appid = settings.appid; }
  shareState.lang = language;
  //- Map Related Info
  const center = map.extent.getCenter();
  shareState.x = center.getLongitude().toFixed(2);
  shareState.y = center.getLatitude().toFixed(2);
  shareState.z = map.getLevel();
  shareState.l = language;
  return shareState;
}
