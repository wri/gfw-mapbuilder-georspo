# GFW Map Builder ArcGIS Online Template
> Template for the GFW Map Builder that will be available through ArcGIS Online.

### Analysis
There are several things that need to be accounted for when adding new analysis.  This document will go over all of them so you should have a good idea of how to add more analysis into the Map Builder platform. There is a brief description below with a full description to follow.

1. Add the analysis labels into the `js/languages.js` and/or `resources.js`.
  * If you added it to the resources file, you may need to add content to the `config-panels/masterPanel.json` which will allow users from ArcGIS Online (AGOL) to configure it.
2. Add the configurations to the `js/config.js` and/or `resources.js`.
3. Add in constants to reference this type of analysis, the constant will be used in several locations.
4. `js/utils/performAnalysis.js` is the gateway to anaylsis, it returns a promise and uses a switch statement to make a request in the `js/utils/analysisUtils.js` file.
5. The above request is made from `js/components/AnalysisPanel/Analysis.js`, when it completes, it calls `setState` with the results.
6. In the `js/report/report.js` file, if the analysis is enabled, use `js/utils/performAnalysis.js` to get the analysis and render the chart using the `js/utils/charts.js` file.


### 1
If the analysis is static and not configurable, add labels for all languages in the `js/languages.js` file.  If they can be configured either by AGOL or the person deploying the application, add them to the resources file. See 1-A if adding to `resources.js`.

#### 1-A
If you added the labels to the `resources.js` file, you may want to add questions to `config-panels/masterPanel.json`.  These are the questions the template will ask the user in AGOL when they use this template. It will allow them to configure the application through AGOL. Make sure the `fieldName` in the masterPanel.json matches the property defined in resources.js.  You can view the `js/template.js` to see how those values are merged.

### 2
If the analysis is static and not configurable, add configurations to the `js/config.js`. This could include bounds, rasterIds, colors for the charts, etc. If these values can be configured through AGOL or the deployer, add them to the `resources.js` and if necessary, add questions to the masterPanel.json. There are cases where configurations in the resources are not configurable through AGOL but are through the deployer.

### 3
Add in a constant to `js/constants/AnalysisConstants.js`. Something as simple as `LOSS_LAYER: 'LOSS_LAYER'`. This will be used in several switch statements and render functions to make it easier to know which type of analysis is currently selected.

### 4
Add a new case to the switch statement in `js/utils/performAnalysis.js`, where the case value is the constant we just defined. Then add the request that will get the data to `js/utils/analysisUtils.js` and use it inside the case. Just call promise.resolve with the results you get back.

### 5
In `js/components/AnalysisPanel/Analysis.js`, add another case to the switch statement in `componentDidMount` and `componentWillReceiveProps` that uses the constant defined in [3](#3). It should return a component that will contain the chart.  Charts should be created in `js/utils/charts.js` and each function should take a DOM node as the first argument and the data/options as the next. This is so that same function can be used in the report. There may be a chart function you can already use in `charts.js` so check it out before creating a new one.

### 6
In the `js/report/report.js` file, inside the `runAnalysis` function, you will see a bunch of if statements that check if a certain type of analysis is enabled.  If it is, `performAnalysis` will be run and then the charts from the `charts.js` file will render the results into a container in the file. You will need to add an extra container to `report.jade`. An example is like so: `div.results-container#terrai-alerts`. Use the results-container class as it will keep it in line with other analysis.

### 6-A
Almost all analysis can be turned on or off in the `resources.js` file, so you may need to add a case for your type of analysis and check against it in the `report.js` file using something like this:
```javascript
if (settings.myNewAnalysisType) {
  performAnalysis({
    type: 'myNewAnalysisType',
    ...
  }).then((results) => {
    charts.makeChart(someDomNode, results);
  });
} else {
  document.getElementById('someNode').remove();
}
```
You will also need to add/remove it from the `js/components/AnalysisPanel/AnalysisTypeSelect.js` component. It also uses a switch statement and returns true or false based on the setting in the resource file and this will control if it even shows up in the dropdown as a type of analysis the user can perform.

### Conclusion
If you are unsure about any parts of this, walk through the analysis process and study the many examples already in the code, they should give you an idea of how to set things up.  Analysis can include simple queries, api calls, or even complex image server analysis.
