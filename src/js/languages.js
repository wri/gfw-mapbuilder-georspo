import analysisKeys from 'constants/AnalysisConstants';
import keys from 'constants/StringKeys';

//- Embedded Icons
const drawIcon = '<svg class="svg-icon"><use xlink:href="#icon-draw-upload" /></svg>';

const strings = { en: {}, fr: {}, es: {}, pt: {} };
//- NOTE: English
//- Layers
strings.en[keys.LAND_COVER_LABEL] = 'Land cover';
strings.en[keys.ACTIVE_FIRES_LABEL] = 'Active fires';
strings.en[keys.ACTIVE_FIRES_SUB_LABEL] = '(daily, 1km, global, NASA)';
strings.en[keys.TREE_COVER_LABEL] = 'Tree cover';
strings.en[keys.TREE_COVER_SUB_LABEL] = '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)';
strings.en[keys.GAIN_LABEL] = 'Tree cover gain';
strings.en[keys.GAIN_SUB_LABEL] = '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings.en[keys.LOSS_LABEL] = 'Tree cover loss';
strings.en[keys.LOSS_SUB_LABEL] = '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings.en[keys.IFL_LABEL] = 'Intact forest loss';
strings.en[keys.CARBON_LABEL] = 'Above ground biomass';
//- Header
strings.en[keys.NAV_ABOUT] = 'About';
strings.en[keys.NAV_DOWNLOAD] = 'Download Data';
strings.en[keys.NAV_MAP_THEMES] = 'Map Themes';
strings.en[keys.NAV_MY_GFW] = 'Log in to my GFW';
strings.en[keys.NAV_LANGUAGE] = 'Select Language';
//- Documents
strings.en[keys.DOCS_INSTRUCTIONS] = 'Select an area of interest to see if there are any related documents';
strings.en[keys.DOCS_NOT_AVAILABLE] = 'There are no documents available for this area';
strings.en[keys.DOCS_TYPE] = 'Type';
strings.en[keys.DOCS_AUTHOR] = 'Author';
strings.en[keys.DOCS_YEAR] = 'Year';
strings.en[keys.DOCS_PDF] = 'PDF';
//- Analysis
strings.en[keys.ANALYSIS_INSTRUCTION_HEADER] = 'Analyze a shape on the map';
strings.en[keys.ANALYSIS_INSTRUCTION_LIST] = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map',
  'Click on the analyze tab'
];
strings.en[keys.ANALYSIS_OR] = 'Or';
strings.en[keys.ANALYSIS_DRAW_HEADER] = 'Analyze your own shape';
//- ${drawIcon} references a variable above, do not translate
strings.en[keys.ANALYSIS_DRAW_INSTRUCTIONS] = [
  `Choose the draw tool ${drawIcon} in the toolbox`,
  'Draw a shape anywhere on the map',
  'Select the shape to run the analysis'
];
strings.en[keys.ANALYSIS_DRAW_BUTTON] = 'Start drawing';
strings.en[keys.ANALYSIS_INSTRUCTION_ADDITIONAL] = `Add additional shapes in the future by visiting the draw tool ${drawIcon}`;
strings.en[keys.ANALYSIS_SHAPEFILE_UPLOAD] = 'or drop a custom shapefile here';
strings.en[keys.ANALYSIS_SELECT_TYPE_LABEL] = 'Select Analysis:';
//- Chart Labels in the Analysis
strings.en[keys.ANALYSIS_TC_CHART_NAME] = 'Tree cover loss in Hectares';
strings.en[keys.ANALYSIS_LCC_CHART_NAME] = 'Land Cover Composition';
strings.en[keys.ANALYSIS_LC_LABELS] = ['Dense moist forest', 'Submontane forest', 'Mountain forest', 'Edaphic forest', 'Mangrove', 'Forest-savanna mosaic', 'Rural complex and young secondary forest', 'Closed to open deciduous woodland', 'Savanna woodland-Tree savanna', 'Shrubland', 'Grassland', 'Aquatic grassland', 'Swamp grassland', 'Sparse vegetation', 'Mosaic cultivated areas/vegeatation( herbaceous or shrub)', 'Agriculture', 'Irrigated agriculture', 'Bare areas', 'Artificial surfaces and associated areas', 'Water Bodies'];
strings.en[keys.ANALYSIS_IFL_LABELS] = ['Intact Forest'];
strings.en[keys.ANALYSIS_FIRES_PRE] = 'There are';
strings.en[keys.ANALYSIS_FIRES_ACTIVE] = 'active fires';
strings.en[keys.ANALYSIS_FIRES_POST] = 'in the last 7 days';
strings.en[keys.ANALYSIS_TOTAL_LOSS_LABEL] = 'Total tree cover loss';
strings.en[keys.ANALYSIS_TOTAL_LOSS_RANGE] = '(2001 - 2014):';
strings.en[keys.ANALYSIS_TOTAL_GAIN_LABEL] = 'Total tree cover gained';
strings.en[keys.ANALYSIS_TOTAL_GAIN_RANGE] = '(2001 - 2012):';
strings.en[keys.ANALYSIS_SLOPE_OPTION] = 'Option #';
strings.en[keys.ANALYSIS_RESTORATION_LC_LABELS] = [
  'No Data', 'Forestland', 'Grassland', 'Cropland', 'Wetland and Waterbodies', 'Settlement', 'Bare soil'
];
//- Group and value should not be modified, Group labels are configured below
strings.en[keys.ANALYSIS_SELECT_TYPE_OPTIONS] = [
  { label: 'Slope',
    value: analysisKeys.SLOPE,
    group: keys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Tree cover loss',
    value: analysisKeys.TC_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Total tree cover loss/gain',
    value: analysisKeys.TC_LOSS_GAIN,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover loss',
    value: analysisKeys.LC_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Biomass loss',
    value: analysisKeys.BIO_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Intact forest loss',
    value: analysisKeys.INTACT_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Active fires',
    value: analysisKeys.FIRES,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover composition',
    value: analysisKeys.LCC,
    group: keys.ANALYSIS_GROUP_OTHER
  }
];
strings.en[keys.ANALYSIS_GROUP_RESTORATION] = 'Restoration potential for';
strings.en[keys.ANALYSIS_GROUP_SLOPE] = 'Potential according to';
strings.en[keys.ANALYSIS_GROUP_OTHER] = 'Other analysis';

