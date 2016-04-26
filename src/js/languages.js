import analysisKeys from 'constants/AnalysisConstants';

//- Embedded Icons
const drawIcon = '<svg class="svg-icon"><use xlink:href="#icon-draw-upload" /></svg>';

const strings = { en: {}, fr: {}, es: {}, pt: {} };
//- NOTE: English
//- Layers
// strings.en.LAND_COVER_LABEL = 'Land cover';
// strings.en.ACTIVE_FIRES_LABEL = 'Active fires';
// strings.en.ACTIVE_FIRES_SUB_LABEL = '(daily, 1km, global, NASA)';
// strings.en.TREE_COVER_LABEL = 'Tree cover';
// strings.en.TREE_COVER_SUB_LABEL = '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)';
// strings.en.GAIN_LABEL = 'Tree cover gain';
// strings.en.GAIN_SUB_LABEL = '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)';
// strings.en.LOSS_LABEL = 'Tree cover loss';
// strings.en.LOSS_SUB_LABEL = '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)';
// strings.en.IFL_LABEL = 'Intact forest loss';
// strings.en.CARBON_LABEL = 'Above ground biomass';
//- Header
strings.en.NAV_ABOUT = 'About';
strings.en.NAV_DOWNLOAD = 'Download Data';
strings.en.NAV_MAP_THEMES = 'Map Themes';
strings.en.NAV_MY_GFW = 'Log in to my GFW';
strings.en.NAV_LANGUAGE = 'Select Language';
//- Documents
strings.en.DOCS_INSTRUCTIONS = 'Select an area of interest to see if there are any related documents';
strings.en.DOCS_NOT_AVAILABLE = 'There are no documents available for this area';
strings.en.DOCS_TYPE = 'Type';
strings.en.DOCS_AUTHOR = 'Author';
strings.en.DOCS_YEAR = 'Year';
strings.en.DOCS_PDF = 'PDF';
//- Info Window
strings.en.INFO_WINDOW_INSTRUCTION_HEADER = 'Select a shape on the map';
strings.en.INFO_WINDOW_INSTRUCTION_LIST = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map'
];
//- Analysis
strings.en.ANALYSIS_INSTRUCTION_HEADER = 'Analyze a shape on the map';
strings.en.ANALYSIS_INSTRUCTION_LIST = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map',
  'Click on the analyze tab'
];
strings.en.ANALYSIS_OR = 'Or';
strings.en.ANALYSIS_DRAW_HEADER = 'Analyze your own shape';
//- ${drawIcon} references a variable above, do not translate
strings.en.ANALYSIS_DRAW_INSTRUCTIONS = [
  `Choose the draw tool ${drawIcon} in the toolbox`,
  'Draw a shape anywhere on the map',
  'Select the shape to run the analysis'
];
strings.en.ANALYSIS_DRAW_BUTTON = 'Start drawing';
strings.en.ANALYSIS_INSTRUCTION_ADDITIONAL = `Add additional shapes in the future by visiting the draw tool ${drawIcon}`;
strings.en.ANALYSIS_SHAPEFILE_UPLOAD = 'or drop a custom shapefile here';
strings.en.ANALYSIS_SELECT_TYPE_LABEL = 'Select Analysis:';
//- Chart Labels in the Analysis
strings.en.ANALYSIS_TC_CHART_NAME = 'Tree cover loss in Hectares';
strings.en.ANALYSIS_LCC_CHART_NAME = 'Land Cover Composition';
strings.en.ANALYSIS_IFL_LABELS = ['Intact Forest'];
strings.en.ANALYSIS_FIRES_PRE = 'There are';
strings.en.ANALYSIS_FIRES_ACTIVE = 'active fires';
strings.en.ANALYSIS_FIRES_POST = 'in the last 7 days';
strings.en.ANALYSIS_TOTAL_LOSS_LABEL = 'Total tree cover loss';
strings.en.ANALYSIS_TOTAL_LOSS_RANGE = '(2001 - 2014):';
strings.en.ANALYSIS_TOTAL_GAIN_LABEL = 'Total tree cover gained';
strings.en.ANALYSIS_TOTAL_GAIN_RANGE = '(2001 - 2012):';
strings.en.ANALYSIS_SLOPE_OPTION = 'Option #';
strings.en.SLOPE_SELECT_LABEL = 'Choose slope percent:';
strings.en.ANALYSIS_RESTORATION_LC_LABELS = [
  'No Data', 'Forestland', 'Grassland', 'Cropland', 'Wetland and Waterbodies', 'Settlement', 'Bare soil'
];
strings.en.ANALYSIS_RESTORATION_ERROR = 'Area not meeting criteria for potential/No data';
strings.en.ANALYSIS_GROUP_RESTORATION = 'Restoration potential for';
strings.en.ANALYSIS_GROUP_SLOPE = 'Potential according to';
strings.en.ANALYSIS_GROUP_OTHER = 'Other analysis';
//- Group and value should not be modified
strings.en.ANALYSIS_SELECT_TYPE_OPTIONS = [
  { label: 'Slope',
    value: analysisKeys.SLOPE,
    group: analysisKeys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Tree cover loss',
    value: analysisKeys.TC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Total tree cover loss/gain',
    value: analysisKeys.TC_LOSS_GAIN,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover loss',
    value: analysisKeys.LC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Biomass loss',
    value: analysisKeys.BIO_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Intact forest loss',
    value: analysisKeys.INTACT_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Active fires',
    value: analysisKeys.FIRES,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover composition',
    value: analysisKeys.LCC,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  }
];

