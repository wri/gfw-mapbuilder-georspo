# GFW Map Builder ArcGIS Online Template
> Template for the GFW Map Builder that will be available through ArcGIS Online.

### Analysis
There are several things that need to be accounted for when adding new analysis.  This document will go over all of them so you should have a good idea of how to add more analysis into the Map Builder platform. There is a brief description below with a full description to follow.

1. Add the analysis into the `js/languages.js` or `resources.js` file depedning on how configurable the analysis is, sometimes you may need to add configurations to both.
2. Add the configurations to the `js/config.js` file.
3. Add in entries to the constants file to reference this type of analysis, the constant will be used in several locations.
4. `js/utils/performAnalysis.js` is the gateway to anaylsis, it returns a promise and uses a switch statement to make a request in the `js/utils/analysisUtils.js` file.
5. The above request is made from `js/components/AnalysisPanel/Analysis.js`, when it completes, it calls `setState` with the results. In this component, there is another switch statement that will look at the type of analysis selected (the constant we defined earlier), and return a chart component.  There may be a chart component already built you can use, if not, create a new one that wraps a div and creates a chart with highcharts. The acutal chart generation code, is in the `js/utils/charts.js` file so that it can be reused in the report.
6. In the `js/report/report.js` file, if the analysis is enabled, use `js/utils/performAnalysis.js` to get the analysis and render the chart using the `js/utils/charts.js` file.


### Step 1
If the analysis is static and not configurable, you will probably just need to add strings to the languages file for the select.