//- Mobile
strings.en[keys.LAYERS] = 'Layers';
strings.en[keys.DATA] = 'Data';
strings.en[keys.ANALYZE] = 'Analyze';
strings.en[keys.DOCS] = 'Docs';
strings.en[keys.MORE] = 'More';

//- Miscellaneous
strings.en[keys.CANOPY_MODAL_TEXT] = 'Adjust the minimum canopy density for tree cover and tree cover loss';
strings.en[keys.PRINT_BUTTON_LABEL] = 'Choose a print template';
strings.en[keys.PRINT_REPORT] = 'Print Report';
strings.en[keys.SUBSCRIBE] = 'Subscribe';
strings.en[keys.SEARCH] = 'Search';


//- NOTE: French
strings.fr[keys.LAND_COVER_LABEL] = 'Land cover';
strings.fr[keys.ACTIVE_FIRES_LABEL] = 'Active fires';
strings.fr[keys.ACTIVE_FIRES_SUB_LABEL] = '(daily, 1km, global, NASA)';
strings.fr[keys.TREE_COVER_LABEL] = 'Tree cover';
strings.fr[keys.TREE_COVER_SUB_LABEL] = '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)';
strings.fr[keys.GAIN_LABEL] = 'Tree cover gain';
strings.fr[keys.GAIN_SUB_LABEL] = '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings.fr[keys.LOSS_LABEL] = 'Tree cover loss';
strings.fr[keys.LOSS_SUB_LABEL] = '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings.fr[keys.IFL_LABEL] = 'Intact forest loss';
strings.fr[keys.CARBON_LABEL] = 'Above ground biomass';
//- Header
strings.fr[keys.NAV_ABOUT] = 'About';
strings.fr[keys.NAV_DOWNLOAD] = 'Download Data';
strings.fr[keys.NAV_MAP_THEMES] = 'Map Themes';
strings.fr[keys.NAV_MY_GFW] = 'Log in to my GFW';
strings.fr[keys.NAV_LANGUAGE] = 'Select Language';
//- Documents
strings.fr[keys.DOCS_INSTRUCTIONS] = 'Select an area of interest to see if there are any related documents';
strings.fr[keys.DOCS_NOT_AVAILABLE] = 'There are no documents available for this area';
strings.fr[keys.DOCS_TYPE] = 'Type';
strings.fr[keys.DOCS_AUTHOR] = 'Author';
strings.fr[keys.DOCS_YEAR] = 'Year';
strings.fr[keys.DOCS_PDF] = 'PDF';
//- Analysis
strings.fr[keys.ANALYSIS_INSTRUCTION_HEADER] = 'Analyze a shape on the map';
strings.fr[keys.ANALYSIS_INSTRUCTION_LIST] = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map',
  'Click on the analyze tab'
];
strings.fr[keys.ANALYSIS_OR] = 'Or';
strings.fr[keys.ANALYSIS_DRAW_HEADER] = 'Analyze your own shape';
//- ${drawIcon} references a variable above, do not translate
strings.fr[keys.ANALYSIS_DRAW_INSTRUCTIONS] = [
  `Choose the draw tool ${drawIcon} in the toolbox`,
  'Draw a shape anywhere on the map',
  'Select the shape to run the analysis'
];
strings.fr[keys.ANALYSIS_DRAW_BUTTON] = 'Start drawing';
strings.fr[keys.ANALYSIS_INSTRUCTION_ADDITIONAL] = `Add additional shapes in the future by visiting the draw tool ${drawIcon}`;
strings.fr[keys.ANALYSIS_SHAPEFILE_UPLOAD] = 'or drop a custom shapefile here';
strings.fr[keys.ANALYSIS_SELECT_TYPE_LABEL] = 'Select Analysis:';
//- Chart Labels in the Analysis
strings.fr[keys.ANALYSIS_TC_CHART_NAME] = 'Tree cover loss in Hectares';
strings.fr[keys.ANALYSIS_LCC_CHART_NAME] = 'Land Cover Composition';
strings.fr[keys.ANALYSIS_LC_LABELS] = ['Dense moist forest', 'Submontane forest', 'Mountain forest', 'Edaphic forest', 'Mangrove', 'Forest-savanna mosaic', 'Rural complex and young secondary forest', 'Closed to open deciduous woodland', 'Savanna woodland-Tree savanna', 'Shrubland', 'Grassland', 'Aquatic grassland', 'Swamp grassland', 'Sparse vegetation', 'Mosaic cultivated areas/vegeatation( herbaceous or shrub)', 'Agriculture', 'Irrigated agriculture', 'Bare areas', 'Artificial surfaces and associated areas', 'Water Bodies'];
strings.fr[keys.ANALYSIS_IFL_LABELS] = ['Intact Forest'];
strings.fr[keys.ANALYSIS_FIRES_PRE] = 'There are';
strings.fr[keys.ANALYSIS_FIRES_ACTIVE] = 'active fires';
strings.fr[keys.ANALYSIS_FIRES_POST] = 'in the last 7 days';
strings.fr[keys.ANALYSIS_TOTAL_LOSS_LABEL] = 'Total tree cover loss';
strings.fr[keys.ANALYSIS_TOTAL_LOSS_RANGE] = '(2001 - 2014):';
strings.fr[keys.ANALYSIS_TOTAL_GAIN_LABEL] = 'Total tree cover gained';
strings.fr[keys.ANALYSIS_TOTAL_GAIN_RANGE] = '(2001 - 2012):';
strings.fr[keys.ANALYSIS_SLOPE_OPTION] = 'Option #';
strings.fr[keys.ANALYSIS_RESTORATION_LC_LABELS] = [
  'No Data', 'Forestland', 'Grassland', 'Cropland', 'Wetland and Waterbodies', 'Settlement', 'Bare soil'
];
//- Group and value should not be modified, Group labels are configured below
strings.fr[keys.ANALYSIS_SELECT_TYPE_OPTIONS] = [
  { label: 'Slope',
    value: analysisKeys.SLOPE,
    group: keys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Tree cover loss',
    value: analysisKeys.TC_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Total tree cover loss/gain',
    value: analysisKeys.TC_LOSS_GAIN,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover loss',
    value: analysisKeys.LC_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Biomass loss',
    value: analysisKeys.BIO_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Intact forest loss',
    value: analysisKeys.INTACT_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Active fires',
    value: analysisKeys.FIRES,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover composition',
    value: analysisKeys.LCC,
    group: keys.ANALYSIS_GROUP_OTHER
  }
];
strings.fr[keys.ANALYSIS_GROUP_RESTORATION] = 'Restoration potential for';
strings.fr[keys.ANALYSIS_GROUP_SLOPE] = 'Potential according to';
strings.fr[keys.ANALYSIS_GROUP_OTHER] = 'Other analysis';