//- Modals
strings.en.CANOPY_MODAL_TEXT = 'Adjust the minimum canopy density for tree cover and tree cover loss';
strings.en.DENSITY_FIRST = 'Displaying';
strings.en.DENSITY_SECOND = 'canopy density.';

//- Miscellaneous
strings.en.PRINT_BUTTON_LABEL = 'Choose a print template';
strings.en.PRINT_REPORT = 'Print Report';
strings.en.SUBSCRIBE = 'Subscribe';
strings.en.SEARCH = 'Search';
strings.en.LAYERS = 'Layers';
strings.en.DATA = 'Data';
strings.en.ANALYZE = 'Analyze';
strings.en.DOCS = 'Docs';
strings.en.NARRATIVE = 'Narrative';
strings.en.MORE = 'More';


//- NOTE: French
//- Header
strings.fr.NAV_ABOUT = 'About';
strings.fr.NAV_DOWNLOAD = 'Download Data';
strings.fr.NAV_MAP_THEMES = 'Map Themes';
strings.fr.NAV_MY_GFW = 'Log in to my GFW';
strings.fr.NAV_LANGUAGE = 'Select Language';
//- Documents
strings.fr.DOCS_INSTRUCTIONS = 'Select an area of interest to see if there are any related documents';
strings.fr.DOCS_NOT_AVAILABLE = 'There are no documents available for this area';
strings.fr.DOCS_TYPE = 'Type';
strings.fr.DOCS_AUTHOR = 'Author';
strings.fr.DOCS_YEAR = 'Year';
strings.fr.DOCS_PDF = 'PDF';
//- Info Window
strings.fr.INFO_WINDOW_INSTRUCTION_HEADER = 'Select a shape on the map';
strings.fr.INFO_WINDOW_INSTRUCTION_LIST = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map'
];
//- Analysis
strings.fr.ANALYSIS_INSTRUCTION_HEADER = 'Analyze a shape on the map';
strings.fr.ANALYSIS_INSTRUCTION_LIST = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map',
  'Click on the analyze tab'
];
strings.fr.ANALYSIS_OR = 'Or';
strings.fr.ANALYSIS_DRAW_HEADER = 'Analyze your own shape';
//- ${drawIcon} references a variable above, do not translate
strings.fr.ANALYSIS_DRAW_INSTRUCTIONS = [
  `Choose the draw tool ${drawIcon} in the toolbox`,
  'Draw a shape anywhere on the map',
  'Select the shape to run the analysis'
];
strings.fr.ANALYSIS_DRAW_BUTTON = 'Start drawing';
strings.fr.ANALYSIS_INSTRUCTION_ADDITIONAL = `Add additional shapes in the future by visiting the draw tool ${drawIcon}`;
strings.fr.ANALYSIS_SHAPEFILE_UPLOAD = 'or drop a custom shapefile here';
strings.fr.ANALYSIS_SELECT_TYPE_LABEL = 'Select Analysis:';
//- Chart Labels in the Analysis
strings.fr.ANALYSIS_TC_CHART_NAME = 'Tree cover loss in Hectares';
strings.fr.ANALYSIS_LCC_CHART_NAME = 'Land Cover Composition';
strings.fr.ANALYSIS_IFL_LABELS = ['Intact Forest'];
strings.fr.ANALYSIS_FIRES_PRE = 'There are';
strings.fr.ANALYSIS_FIRES_ACTIVE = 'active fires';
strings.fr.ANALYSIS_FIRES_POST = 'in the last 7 days';
strings.fr.ANALYSIS_TOTAL_LOSS_LABEL = 'Total tree cover loss';
strings.fr.ANALYSIS_TOTAL_LOSS_RANGE = '(2001 - 2014):';
strings.fr.ANALYSIS_TOTAL_GAIN_LABEL = 'Total tree cover gained';
strings.fr.ANALYSIS_TOTAL_GAIN_RANGE = '(2001 - 2012):';
strings.fr.ANALYSIS_SLOPE_OPTION = 'Option #';
strings.fr.SLOPE_SELECT_LABEL = 'Choose slope percent:';
strings.fr.ANALYSIS_RESTORATION_LC_LABELS = [
  'No Data', 'Forestland', 'Grassland', 'Cropland', 'Wetland and Waterbodies', 'Settlement', 'Bare soil'
];
strings.fr.ANALYSIS_RESTORATION_ERROR = 'Area not meeting criteria for potential/No data';
strings.fr.ANALYSIS_GROUP_RESTORATION = 'Restoration potential for';
strings.fr.ANALYSIS_GROUP_SLOPE = 'Potential according to';
strings.fr.ANALYSIS_GROUP_OTHER = 'Other analysis';
//- Group and value should not be modified
strings.fr.ANALYSIS_SELECT_TYPE_OPTIONS = [
  { label: 'Slope',
    value: analysisKeys.SLOPE,
    group: analysisKeys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Tree cover loss',
    value: analysisKeys.TC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Total tree cover loss/gain',
    value: analysisKeys.TC_LOSS_GAIN,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover loss',
    value: analysisKeys.LC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Biomass loss',
    value: analysisKeys.BIO_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Intact forest loss',
    value: analysisKeys.INTACT_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Active fires',
    value: analysisKeys.FIRES,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover composition',
    value: analysisKeys.LCC,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  }
];

