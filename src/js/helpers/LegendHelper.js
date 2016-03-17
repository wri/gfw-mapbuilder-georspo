import Legend from 'esri/dijit/Legend';

export default (parameters, id) => {
  let legend = new Legend(parameters, id);
  legend.startup();
  return legend;
}
