export function applyStateFromUrl (map, state) {
  const {x, y, z} = state;

  if (map.loaded && (x && y && z)) {
    map.centerAndZoom([x, y], z);
  }
}

export function prepareStateForShare (options) {
  const {map, settings, language} = options;
  let shareState = {};
  //- Application info
  if (settings.appid) { shareState.appid = settings.appid; }
  shareState.lang = language;
  //- Map Related Info
  const center = map.extent.getCenter();
  shareState.x = center.getLongitude().toFixed(2);
  shareState.y = center.getLatitude().toFixed(2);
  shareState.z = map.getLevel();
  return shareState;
}