//- Modals
strings.fr.CANOPY_MODAL_TEXT = 'Adjust the minimum canopy density for tree cover and tree cover loss';
strings.fr.DENSITY_FIRST = 'Displaying';
strings.fr.DENSITY_SECOND = 'canopy density.';

//- Miscellaneous
strings.fr.PRINT_BUTTON_LABEL = 'Choose a print template';
strings.fr.PRINT_REPORT = 'Print Report';
strings.fr.SUBSCRIBE = 'Subscribe';
strings.fr.SEARCH = 'Search';
strings.fr.LAYERS = 'Layers';
strings.fr.DATA = 'Data';
strings.fr.ANALYZE = 'Analyze';
strings.fr.DOCS = 'Docs';
strings.fr.NARRATIVE = 'Narrative';
strings.fr.MORE = 'More';


//- NOTE: Spanish
//- Header
strings.es.NAV_ABOUT = 'About';
strings.es.NAV_DOWNLOAD = 'Download Data';
strings.es.NAV_MAP_THEMES = 'Map Themes';
strings.es.NAV_MY_GFW = 'Log in to my GFW';
strings.es.NAV_LANGUAGE = 'Select Language';
//- Documents
strings.es.DOCS_INSTRUCTIONS = 'Select an area of interest to see if there are any related documents';
strings.es.DOCS_NOT_AVAILABLE = 'There are no documents available for this area';
strings.es.DOCS_TYPE = 'Type';
strings.es.DOCS_AUTHOR = 'Author';
strings.es.DOCS_YEAR = 'Year';
strings.es.DOCS_PDF = 'PDF';
//- Info Window
strings.es.INFO_WINDOW_INSTRUCTION_HEADER = 'Select a shape on the map';
strings.es.INFO_WINDOW_INSTRUCTION_LIST = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map'
];
//- Analysis
strings.es.ANALYSIS_INSTRUCTION_HEADER = 'Analyze a shape on the map';
strings.es.ANALYSIS_INSTRUCTION_LIST = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map',
  'Click on the analyze tab'
];
strings.es.ANALYSIS_OR = 'Or';
strings.es.ANALYSIS_DRAW_HEADER = 'Analyze your own shape';
//- ${drawIcon} references a variable above, do not translate
strings.es.ANALYSIS_DRAW_INSTRUCTIONS = [
  `Choose the draw tool ${drawIcon} in the toolbox`,
  'Draw a shape anywhere on the map',
  'Select the shape to run the analysis'
];
strings.es.ANALYSIS_DRAW_BUTTON = 'Start drawing';
strings.es.ANALYSIS_INSTRUCTION_ADDITIONAL = `Add additional shapes in the future by visiting the draw tool ${drawIcon}`;
strings.es.ANALYSIS_SHAPEFILE_UPLOAD = 'or drop a custom shapefile here';
strings.es.ANALYSIS_SELECT_TYPE_LABEL = 'Select Analysis:';
//- Chart Labels in the Analysis
strings.es.ANALYSIS_TC_CHART_NAME = 'Tree cover loss in Hectares';
strings.es.ANALYSIS_LCC_CHART_NAME = 'Land Cover Composition';
strings.es.ANALYSIS_IFL_LABELS = ['Intact Forest'];
strings.es.ANALYSIS_FIRES_PRE = 'There are';
strings.es.ANALYSIS_FIRES_ACTIVE = 'active fires';
strings.es.ANALYSIS_FIRES_POST = 'in the last 7 days';
strings.es.ANALYSIS_TOTAL_LOSS_LABEL = 'Total tree cover loss';
strings.es.ANALYSIS_TOTAL_LOSS_RANGE = '(2001 - 2014):';
strings.es.ANALYSIS_TOTAL_GAIN_LABEL = 'Total tree cover gained';
strings.es.ANALYSIS_TOTAL_GAIN_RANGE = '(2001 - 2012):';
strings.es.ANALYSIS_SLOPE_OPTION = 'Option #';
strings.es.SLOPE_SELECT_LABEL = 'Choose slope percent:';
strings.es.ANALYSIS_RESTORATION_LC_LABELS = [
  'No Data', 'Forestland', 'Grassland', 'Cropland', 'Wetland and Waterbodies', 'Settlement', 'Bare soil'
];
strings.es.ANALYSIS_RESTORATION_ERROR = 'Area not meeting criteria for potential/No data';
strings.es.ANALYSIS_GROUP_RESTORATION = 'Restoration potential for';
strings.es.ANALYSIS_GROUP_SLOPE = 'Potential according to';
strings.es.ANALYSIS_GROUP_OTHER = 'Other analysis';
//- Group and value should not be modified
strings.es.ANALYSIS_SELECT_TYPE_OPTIONS = [
  { label: 'Slope',
    value: analysisKeys.SLOPE,
    group: analysisKeys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Tree cover loss',
    value: analysisKeys.TC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Total tree cover loss/gain',
    value: analysisKeys.TC_LOSS_GAIN,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover loss',
    value: analysisKeys.LC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Biomass loss',
    value: analysisKeys.BIO_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Intact forest loss',
    value: analysisKeys.INTACT_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Active fires',
    value: analysisKeys.FIRES,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover composition',
    value: analysisKeys.LCC,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  }
];