//- Mobile
strings.fr[keys.LAYERS] = 'Layers';
strings.fr[keys.DATA] = 'Data';
strings.fr[keys.ANALYZE] = 'Analyze';
strings.fr[keys.DOCS] = 'Docs';
strings.fr[keys.MORE] = 'More';

//- Miscellaneous
strings.fr[keys.CANOPY_MODAL_TEXT] = 'Adjust the minimum canopy density for tree cover and tree cover loss';
strings.fr[keys.PRINT_BUTTON_LABEL] = 'Choose a print template';
strings.fr[keys.PRINT_REPORT] = 'Print Report';
strings.fr[keys.SUBSCRIBE] = 'Subscribe';
strings.fr[keys.SEARCH] = 'Search';


//- NOTE: Spanish
strings.es[keys.LAND_COVER_LABEL] = 'Land cover';
strings.es[keys.ACTIVE_FIRES_LABEL] = 'Active fires';
strings.es[keys.ACTIVE_FIRES_SUB_LABEL] = '(daily, 1km, global, NASA)';
strings.es[keys.TREE_COVER_LABEL] = 'Tree cover';
strings.es[keys.TREE_COVER_SUB_LABEL] = '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)';
strings.es[keys.GAIN_LABEL] = 'Tree cover gain';
strings.es[keys.GAIN_SUB_LABEL] = '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings.es[keys.LOSS_LABEL] = 'Tree cover loss';
strings.es[keys.LOSS_SUB_LABEL] = '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings.es[keys.IFL_LABEL] = 'Intact forest loss';
strings.es[keys.CARBON_LABEL] = 'Above ground biomass';
//- Header
strings.es[keys.NAV_ABOUT] = 'About';
strings.es[keys.NAV_DOWNLOAD] = 'Download Data';
strings.es[keys.NAV_MAP_THEMES] = 'Map Themes';
strings.es[keys.NAV_MY_GFW] = 'Log in to my GFW';
strings.es[keys.NAV_LANGUAGE] = 'Select Language';
//- Documents
strings.es[keys.DOCS_INSTRUCTIONS] = 'Select an area of interest to see if there are any related documents';
strings.es[keys.DOCS_NOT_AVAILABLE] = 'There are no documents available for this area';
strings.es[keys.DOCS_TYPE] = 'Type';
strings.es[keys.DOCS_AUTHOR] = 'Author';
strings.es[keys.DOCS_YEAR] = 'Year';
strings.es[keys.DOCS_PDF] = 'PDF';
//- Analysis
strings.es[keys.ANALYSIS_INSTRUCTION_HEADER] = 'Analyze a shape on the map';
strings.es[keys.ANALYSIS_INSTRUCTION_LIST] = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map',
  'Click on the analyze tab'
];
strings.es[keys.ANALYSIS_OR] = 'Or';
strings.es[keys.ANALYSIS_DRAW_HEADER] = 'Analyze your own shape';
//- ${drawIcon} references a variable above, do not translate
strings.es[keys.ANALYSIS_DRAW_INSTRUCTIONS] = [
  `Choose the draw tool ${drawIcon} in the toolbox`,
  'Draw a shape anywhere on the map',
  'Select the shape to run the analysis'
];
strings.es[keys.ANALYSIS_DRAW_BUTTON] = 'Start drawing';
strings.es[keys.ANALYSIS_INSTRUCTION_ADDITIONAL] = `Add additional shapes in the future by visiting the draw tool ${drawIcon}`;
strings.es[keys.ANALYSIS_SHAPEFILE_UPLOAD] = 'or drop a custom shapefile here';
strings.es[keys.ANALYSIS_SELECT_TYPE_LABEL] = 'Select Analysis:';
//- Chart Labels in the Analysis
strings.es[keys.ANALYSIS_TC_CHART_NAME] = 'Tree cover loss in Hectares';
strings.es[keys.ANALYSIS_LCC_CHART_NAME] = 'Land Cover Composition';
strings.es[keys.ANALYSIS_LC_LABELS] = ['Dense moist forest', 'Submontane forest', 'Mountain forest', 'Edaphic forest', 'Mangrove', 'Forest-savanna mosaic', 'Rural complex and young secondary forest', 'Closed to open deciduous woodland', 'Savanna woodland-Tree savanna', 'Shrubland', 'Grassland', 'Aquatic grassland', 'Swamp grassland', 'Sparse vegetation', 'Mosaic cultivated areas/vegeatation( herbaceous or shrub)', 'Agriculture', 'Irrigated agriculture', 'Bare areas', 'Artificial surfaces and associated areas', 'Water Bodies'];
strings.es[keys.ANALYSIS_IFL_LABELS] = ['Intact Forest'];
strings.es[keys.ANALYSIS_FIRES_PRE] = 'There are';
strings.es[keys.ANALYSIS_FIRES_ACTIVE] = 'active fires';
strings.es[keys.ANALYSIS_FIRES_POST] = 'in the last 7 days';
strings.es[keys.ANALYSIS_TOTAL_LOSS_LABEL] = 'Total tree cover loss';
strings.es[keys.ANALYSIS_TOTAL_LOSS_RANGE] = '(2001 - 2014):';
strings.es[keys.ANALYSIS_TOTAL_GAIN_LABEL] = 'Total tree cover gained';
strings.es[keys.ANALYSIS_TOTAL_GAIN_RANGE] = '(2001 - 2012):';
strings.es[keys.ANALYSIS_SLOPE_OPTION] = 'Option #';
strings.es[keys.ANALYSIS_RESTORATION_LC_LABELS] = [
  'No Data', 'Forestland', 'Grassland', 'Cropland', 'Wetland and Waterbodies', 'Settlement', 'Bare soil'
];
//- Group and value should not be modified, Group labels are configured below
strings.es[keys.ANALYSIS_SELECT_TYPE_OPTIONS] = [
  { label: 'Slope',
    value: analysisKeys.SLOPE,
    group: keys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Tree cover loss',
    value: analysisKeys.TC_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Total tree cover loss/gain',
    value: analysisKeys.TC_LOSS_GAIN,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover loss',
    value: analysisKeys.LC_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Biomass loss',
    value: analysisKeys.BIO_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Intact forest loss',
    value: analysisKeys.INTACT_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Active fires',
    value: analysisKeys.FIRES,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover composition',
    value: analysisKeys.LCC,
    group: keys.ANALYSIS_GROUP_OTHER
  }
];
strings.es[keys.ANALYSIS_GROUP_RESTORATION] = 'Restoration potential for';
strings.es[keys.ANALYSIS_GROUP_SLOPE] = 'Potential according to';
strings.es[keys.ANALYSIS_GROUP_OTHER] = 'Other analysis';

