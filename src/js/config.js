import analysisKeys from 'constants/AnalysisConstants';

const analysisImageService = 'http://gis-gfw.wri.org/arcgis/rest/services/image_services/analysis/ImageServer';

const config = {
  map: {
    options: {
      navigationMode: 'css-transforms',
      force3DTransforms: true,
      showAttribution: false,
      // smartNavigation: false,
      fadeOnZoom: true,
      slider: false,
      logo: false
    }
  },

  corsServers: [
    'gis-gfw.wri.org',
    'gis-potico.wri.org'
  ],

  // Note these will need to be copied in with the bulid script since they are not part of the main bundle
  assets: {
    jQuery: 'vendor/jquery/dist/jquery.min.js',
    highcharts: '//code.highcharts.com/highcharts.js',
    highchartsMore: '//code.highcharts.com/highcharts-more.js',
    highchartsExports: '//code.highcharts.com/modules/exporting.js',
    ionCSS: 'vendor/ion.rangeslider/css/ion.rangeSlider.css',
    ionSkinCSS: 'vendor/ion.rangeslider/css/ion.rangeSlider.skinNice.css',
    rangeSlider: 'vendor/ion.rangeslider/js/ion.rangeSlider.min.js'
  },

  urls: {
    liveSite: 'http://wri.github.io/gfw-mapbuilder/',
    metadataApi: 'http://api.globalforestwatch.org/metadata'
  },

  upload: {
    portal: 'http://www.arcgis.com/sharing/rest/content/features/generate',
    shapefileParams: (name, spatialReference, extentWidth, mapWidth) => {
      return {
        'name': name,
        'generalize': true,
        'targetSr': spatialReference,
        'maxRecordCount': 1000,
        'reducePrecision': true,
        'numberOfDigitsAfterDecimal': 0,
        'enforceInputFileSizeLimit': true,
        'enforceOutputJsonSizeLimit': true,
        'maxAllowableOffset': extentWidth / mapWidth
      };
    },
    shapefileContent: (params, filetype) => {
      return {
        'publishParameters': params,
        'callback.html': 'textarea',
        'filetype': filetype,
        'f': 'json'
      };
    }
  },

  layerPanel: {
    landCoverDynamics: 'Land Cover Dynamics',
    landCover: 'Land Cover',
    waterStressLegend: {
      min: 'Low',
      max: 'High',
      arid: 'Arid',
      nodata: 'No Data'
    },
    sedimentLegend: {
      min: 'Low',
      max: 'Extreme'
    },
    firesOptions: [
      {label: 'Past Week', value: 7},
      {label: 'Past 72 hours', value: 3},
      {label: 'Past 48 hours', value: 2},
      {label: 'Past 24 hours', value: 1}
    ],
    lossOptions: [
      {label: '2001', value: 1},
      {label: '2002', value: 2},
      {label: '2003', value: 3},
      {label: '2004', value: 4},
      {label: '2005', value: 5},
      {label: '2006', value: 6},
      {label: '2007', value: 7},
      {label: '2008', value: 8},
      {label: '2009', value: 9},
      {label: '2010', value: 10},
      {label: '2011', value: 11},
      {label: '2012', value: 12},
      {label: '2013', value: 13},
      {label: '2014', value: 14}
    ]
  },
  errors: {
    missingLayerConfig: 'You provided a layer config containing a url but not a type, please specify the layer type in the layer config.',
    incorrectLayerConfig: type => `You provided an invalid type, the application is not configured for type: ${type}. Please use the correct type or implement it in the LayerFactory.`,
    geolocationUnavailable: 'Sorry, it looks like your browser does not support geolocation, please try the latest versions of Safari, Chrome, or Firefox.',
    geolocationFailure: message => `Error retrieving location at this time. ${message}`,
    featureNotFound: 'We could not find a feature available at this point. Please try again.'
  },
  modals: {
    noInfo: 'No Information Available',
    alerts: {
      title: 'Subscribe to GFW Alerts',
      descriptions: {
        email: 'Your email address',
        subscription: 'Name your subscription area',
        subscriptionTypes: 'Select your subscriptions'
      },
      messages: {
        formaSuccess: 'Thank you for subscribing to Forma Alerts.\nYou should receive a confirmation email soon.',
        formaFail: 'There was an error with your request to subscribe to Forma alerts.\rPlease try again later.',
        fireSuccess: 'Thank you for subscribing to Fires Alerts.\rYou should receive a confirmation email soon.',
        fireFail: 'There was an error with your request to subscribe to Fires alerts.\rPlease try again later.'
      }
    },
    canopy: {
      slider: [0, 10, 15, 20, 25, 30, 50, 75, 100]
    },
    share: {
      title: 'Share this view',
      linkInstructions: 'Copy and paste the link to share it or use the buttons below to share on social media.',
      copyFailure: 'Sorry, we were unable to copy this to your clipboard, please press Cmd + c on Mac or Ctrl + c on Windows/Linux.',
      copyButton: 'Copy',
      copiedButton: 'Copied',
      googleUrl: url => `https://plus.google.com/share?url=${url}`,
      twitterUrl: url => `https://twitter.com/share?url=${url}&via=gfw-water`,
      facebookUrl: url => `https://www.facebook.com/sharer.php?u=${url}`
    }
  },

  //- Analysis for individual layers are defined below so we can use common keys
  //- Generic/Modules config is here
  analysis: {
    imageService: analysisImageService,
    pixelSize: 100,
    tcd: {
      id: '$520',
      outputValues: [0, 1],
      inputRanges: (density) => [0, +density, +density, 101]
    },
    restoration: {
      treeCoverId: '$4',
      // treeCoverClasses: ['No Data', '<= 10%', '10 - 30%', '> 30%'],
      // treeCoverColors: ['rgb(0, 0, 0)', 'rgb(180, 215, 158)', 'rgb(245, 245, 122)', 'rgb(205, 170, 102)'],
      populationId: '$2',
      populationClasses: ['No Data', '<= 20', '20 - 50', '50 - 150', '150 - 500', '> 500'],
      populationColors: ['rgb(0, 0, 0)', 'rgb(255, 255, 128)', 'rgb(250, 209, 85)', 'rgb(242, 167, 46)', 'rgb(173, 83, 19)', 'rgb(107, 0, 0)'],
      slopeId: '$3',
      // slopeClasses: ['No Data', '<= 30%', '30 - 60%', '> 60%'],
      // slopeColors: ['rgb(0, 0, 0)', 'rgb(255, 235, 175)', 'rgb(115, 115, 0)', 'rgb(168, 0, 0)'],
      landCoverId: '$1',
      // landCoverClasses: [], // In the js/languages file
      landCoverColors: ['rgb(0, 0, 0)', 'rgb(0, 174, 0)', 'rgb(255, 255, 0)', 'rgb(255, 155, 190)', 'rgb(0, 238, 238)', 'rgb(255, 0, 0)', 'rgb(255, 255, 188)']
    }
  }
};

