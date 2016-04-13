import layerKeys from 'constants/LayerConstants';

export default {

  //- NOTE: New Forest Atlas 2.0 Options, These are the raw values coming from ArcGIS Online from
  //- Application Id: ...

  //- General Settings
  webmap: 'e148ac47cd374d9da4d208aacfe690cf',
  title: 'Forest Atlas',
  subtitle: 'Application subtitle',
  logoUrl: './css/images/gfw-fires-logo.png',
  // logoUrl: 'http://cmr.forest-atlas.org/map/app/images/CMR_flag_new.png',
  logoLinkUrl: 'http://www.minfof.cm/',
  aboutLinkUrl: 'http://www.wri.org/our-work/project/',
  downloadLinkUrl: 'http://data.globalforestwatch.org/',
  printServiceUrl: 'http://gis-forest-atlas.wri.org/arcgis/rest/services/CMR/CMRExportWebMap/GPServer/Export%20Web%20Map',
  maskServiceUrl: 'http://gis-forest-atlas.wri.org/arcgis/rest/services/CMR/CMR_00_Africa/MapServer',
  mapThemeIds: '1c38ba1095fe49e3ba234bf9105c1077;c76d788b7487476bae4d09a4e933be19',
  mapThemes: 'Forest Atlas of Cameroon;Forest Atlas of Equatorial Guinea',
  narrative: 'Explore the Forest Atlas of Cameroon to discover ...',
  //- Language Settings
  language: 'en',
  useAlternativeLanguage: 'true',
  alternativeLanguage: 'fr',
  alternativeLanguageTitle: 'Forest Atlas',
  alternativeLanguageSubtitle: 'Application subtitle',
  alternativeMapThemes: 'Forest Atlas of Cameroon;Forest Atlas of Equatorial Guinea',
  alternativeNarrative: 'Explore the Forest Atlas of Cameroon to discover ...',
  alternativeWebmapMenuName: 'Land Use',
  //- Documents Settings
  includeDocumentsTab: false,
  documentsDirectory: 'https://wri-public-data.s3.amazonaws.com/forest_atlas/cmr/doc_pdf/',
  documentsMapserver: 'http://54.88.79.102/arcgis/rest/services/CMR/documents_administratifs/MapServer',
  //- Layers/Analysis Settings
  iso: '',
  activeFires: true,
  intactForests: true,
  aboveGroundBiomass: true,
  landCover: true,
  webmapMenuName: 'Land Use',
  //- Restoration Module settings
  restorationModule: false,
  restorationImageServer: 'http://gis-gfw.wri.org/arcgis/rest/services/country_data/ETH_Restoration/ImageServer',
  slopePotentialOptions: 'Potential for commercial plantation on bare soil and shrubland only;Potential for agri-silviculture and agro-silvo-pastoralism, and woodlot;Potential for establishing natural forest only;Potential for restocking degraded natural forest only;Potential for woodlot only;Potential for silvo-pastoralism only;Potential for tree-buffer zone along rivers, lakes and reservoirs only;Potential for commercial plantation as buffer zone around (NF)PAs;Two restoration options identified as having potential;Three or more restoration options identified as having potential',
  slopePotentialColors: '#EAC7FD;#FDB22E;#587E0F;#D29374;#F5D08B;#B1B124;#1AB090;#AF0F8F;#D9FEC7;#FFFE89',
  restorationOptions: 'establishing natural forest outside of cropland;restocking of degraded natural forest;agri-silviculture and agro-silvo-pastoralism;silvo-pastoralism;woodlot;commercial plantation on bare soil and shrubland;commercial plantation as buffer zone to national forest priority areas and protected areas;tree-based buffer zone along rivers, lakes and reservoirs;',
  restorationOptionsRasterIds: '$9;$10;$6;$11;$13;$8;$7;$12;',
  slopeClassNames: 'No Data;<= 30%;30 - 60%;> 60%;',
  slopeClassColors: 'rgb(0, 0, 0);rgb(255, 235, 175);rgb(115, 115, 0);rgb(168, 0, 0);',
  treeCoverClassNames: 'No Data;<= 10%;10 - 30%;> 30%;',
  treeCoverClassColors: 'rgb(0, 0, 0);rgb(180, 215, 158);rgb(245, 245, 122);rgb(205, 170, 102);',

  //- The following values are built from the above values, this makes them easier to use in the Application
  //- Based on slopePotentialOptions
  slopeAnalysisPotentialOptions: [
    'Potential for commercial plantation on bare soil and shrubland only',
    'Potential for agri-silviculture and agro-silvo-pastoralism, and woodlot',
    'Potential for establishing natural forest only',
    'Potential for restocking degraded natural forest only',
    'Potential for woodlot only',
    'Potential for silvo-pastoralism only',
    'Potential for tree-buffer zone along rivers, lakes and reservoirs only',
    'Potential for commercial plantation as buffer zone around (NF)PAs',
    'Two restoration options identified as having potential',
    'Three or more restoration options identified as having potential'
  ],
  //- Based on slopePotentialColors
  slopeAnalysisPotentialColors: ['#EAC7FD', '#FDB22E', '#587E0F', '#D29374', '#F5D08B', '#B1B124', '#1AB090', '#AF0F8F', '#D9FEC7', '#FFFE89'],
  //- Based on all the variations of restorationOptions
  restorationModuleOptions: [{
    id: '$9',
    label: 'establishing natural forest outside of cropland'
  }, {
    id: '$10',
    label: 'restocking of degraded natural forest'
  }, {
    id: '$6',
    label: 'agri-silviculture and agro-silvo-pastoralism'
  }, {
    id: '$11',
    label: 'silvo-pastoralism'
  }, {
    id: '$13',
    label: 'woodlot'
  }, {
    id: '$8',
    label: 'commercial plantation on bare soil and shrubland'
  }, {
    id: '$7',
    label: 'commercial plantation as buffer zone to national forest priority areas and protected areas'
  }, {
    id: '$12',
    label: 'tree-based buffer zone along rivers, lakes and reservoirs'
  }],
  //- Based on slopeClassNames and slopeClassColors
  slopeClasses: ['No Data', '<= 30%', '30 - 60%', '> 60%'],
  slopeColors: ['rgb(0, 0, 0)', 'rgb(255, 235, 175)', 'rgb(115, 115, 0)', 'rgb(168, 0, 0)'],
  //- Bsaed on treeCoverClassNames and treeCoverClassColors
  treeCoverClasses: ['No Data', '<= 10%', '10 - 30%', '> 30%'],
  treeCoverColors: ['rgb(0, 0, 0)', 'rgb(180, 215, 158)', 'rgb(245, 245, 122)', 'rgb(205, 170, 102)'],
  //- Built based on title, subtitle, language settings, and map themes
  labels: {
    'en': {
      'title': 'Forest Atlas of Cameroon',
      'subtitle': 'Ministry of Forestry and Wildlife',
      'webmapMenuName': 'Land Use',
      'narrative': 'Explore the Forest Atlas of Cameroon to discover ...',
      'themes': [{
        'label': 'Forest Atlas of Democratic Republic of Congo',
        'url': 'http://wri.github.io/forest_atlas_template/?appid=edfa3967f09f4236ae9249dd82265687'
      }, {
        'label': 'Forest Atlas of Equatorial Guinea',
        'url': 'http://wri.github.io/forest_atlas_template/?appid=c76d788b7487476bae4d09a4e933be19'
      }]
    },
    'fr': {
      'title': 'Atlas Forestier du Cameroon',
      'subtitle': 'Ministère des Forêts et de la Faune',
      'webmapMenuName': 'Land Use',
      'narrative': 'Explore the Forest Atlas of Cameroon to discover ...',
      'themes': [{
        'label': 'Testing Congo',
        'url': 'http://wri.github.io/forest_atlas_template/?appid=edfa3967f09f4236ae9249dd82265687'
      }, {
        'label': 'Testing Guinea',
        'url': 'http://wri.github.io/forest_atlas_template/?appid=c76d788b7487476bae4d09a4e933be19'
      }]
    }
  },

  /**
  * Layer Config Options, [brackets] = optional
  * if type is anything other than graphic and the layer is not disabled, it must have a url
  * id - {string} - layer Id, must be unique
  * type - {string} - layer type (dynamic, image, feature, tiled, webtiled)
  * [order] - {number} - determines layer order on map, 1 is the bottom and higher numbers on top
  * [label] - {string} - Label in the UI, should be an object with atleast the configured languages prefixed
  * [sublabel] - {string} - Label in the UI, should be an object with atleast the configured languages prefixed
  * [group] - {string} - group in the UI, No group means it won't show in the UI
  * [groupKey] - {string} - Key for the group, do not modify
  * [url] - {string} - Url for the map service, if present the app will attempt to add to the map via the LayerFactory,
  * [disabled] - {boolean} - grey the checkbox out in the UI and prevent user from using it
  * - can also be updated dynamically if a layer fails to be added to the map to block the user from interacting with a down service
  * [miscellaneous layer params], layerIds, opacity, colormap, inputRange, outputRange
  * - Add any extra layer params as needed, check LayerFactory to see which ones are supported and feel free to add more if necessary
  * - type should be what the layer contructor expects, these are directly passed to Esri JavaScript layer constructors
  */
  layers: {
    en: [{
      id: 'TREE_COVER_LOSS',
      order: 3,
      type: 'image',
      visible: false,
      group: 'Land Cover Dynamics',
      groupKey: layerKeys.GROUP_LCD,
      label: 'Tree cover loss',
      sublabel: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      url: 'http://gis-treecover.wri.org/arcgis/rest/services/ForestCover_lossyear_density/ImageServer',
      colormap: [[1, 219, 101, 152]],
      inputRange: [1, 15],
      outputRange: [1]
    },
    {
      id: 'TREE_COVER_GAIN',
      order: 4,
      type: 'tiled',
      visible: false,
      group: 'Land Cover Dynamics',
      groupKey: layerKeys.GROUP_LCD,
      label: 'Tree cover gain',
      sublabel: '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      url: 'http://gis-treecover.wri.org/arcgis/rest/services/ForestGain_2000_2012_map/MapServer'
    },
    {
      id: 'ACTIVE_FIRES',
      order: 5,
      type: 'dynamic',
      group: 'Land Cover Dynamics',
      groupKey: layerKeys.GROUP_LCD,
      label: 'Active fires',
      sublabel: '(daily, 1km, global, NASA)',
      url: 'http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer',
      layerIds: [0, 1, 2, 3]
    },
    {
      id: 'TREE_COVER',
      order: 1,
      type: 'image',
      group: 'Land Cover',
      groupKey: layerKeys.GROUP_LC,
      label: 'Tree cover density',
      sublabel: '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
      url: 'http://gis-treecover.wri.org/arcgis/rest/services/TreeCover2000/ImageServer',
      colormap: [[1, 0, 179, 0]], // colormap: [[1, 174, 203, 107]],
      inputRange: [30, 101],
      outputRange: [1],
      visible: false,
      opacity: 0.8
    },
    {
      id: 'LAND_COVER',
      order: 2,
      type: 'dynamic',
      group: 'Land Cover',
      groupKey: layerKeys.GROUP_LC,
      label: 'Land cover',
      url: 'http://gis-gfw.wri.org/arcgis/rest/services/forest_cover/MapServer',
      layerIds: [10]
    }, {
      id: 'MASK',
      order: 100,
      type: 'dynamic',
      url: 'http://gis.forest-atlas.org/arcgis/rest/services/country_masks/country_mask_global/MapServer',
      opacity: 0.35,
      layerIds: [0]
    }],
    fr: [{
      id: 'TREE_COVER_LOSS',
      order: 3,
      type: 'image',
      visible: false,
      group: 'Land Cover Dynamics',
      groupKey: layerKeys.GROUP_LCD,
      label: 'Tree cover loss',
      sublabel: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      url: 'http://gis-treecover.wri.org/arcgis/rest/services/ForestCover_lossyear_density/ImageServer',
      colormap: [[1, 219, 101, 152]],
      inputRange: [1, 15],
      outputRange: [1]
    },
    {
      id: 'TREE_COVER_GAIN',
      order: 4,
      type: 'tiled',
      visible: false,
      group: 'Land Cover Dynamics',
      groupKey: layerKeys.GROUP_LCD,
      label: 'Tree cover gain',
      sublabel: '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      url: 'http://gis-treecover.wri.org/arcgis/rest/services/ForestGain_2000_2012_map/MapServer'
    },
    {
      id: 'ACTIVE_FIRES',
      order: 5,
      type: 'dynamic',
      group: 'Land Cover Dynamics',
      groupKey: layerKeys.GROUP_LCD,
      label: 'Active fires',
      sublabel: '(daily, 1km, global, NASA)',
      url: 'http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer',
      layerIds: [0, 1, 2, 3]
    },
    {
      id: 'TREE_COVER',
      order: 1,
      type: 'image',
      group: 'Land Cover',
      groupKey: layerKeys.GROUP_LC,
      label: 'Tree cover density',
      sublabel: '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
      url: 'http://gis-treecover.wri.org/arcgis/rest/services/TreeCover2000/ImageServer',
      colormap: [[1, 0, 179, 0]],
      inputRange: [30, 101],
      outputRange: [1],
      visible: false,
      opacity: 0.8
    },
    {
      id: 'LAND_COVER',
      order: 2,
      type: 'dynamic',
      group: 'Land Cover',
      groupKey: layerKeys.GROUP_LC,
      label: 'Land cover',
      layerIds: [0]
    }, {
      id: 'MASK',
      order: 100,
      type: 'dynamic',
      url: 'http://gis.forest-atlas.org/arcgis/rest/services/country_masks/country_mask_global/MapServer',
      opacity: 0.35,
      layerIds: [0]
    }],
    es: [{
      id: 'TREE_COVER_LOSS',
      order: 3,
      type: 'image',
      visible: false,
      group: 'Land Cover Dynamics',
      groupKey: layerKeys.GROUP_LCD,
      label: 'Tree cover loss',
      sublabel: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      url: 'http://gis-treecover.wri.org/arcgis/rest/services/ForestCover_lossyear_density/ImageServer',
      colormap: [[1, 219, 101, 152]],
      inputRange: [1, 15],
      outputRange: [1]
    },
    {
      id: 'TREE_COVER_GAIN',
      order: 4,
      type: 'tiled',
      visible: false,
      group: 'Land Cover Dynamics',
      groupKey: layerKeys.GROUP_LCD,
      label: 'Tree cover gain',
      sublabel: '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      url: 'http://gis-treecover.wri.org/arcgis/rest/services/ForestGain_2000_2012_map/MapServer'
    },
    {
      id: 'ACTIVE_FIRES',
      order: 5,
      type: 'dynamic',
      group: 'Land Cover Dynamics',
      groupKey: layerKeys.GROUP_LCD,
      label: 'Active fires',
      sublabel: '(daily, 1km, global, NASA)',
      url: 'http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer',
      layerIds: [0, 1, 2, 3]
    },
    {
      id: 'TREE_COVER',
      order: 1,
      type: 'image',
      group: 'Land Cover',
      groupKey: layerKeys.GROUP_LC,
      label: 'Tree cover density',
      sublabel: '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
      url: 'http://gis-treecover.wri.org/arcgis/rest/services/TreeCover2000/ImageServer',
      colormap: [[1, 0, 179, 0]],
      inputRange: [30, 101],
      outputRange: [1],
      visible: false,
      opacity: 0.8
    },
    {
      id: 'LAND_COVER',
      order: 2,
      type: 'dynamic',
      group: 'Land Cover',
      groupKey: layerKeys.GROUP_LC,
      label: 'Land cover',
      layerIds: [0]
    }, {
      id: 'MASK',
      order: 100,
      type: 'dynamic',
      url: 'http://gis.forest-atlas.org/arcgis/rest/services/country_masks/country_mask_global/MapServer',
      opacity: 0.35,
      layerIds: [0]
    }],
    pt: [{
      id: 'TREE_COVER_LOSS',
      order: 3,
      type: 'image',
      visible: false,
      group: 'Land Cover Dynamics',
      groupKey: layerKeys.GROUP_LCD,
      label: 'Tree cover loss',
      sublabel: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      url: 'http://gis-treecover.wri.org/arcgis/rest/services/ForestCover_lossyear_density/ImageServer',
      colormap: [[1, 219, 101, 152]],
      inputRange: [1, 15],
      outputRange: [1]
    },
    {
      id: 'TREE_COVER_GAIN',
      order: 4,
      type: 'tiled',
      visible: false,
      group: 'Land Cover Dynamics',
      groupKey: layerKeys.GROUP_LCD,
      label: 'Tree cover gain',
      sublabel: '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      url: 'http://gis-treecover.wri.org/arcgis/rest/services/ForestGain_2000_2012_map/MapServer'
    },
    {
      id: 'ACTIVE_FIRES',
      order: 5,
      type: 'dynamic',
      group: 'Land Cover Dynamics',
      groupKey: layerKeys.GROUP_LCD,
      label: 'Active fires',
      sublabel: '(daily, 1km, global, NASA)',
      url: 'http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer',
      layerIds: [0, 1, 2, 3]
    },
    {
      id: 'TREE_COVER',
      order: 1,
      type: 'image',
      group: 'Land Cover',
      groupKey: layerKeys.GROUP_LC,
      label: 'Tree cover density',
      sublabel: '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
      url: 'http://gis-treecover.wri.org/arcgis/rest/services/TreeCover2000/ImageServer',
      colormap: [[1, 0, 179, 0]],
      inputRange: [30, 101],
      outputRange: [1],
      visible: false,
      opacity: 0.8
    },
    {
      id: 'LAND_COVER',
      order: 2,
      type: 'dynamic',
      group: 'Land Cover',
      groupKey: layerKeys.GROUP_LC,
      label: 'Land cover',
      layerIds: [0]
    }, {
      id: 'MASK',
      order: 100,
      type: 'dynamic',
      url: 'http://gis.forest-atlas.org/arcgis/rest/services/country_masks/country_mask_global/MapServer',
      opacity: 0.35,
      layerIds: [0]
    }]
  },
  basemaps: {
    en: [{
      title: 'Landsat',
      thumbnailUrl: 'http://www.globalforestwatch.org/assets/basemaps-s84b6feb159-b5c7519937c9732128e8b42b5865e7c2.png',
      templateUrl: 'http://api.globalforestwatch.org//gee/landsat_composites/${level}/${col}/${row}.png?year=2014',
      years: [
        '1999',
        '2000',
        '2001',
        '2002',
        '2003',
        '2004',
        '2005',
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014'
      ]
    }],
    fr: [{
      title: 'Landsat',
      thumbnailUrl: 'http://www.globalforestwatch.org/assets/basemaps-s84b6feb159-b5c7519937c9732128e8b42b5865e7c2.png',
      templateUrl: 'http://api.globalforestwatch.org//gee/landsat_composites/${z}/${x}/${y}.png',
      years: [
        '1999',
        '2000',
        '2001',
        '2002',
        '2003',
        '2004',
        '2005',
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014'
      ]
    }],
    es: [{
      title: 'Landsat',
      thumbnailUrl: 'http://www.globalforestwatch.org/assets/basemaps-s84b6feb159-b5c7519937c9732128e8b42b5865e7c2.png',
      templateUrl: 'http://api.globalforestwatch.org//gee/landsat_composites/${z}/${x}/${y}.png',
      years: [
        '1999',
        '2000',
        '2001',
        '2002',
        '2003',
        '2004',
        '2005',
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014'
      ]
    }],
    pt: [{
      title: 'Landsat',
      thumbnailUrl: 'http://www.globalforestwatch.org/assets/basemaps-s84b6feb159-b5c7519937c9732128e8b42b5865e7c2.png',
      templateUrl: 'http://api.globalforestwatch.org//gee/landsat_composites/${z}/${x}/${y}.png',
      years: [
        '1999',
        '2000',
        '2001',
        '2002',
        '2003',
        '2004',
        '2005',
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014'
      ]
    }]
  }
};
