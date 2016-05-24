/**
* Cache for information about each layer, to be shown in the modal
* Types:
* _cache
* {[key: string]: MapServiceContent | GFWServiceContent}
* MapServiceContent
*
* GFWServiceContent
*
*/
const _cache = {};

export default {

  get (layerId) {
    return _cache[layerId];
  },

  fetchFromMetadataAPI (layer) {
    console.log(layer);
  },

  fetchFromMapService () {

  }

};
