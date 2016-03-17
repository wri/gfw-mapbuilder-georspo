import WebTiled from 'esri/layers/WebTiledLayer';
import resources from 'resources';

// Where in the map to insert the landsat layer.
// 1 puts it on top of the basemap but below other layers.
let landsatMapIndex = 1;

let LandsatHelper = {
  toggle (map, lang) {
    let info = resources.basemaps[lang][0];
    let layer = map.getLayer(info.title);
    if (layer) {
      if (layer.visible) {
        layer.hide();
      } else {
        layer.show();
      }
    } else {
      layer = new WebTiled(info.templateUrl, { id: info.title });
      map.addLayer(layer, landsatMapIndex);
    }
    return layer && layer.visible;
  },

  changeYear (map, lang, year) {
    let info = resources.basemaps[lang][0];
    let layer = map.getLayer(info.title);
    let template = info.templateUrl.replace(/year\=\d{4}/, 'year=' + year);
    if (layer) {
      map.removeLayer(layer);
    }
    layer = new WebTiled(template, { id: info.title });
    map.addLayer(layer, landsatMapIndex);
    return layer;
  }
}

export default LandsatHelper