//- Mobile
strings.es[keys.LAYERS] = 'Layers';
strings.es[keys.DATA] = 'Data';
strings.es[keys.ANALYZE] = 'Analyze';
strings.es[keys.DOCS] = 'Docs';
strings.es[keys.MORE] = 'More';

//- Miscellaneous
strings.es[keys.CANOPY_MODAL_TEXT] = 'Adjust the minimum canopy density for tree cover and tree cover loss';
strings.es[keys.PRINT_BUTTON_LABEL] = 'Choose a print template';
strings.es[keys.PRINT_REPORT] = 'Print Report';
strings.es[keys.SUBSCRIBE] = 'Subscribe';
strings.es[keys.SEARCH] = 'Search';

//- NOTE: Portugese
strings.pt[keys.LAND_COVER_LABEL] = 'Land cover';
strings.pt[keys.ACTIVE_FIRES_LABEL] = 'Active fires';
strings.pt[keys.ACTIVE_FIRES_SUB_LABEL] = '(daily, 1km, global, NASA)';
strings.pt[keys.TREE_COVER_LABEL] = 'Tree cover';
strings.pt[keys.TREE_COVER_SUB_LABEL] = '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)';
strings.pt[keys.GAIN_LABEL] = 'Tree cover gain';
strings.pt[keys.GAIN_SUB_LABEL] = '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings.pt[keys.LOSS_LABEL] = 'Tree cover loss';
strings.pt[keys.LOSS_SUB_LABEL] = '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings.pt[keys.IFL_LABEL] = 'Intact forest loss';
strings.pt[keys.CARBON_LABEL] = 'Above ground biomass';
//- Header
strings.pt[keys.NAV_ABOUT] = 'About';
strings.pt[keys.NAV_DOWNLOAD] = 'Download Data';
strings.pt[keys.NAV_MAP_THEMES] = 'Map Themes';
strings.pt[keys.NAV_MY_GFW] = 'Log in to my GFW';
strings.pt[keys.NAV_LANGUAGE] = 'Select Language';
//- Documents
strings.pt[keys.DOCS_INSTRUCTIONS] = 'Select an area of interest to see if there are any related documents';
strings.pt[keys.DOCS_NOT_AVAILABLE] = 'There are no documents available for this area';
strings.pt[keys.DOCS_TYPE] = 'Type';
strings.pt[keys.DOCS_AUTHOR] = 'Author';
strings.pt[keys.DOCS_YEAR] = 'Year';
strings.pt[keys.DOCS_PDF] = 'PDF';
//- Analysis
strings.pt[keys.ANALYSIS_INSTRUCTION_HEADER] = 'Analyze a shape on the map';
strings.pt[keys.ANALYSIS_INSTRUCTION_LIST] = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map',
  'Click on the analyze tab'
];
strings.pt[keys.ANALYSIS_OR] = 'Or';
strings.pt[keys.ANALYSIS_DRAW_HEADER] = 'Analyze your own shape';
//- ${drawIcon} references a variable above, do not translate
strings.pt[keys.ANALYSIS_DRAW_INSTRUCTIONS] = [
  `Choose the draw tool ${drawIcon} in the toolbox`,
  'Draw a shape anywhere on the map',
  'Select the shape to run the analysis'
];
strings.pt[keys.ANALYSIS_DRAW_BUTTON] = 'Start drawing';
strings.pt[keys.ANALYSIS_INSTRUCTION_ADDITIONAL] = `Add additional shapes in the future by visiting the draw tool ${drawIcon}`;
strings.pt[keys.ANALYSIS_SHAPEFILE_UPLOAD] = 'or drop a custom shapefile here';
strings.pt[keys.ANALYSIS_SELECT_TYPE_LABEL] = 'Select Analysis:';
//- Chart Labels in the Analysis
strings.pt[keys.ANALYSIS_TC_CHART_NAME] = 'Tree cover loss in Hectares';
strings.pt[keys.ANALYSIS_LCC_CHART_NAME] = 'Land Cover Composition';
strings.pt[keys.ANALYSIS_LC_LABELS] = ['Dense moist forest', 'Submontane forest', 'Mountain forest', 'Edaphic forest', 'Mangrove', 'Forest-savanna mosaic', 'Rural complex and young secondary forest', 'Closed to open deciduous woodland', 'Savanna woodland-Tree savanna', 'Shrubland', 'Grassland', 'Aquatic grassland', 'Swamp grassland', 'Sparse vegetation', 'Mosaic cultivated areas/vegeatation( herbaceous or shrub)', 'Agriculture', 'Irrigated agriculture', 'Bare areas', 'Artificial surfaces and associated areas', 'Water Bodies'];
strings.pt[keys.ANALYSIS_IFL_LABELS] = ['Intact Forest'];
strings.pt[keys.ANALYSIS_FIRES_PRE] = 'There are';
strings.pt[keys.ANALYSIS_FIRES_ACTIVE] = 'active fires';
strings.pt[keys.ANALYSIS_FIRES_POST] = 'in the last 7 days';
strings.pt[keys.ANALYSIS_TOTAL_LOSS_LABEL] = 'Total tree cover loss';
strings.pt[keys.ANALYSIS_TOTAL_LOSS_RANGE] = '(2001 - 2014):';
strings.pt[keys.ANALYSIS_TOTAL_GAIN_LABEL] = 'Total tree cover gained';
strings.pt[keys.ANALYSIS_TOTAL_GAIN_RANGE] = '(2001 - 2012):';
strings.pt[keys.ANALYSIS_SLOPE_OPTION] = 'Option #';
strings.pt[keys.ANALYSIS_RESTORATION_LC_LABELS] = [
  'No Data', 'Forestland', 'Grassland', 'Cropland', 'Wetland and Waterbodies', 'Settlement', 'Bare soil'
];

