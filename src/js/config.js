import analysisKeys from 'constants/AnalysisConstants';
// import layerKeys from 'constants/LayerConstants';
// import stringKeys from 'constants/StringKeys';

const analysisImageService = 'http://gis-gfw.wri.org/arcgis/rest/services/GFW/analysis/ImageServer';

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
    highchartsMore: '//code.highcharts.com/highcharts-more.js'
  },

  urls: {
    liveSite: 'http://wri.github.io/forest_atlas_template/'
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
    ],
    treeCover: {
      densityFirst: 'Displaying',
      densitySecond: 'canopy density.'
    }
  },
  errors: {
    missingLayerConfig: 'You provided a layer config containing a url but not a type, please specify the layer type in the layer config.',
    incorrectLayerConfig: type => `You provided an invalid type, the application is not configured for type: ${type}. Please use the correct type or implement it in the LayerFactory.`,
    geolocationUnavailable: 'Sorry, it looks like your browser does not support geolocation, please try the latest versions of Safari, Chrome, or Firefox.',
    geolocationFailure: message => `Error retrieving location at this time. ${message}`,
    featureNotFound: 'We could not find a feature available at this point. Please try again.'
  },
  layerInformation: {
    TREE_COVER_LOSS: {
  title: 'Tree Cover Loss',
  subtitle: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
  table: [
    {label: 'Function', html: 'Identifies areas of gross tree cover loss'},
    {label: 'Resolution/Scale', html: '30 × 30 meters'},
    {label: 'Geographic Coverage', html: 'Global land (excluding Antarctica and Arctic islands)'},
    {label: 'Source Data', html: '<a href="http://landsat.usgs.gov/index.php" target="_blank">Landsat</a>'},
    {label: 'Frequency of Updates', html: 'Annual'},
    {label: 'Date of Content', html: '2001–2014'},
    {label: 'Cautions', html: '<p>This data layer was updated in January 2015 to extend the tree cover loss analysis to 2013, and in August 2015 to extend the tree cover loss analysis to 2014. The updates include new data for the target year and re-processed data for the previous two years (2011 and 2012 for the 2013 update, 2012 and 2013 for the 2014 update). The re-processing increased the amount of change that could be detected, resulting in some changes in calculated tree cover loss for 2011-2013 compared to the previous versions. Calculated tree cover loss for 2001-2010 remains unchanged. The integrated use of the original 2001-2012 (Version 1.0) data and the updated 2011–2014 (Version 1.1) data should be performed with caution.</p><p>For the purpose of this study, “tree cover” was defined as all vegetation taller than 5 meters in height. “Tree cover” is the biophysical presence of trees and may take the form of natural forests or plantations existing over a range of canopy densities. “Loss” indicates the removal or mortality of tree canopy cover and can be due to a variety of factors, including mechanical harvesting, fire, disease, or storm damage. As such, “loss” does not equate to deforestation.</p><p>When zoomed out (&lt; zoom level 13), pixels of loss are shaded according to the density of loss at the 30 x 30 meter scale. Pixels with darker shading represent areas with a higher concentration of tree cover loss, whereas pixels with lighter shading indicate a lower concentration of tree cover loss. There is no variation in pixel shading when the data is at full resolution (≥ zoom level 13).</p>'}
  ],
  overview: [
    'This data set measures areas of tree cover loss across all global land (except Antarctica and other Arctic islands) at approximately 30 × 30 meter resolution. The data were generated using multispectral satellite imagery from the <a href="http://landsat.usgs.gov/about_landsat5.php" target="_blank">Landsat 5</a> thematic mapper (TM), the <a href="http://landsat.usgs.gov/science_L7_cpf.php" target="_blank">Landsat 7</a> thematic mapper plus (ETM+), and the <a href="" target="_blank">Landsat 8</a> Operational Land Imager (OLI) sensors. Over 1 million satellite images were processed and analyzed, including over 600,000 Landsat 7 images for the 2000-2012 interval, and approximately 400,000 Landsat 5, 7, and 8 images for updates for the 2011-2014 interval. The clear land surface observations in the satellite images were assembled and a supervised learning algorithm was applied to identify per pixel tree cover loss.',
    'Tree cover loss is defined as “stand replacement disturbance,” or the complete removal of tree cover canopy at the Landsat pixel scale. Tree cover loss may be the result of human activities, including forestry practices such as timber harvesting or deforestation (the conversion of natural forest to other land uses), as well as natural causes such as disease or storm damage. Fire is another widespread cause of tree cover loss, and can be either natural or human-induced.',
    '<strong>2015 Update (Version 1.1)</strong>',
    'This data set has been updated twice since its creation, and now includes loss up to 2014. The analysis method has been modified in numerous ways, and the update should be seen as part of a transition to a future “version 2.0” of this data set that is more consistent over the entire 2001 and onward period. Key changes include:',
    [
      'The use of Landsat 8 data for 2013-2014 and Landsat 5 data for 2011-2012',
      'The reprocessing of data from the previous two years in measuring loss (2011 and 2012 for the 2013 update, 2012 and 2013 for the 2014 update)',
      'Improved training data for calibrating the loss model',
      'Improved per sensor quality assessment models to filter input data',
      'Improved input spectral features for building and applying the loss model'
    ],
    'These changes lead to a different and improved detection of global tree cover loss. However, the years preceding 2011 have not yet been reprocessed with the revised analysis methods, and users will notice inconsistencies between versions 1.0 (2001-2012) and 1.1 (2011-2014) as a result. It must also be noted that a full validation of the results incorporating Landsat 8 has not been undertaken. Such an analysis may reveal a more sensitive ability to detect and map forest disturbance using Landsat 8 data. If this is the case then there will be a more fundamental limitation to the consistency of this data set before and after the inclusion of Landsat 8 data. Validation of Landsat 8-incorporated loss detection is planned.',
    'Some examples of improved change detection in the 2011–2014 update include the following:',
    [
      'Improved detection of boreal forest loss due to fire',
      'Improved detection of smallholder rotation agricultural clearing in dry and humid tropical forests',
      'Improved detection of selective logging'
    ],
    'These are examples of dynamics that may be differentially mapped over the 2011-2014 period in Version 1.1. A version 2.0 reprocessing of the 2001 and onward record is planned, but no delivery date is yet confirmed.',
    'The original version 1.0 data remains available for download <a href="http://earthenginepartners.appspot.com/science-2013-global-forest/download_v1.0.html" target="_blank">here</a>.'
  ],
  citation: [
    '<strong>Citation:</strong> Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend. 2013. “High-Resolution Global Maps of 21st-Century Forest Cover Change.” Science 342 (15 November): 850–53. Data available online from: <a href="http://earthenginepartners.appspot.com/science-2013-global-forest" target="_blank">http://earthenginepartners.appspot.com/science-2013-global-forest</a>.',
    '<strong>Suggested citation for data as displayed on GFW:</strong>Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend. 2013. “Hansen/UMD/Google/USGS/NASA Tree Cover Loss and Gain Area.” University of Maryland, Google, USGS, and NASA. Accessed through Global Forest Watch on [date]. <a href="http://www.globalforestwatch.org" target="_blank">www.globalforestwatch.org</a>.'
  ]
},
  TREE_COVER: {
  title: 'Tree Cover',
  subtitle: '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
  table: [
    {label: 'Function', html: 'Identifies areas of tree cover'},
    {label: 'Resolution/Scale', html: '30 × 30 meters'},
    {label: 'Geographic Coverage', html: 'Global land (excluding Antarctica and Arctic islands)'},
    {label: 'Source Data', html: '<a href="http://landsat.usgs.gov/" target="_blank">Landsat 7 ETM+</a>'},
    {label: 'Date of Content', html: '2000'},
    {label: 'Cautions', html: 'For the purpose of this study, “tree cover” was defined as all vegetation taller than 5 meters in height. “Tree cover” is the biophysical presence of trees and may take the form of natural forests or plantations existing over a range of canopy densities.'}
  ],
  overview: [
    'This data set displays tree cover over all global land (except for Antarctica and a number of Arctic islands) for the year 2000 at 30 × 30 meter resolution. “Percent tree cover” is defined as the density of tree canopy coverage of the land surface and is color-coded by density bracket (see legend).',
    'Data in this layer were generated using multispectral satellite imagery from the <a href="http://landsat.usgs.gov/" target="_blank">Landsat 7 thematic mapper plus (ETM+)</a> sensor. The clear surface observations from over 600,000 images were analyzed using Google Earth Engine, a cloud platform for earth observation and data analysis, to determine per pixel tree cover using a supervised learning algorithm.'
  ],
  citation: [
    '<strong>Citation:</strong> Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend. 2013. “High-Resolution Global Maps of 21st-Century Forest Cover Change.” <em>Science</em> 342 (15 November): 850–53. Data available on-line from: <a href="http://earthenginepartners.appspot.com/science-2013-global-forest" target="_blank">http://earthenginepartners.appspot.com/science-2013-global-forest</a>.',
    '<strong>Suggested citation for data as displayed on GFW:</strong> Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend. 2013. “Tree Cover.” University of Maryland, Google, USGS, and NASA. Accessed through Global Forest Watch on [date]. <a href="http://www.globalforestwatch.org" target="_blank">www.globalforestwatch.org</a>.'
  ]
},
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
      title: 'Adjust the minimum canopy density for tree cover  and tree cover loss',
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
      treeCoverClasses: ['No Data', '<= 10%', '10 - 30%', '> 30%'],
      treeCoverColors: ['rgb(0, 0, 0)', 'rgb(180, 215, 158)', 'rgb(245, 245, 122)', 'rgb(205, 170, 102)'],
      populationId: '$2',
      populationClasses: ['No Data', '<= 20', '20 - 50', '50 - 150', '150 - 500', '> 500'],
      populationColors: ['rgb(0, 0, 0)', 'rgb(255, 255, 128)', 'rgb(250, 209, 85)', 'rgb(242, 167, 46)', 'rgb(173, 83, 19)', 'rgb(107, 0, 0)'],
      slopeId: '$3',
      slopeClasses: ['No Data', '<= 30%', '30 - 60%', '> 60%'],
      slopeColors: ['rgb(0, 0, 0)', 'rgb(255, 235, 175)', 'rgb(115, 115, 0)', 'rgb(168, 0, 0)'],
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

config.analysis[analysisKeys.LC_LOSS] = {
  id: '$523',
  bounds: [1, 20],
  colors: ['#3B823D', '#7CA079', '#AAB785', '#355936', '#5BBCF8', '#8BB94B', '#F0F979', '#7B8840', '#CABA4F', '#D3A162', '#FDCA76', '#C1E5DC', '#7AD3AB', '#F3F3AF', '#F6988F', '#FFFFF0', '#FFFFF0', '#A7A7A7', '#F83D48', '#353C92']
};

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

config.analysis[analysisKeys.LCC] = {
  lockRaster: 523,
  colors: ['#3B823D', '#7CA079', '#AAB785', '#355936', '#5BBCF8', '#8BB94B', '#F0F979', '#7B8840', '#CABA4F', '#D3A162', '#FDCA76', '#C1E5DC', '#7AD3AB', '#F3F3AF', '#F6988F', '#FFFFF0', '#FFFFF0', '#A7A7A7', '#F83D48', '#353C92']
};

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