//- Configure Analysis here
config.analysis[analysisKeys.INTACT_LOSS] = {
  id: '$9',
  bounds: [0, 1],
  colors: ['#186513']
};

config.analysis[analysisKeys.BIO_LOSS] = {
  id: '$524',
  bounds: [0, 2],
  labels: ['1 - 19', '20 - 79', '>= 80'],
  colors: ['#fdffcc', '#f1bc8b', '#d56f4a'],
  remap: {
    'rasterFunction': 'Remap',
    'rasterFunctionArguments': {
      'InputRanges': [0, 20, 20, 80, 80, 1000],
      'OutputValues': [0, 1, 2],
      'Raster': '$524',
      'AllowUnmatched': false
    }
  }
};

// config.analysis[analysisKeys.LC_LOSS] = {
//   id: '$523',
//   bounds: [1, 20],
//   colors: ['#3B823D', '#7CA079', '#AAB785', '#355936', '#5BBCF8', '#8BB94B', '#F0F979', '#7B8840', '#CABA4F', '#D3A162', '#FDCA76', '#C1E5DC', '#7AD3AB', '#F3F3AF', '#F6988F', '#FFFFF0', '#FFFFF0', '#A7A7A7', '#F83D48', '#353C92']
// };

config.analysis[analysisKeys.SLOPE] = {
  id: '$3',
  restoration: '$5',
  slopeOptions: [
    { label: '<= 30%', value: 1 },
    { label: '30% - 60%', value: 2 },
    { label: '> 60%', value: 3 }
  ]
};

config.analysis[analysisKeys.TC_LOSS_GAIN] = {
  lossRaster: '$530',
  gainRaster: '$527'
};

config.analysis[analysisKeys.TC_LOSS] = {
  id: '$530',
  colors: ['#cf5188'],
  // TODO: Generate these dynamically
  bounds: [1, 14],
  labels: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014]
};

// config.analysis[analysisKeys.LCC] = {
//   lockRaster: 523,
//   colors: ['#3B823D', '#7CA079', '#AAB785', '#355936', '#5BBCF8', '#8BB94B', '#F0F979', '#7B8840', '#CABA4F', '#D3A162', '#FDCA76', '#C1E5DC', '#7AD3AB', '#F3F3AF', '#F6988F', '#FFFFF0', '#FFFFF0', '#A7A7A7', '#F83D48', '#353C92']
// };

config.analysis[analysisKeys.FIRES] = {
  url: 'http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer/4'
};

export const mapConfig = config.map;
export const assetUrls = config.assets;
export const uploadConfig = config.upload;
export const analysisConfig = config.analysis;
export const corsServers = config.corsServers;
export const layerPanelText = config.layerPanel;
export const layerInformation = config.layerInformation;
export const modalText = config.modals;
export const errors = config.errors;
export const urls = config.urls;