//- Group and value should not be modified, Group labels are configured below
strings.pt[keys.ANALYSIS_SELECT_TYPE_OPTIONS] = [
  { label: 'Slope',
    value: analysisKeys.SLOPE,
    group: keys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Tree cover loss',
    value: analysisKeys.TC_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Total tree cover loss/gain',
    value: analysisKeys.TC_LOSS_GAIN,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover loss',
    value: analysisKeys.LC_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Biomass loss',
    value: analysisKeys.BIO_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Intact forest loss',
    value: analysisKeys.INTACT_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Active fires',
    value: analysisKeys.FIRES,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover composition',
    value: analysisKeys.LCC,
    group: keys.ANALYSIS_GROUP_OTHER
  }
];
strings.pt[keys.ANALYSIS_GROUP_RESTORATION] = 'Restoration potential for';
strings.pt[keys.ANALYSIS_GROUP_SLOPE] = 'Potential according to';
strings.pt[keys.ANALYSIS_GROUP_OTHER] = 'Other analysis';

//- Mobile
strings.pt[keys.LAYERS] = 'Layers';
strings.pt[keys.DATA] = 'Data';
strings.pt[keys.ANALYZE] = 'Analyze';
strings.pt[keys.DOCS] = 'Docs';
strings.pt[keys.MORE] = 'More';

//- Miscellaneous
strings.pt[keys.CANOPY_MODAL_TEXT] = 'Adjust the minimum canopy density for tree cover and tree cover loss';
strings.pt[keys.PRINT_BUTTON_LABEL] = 'Choose a print template';
strings.pt[keys.PRINT_REPORT] = 'Print Report';
strings.pt[keys.SUBSCRIBE] = 'Subscribe';
strings.pt[keys.SEARCH] = 'Search';

export { strings as default };