//- Modals
strings.es.CANOPY_MODAL_TEXT = 'Adjust the minimum canopy density for tree cover and tree cover loss';
strings.es.DENSITY_FIRST = 'Displaying';
strings.es.DENSITY_SECOND = 'canopy density.';

//- Miscellaneous
strings.es.PRINT_BUTTON_LABEL = 'Choose a print template';
strings.es.PRINT_REPORT = 'Print Report';
strings.es.SUBSCRIBE = 'Subscribe';
strings.es.SEARCH = 'Search';
strings.es.LAYERS = 'Layers';
strings.es.DATA = 'Data';
strings.es.ANALYZE = 'Analyze';
strings.es.DOCS = 'Docs';
strings.es.NARRATIVE = 'Narrative';
strings.es.MORE = 'More';

//- NOTE: Portugese
//- Header
strings.pt.NAV_ABOUT = 'About';
strings.pt.NAV_DOWNLOAD = 'Download Data';
strings.pt.NAV_MAP_THEMES = 'Map Themes';
strings.pt.NAV_MY_GFW = 'Log in to my GFW';
strings.pt.NAV_LANGUAGE = 'Select Language';
//- Documents
strings.pt.DOCS_INSTRUCTIONS = 'Select an area of interest to see if there are any related documents';
strings.pt.DOCS_NOT_AVAILABLE = 'There are no documents available for this area';
strings.pt.DOCS_TYPE = 'Type';
strings.pt.DOCS_AUTHOR = 'Author';
strings.pt.DOCS_YEAR = 'Year';
strings.pt.DOCS_PDF = 'PDF';
//- Info Window
strings.pt.INFO_WINDOW_INSTRUCTION_HEADER = 'Select a shape on the map';
strings.pt.INFO_WINDOW_INSTRUCTION_LIST = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map'
];
//- Analysis
strings.pt.ANALYSIS_INSTRUCTION_HEADER = 'Analyze a shape on the map';
strings.pt.ANALYSIS_INSTRUCTION_LIST = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map',
  'Click on the analyze tab'
];
strings.pt.ANALYSIS_OR = 'Or';
strings.pt.ANALYSIS_DRAW_HEADER = 'Analyze your own shape';
//- ${drawIcon} references a variable above, do not translate
strings.pt.ANALYSIS_DRAW_INSTRUCTIONS = [
  `Choose the draw tool ${drawIcon} in the toolbox`,
  'Draw a shape anywhere on the map',
  'Select the shape to run the analysis'
];
strings.pt.ANALYSIS_DRAW_BUTTON = 'Start drawing';
strings.pt.ANALYSIS_INSTRUCTION_ADDITIONAL = `Add additional shapes in the future by visiting the draw tool ${drawIcon}`;
strings.pt.ANALYSIS_SHAPEFILE_UPLOAD = 'or drop a custom shapefile here';
strings.pt.ANALYSIS_SELECT_TYPE_LABEL = 'Select Analysis:';
//- Chart Labels in the Analysis
strings.pt.ANALYSIS_TC_CHART_NAME = 'Tree cover loss in Hectares';
strings.pt.ANALYSIS_LCC_CHART_NAME = 'Land Cover Composition';
strings.pt.ANALYSIS_IFL_LABELS = ['Intact Forest'];
strings.pt.ANALYSIS_FIRES_PRE = 'There are';
strings.pt.ANALYSIS_FIRES_ACTIVE = 'active fires';
strings.pt.ANALYSIS_FIRES_POST = 'in the last 7 days';
strings.pt.ANALYSIS_TOTAL_LOSS_LABEL = 'Total tree cover loss';
strings.pt.ANALYSIS_TOTAL_LOSS_RANGE = '(2001 - 2014):';
strings.pt.ANALYSIS_TOTAL_GAIN_LABEL = 'Total tree cover gained';
strings.pt.ANALYSIS_TOTAL_GAIN_RANGE = '(2001 - 2012):';
strings.pt.ANALYSIS_SLOPE_OPTION = 'Option #';
strings.pt.SLOPE_SELECT_LABEL = 'Choose slope percent:';
strings.pt.ANALYSIS_RESTORATION_LC_LABELS = [
  'No Data', 'Forestland', 'Grassland', 'Cropland', 'Wetland and Waterbodies', 'Settlement', 'Bare soil'
];
strings.pt.ANALYSIS_RESTORATION_ERROR = 'Area not meeting criteria for potential/No data';
strings.pt.ANALYSIS_GROUP_RESTORATION = 'Restoration potential for';
strings.pt.ANALYSIS_GROUP_SLOPE = 'Potential according to';
strings.pt.ANALYSIS_GROUP_OTHER = 'Other analysis';
//- Group and value should not be modified
strings.pt.ANALYSIS_SELECT_TYPE_OPTIONS = [
  { label: 'Slope',
    value: analysisKeys.SLOPE,
    group: analysisKeys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Tree cover loss',
    value: analysisKeys.TC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Total tree cover loss/gain',
    value: analysisKeys.TC_LOSS_GAIN,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover loss',
    value: analysisKeys.LC_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Biomass loss',
    value: analysisKeys.BIO_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Intact forest loss',
    value: analysisKeys.INTACT_LOSS,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Active fires',
    value: analysisKeys.FIRES,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover composition',
    value: analysisKeys.LCC,
    group: analysisKeys.ANALYSIS_GROUP_OTHER
  }
];

//- Modals
strings.pt.CANOPY_MODAL_TEXT = 'Adjust the minimum canopy density for tree cover and tree cover loss';
strings.pt.DENSITY_FIRST = 'Displaying';
strings.pt.DENSITY_SECOND = 'canopy density.';

//- Miscellaneous
strings.pt.PRINT_BUTTON_LABEL = 'Choose a print template';
strings.pt.PRINT_REPORT = 'Print Report';
strings.pt.SUBSCRIBE = 'Subscribe';
strings.pt.SEARCH = 'Search';
strings.pt.LAYERS = 'Layers';
strings.pt.DATA = 'Data';
strings.pt.ANALYZE = 'Analyze';
strings.pt.DOCS = 'Docs';
strings.pt.NARRATIVE = 'Narrative';
strings.pt.MORE = 'More';

export { strings as default };
