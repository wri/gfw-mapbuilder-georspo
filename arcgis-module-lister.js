/**
* Create a arcgis-modules.txt file that lists all the esri dependencies used in this application
* That .txt file can then be uploaded to jso.arcgis.com to generate an optimized API bundle
*/

var madge = require('madge');
var path = require('path');
var fs = require('fs');

var config = {
  root: path.join(__dirname, 'build/js'),
  patterns: [/esri\//, /dojo\//, /dijit\//],
  output: 'arcgis-modules.txt'
};

var deps = [];

//- Matching function to remove non esri related modules
var matches = function matches (module) {
  return config.patterns.some(function (pattern) {
    return pattern.test(module);
  });
};
//- Generate the dependency tree
var tree = madge(config.root, { format: 'amd' }).tree;
//- Generate an array of modules
Object.keys(tree).forEach(function (key) {
  deps = deps.concat(tree[key].filter(matches));
});

//- Deduplicate module list
var modules = [];
deps.forEach(function (module) {
  if (modules.indexOf(module) === -1) {
    modules.push(module);
  }
});

fs.writeFileSync(config.output, modules.join('\n'));
