# GFW Map Builder ArcGIS Online Template
> Template for the GFW Map Builder that will be available through ArcGIS Online.

### Getting Started
Before you can begin, make sure you have [node.js](https://nodejs.org/en/).

Install all the front end dependencies.
```shell
npm install
```

Start the server and then the app will be served at [http://localhost:3000](http://localhost:3000).
```shell
npm start
```

### Generating a build
> You will need node.js installed for these steps

It is recommended that you generate a new optimized build of the JSAPI and publish it to the cloud. There is a helper script that will generate a `arcgis-modules.txt` file that lists all the esri dependencies, upload that to `jso.arcgis.com`. To run the helper script, run the following command in terminal.

```shell
node arcgis-module-lister
```

Once you upload the module list and publish a build to CDN, swap the URL in index.jade and then proceed with the following command to generate a build to the `dist` directory.

```shell
npm run dist
```

### Configuring
This application has a general `src/js/config.js` file that contains things controlled by the developers.  There is also a `resources.js` file which contains more configurations.  However the Resources file contains configurations that are controlled via ArcGIS Online or whomever may be deploying the application.  You can control things like the layers in the accordion, their source urls, their order on the map  and in the UI, service urls (print, geometry, map, etc.), which layers to include in the analysis, and even the configurations for slope analysis and other aspects of the analysis.  Anything that needs to be controlled from ArcGIS Online or the person deploying it, should be placed in `resources.js`.

#### Configuring Layers and Accordions
The layers and the accordion are now more easily configurable via the `resources.js` file. Layers that you want to appear on the map but not in the accordion should be placed under `extraLayers`.  The configuration structure is as follows:

```javascript
GROUP_LCD: {
  order: 1,
  label: {
    en: 'Land Cover Dynamics',
    fr: 'Evolution de l\'occupation des sols',
    es: 'Dinámica de la Cobertura del Suelo',
    pt: 'Land Cover Dynamics',
    id: 'Land Cover Dynamics',
    zh: '土地覆盖动态数据'
  },
  layers: [{
    order: 1,
    id: 'TREE_COVER_LOSS',
    type: 'image',
    url: 'http://gis-treecover.wri.org/arcgis/rest/services/ForestCover_lossyear_density/ImageServer',
    technicalName: 'tree_cover_loss',
    legendLayer: 0,
    colormap: [[1, 219, 101, 152]],
    inputRange: [1, 15],
    outputRange: [1],
    label: {
      en: 'Tree cover loss',
      fr: 'Perte en couvert arboré',
      es: 'Pérdida de la cobertura arbórea',
      pt: 'Tree cover loss',
      id: 'Tree cover loss',
      zh: '森林覆盖损失'
    },
    sublabel: {
      en: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      fr: '(annuel, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      es: '(anual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      pt: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      id: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
      zh: '(每年更新, 30米, 全球覆盖, 汉森/马里兰大学/谷歌/美国地质测量局(USGS)/美国宇航局(NASA))'
    }
  }]
}
```

Properties for the groups and layers are described in detail in the resources file, but here is a brief description of what you see above as well:

* `GROUP_LCD` - Unique key to contain all the properties for the group, this is an accordion section in the layer panel
  * `order` - Order that the group will appear in the UI and the order in which it's layers will appear on the map. An `order` of 1 will be above an `order` of 2 in the UI and the map.  **MINIMUM** is 1, value of 0 may result in layers being placed under the basemap.
  * `label` - Object containing keys for various languages, this is the label in the UI for the accordion section.
  * `layers` - an array of layers that will appear in this accordion.  Some layers have custom configurations and some support different options for different types of layers.
    * `order` - order of the layer in the accordion and on the the map. This order is relative to this section. Layers more or less will be stacked similar to how they appear in the UI with the exception of feature/graphics layers as they always go on top. In the below example, layer A will be on top even though it has a higher order because the group it belongs to has a lower order, meaning the group and the layer will appear first:
      * Group 1 - order 1
        * Layer A - order 5
      * Group 2 - order 2
        * Layer B - order 1
    * `id` - Unique ID for the layer, this must be unique across the whole app, not just the group
    * `type` - Type of layer. Currently `tiled`, `webtiled`, `image`, `dynamic`, `feature`, `graphic`, `glad`, and `terra` are supported types.
    * `visible` - default layer visibility.  Default value if not supplied is false.
    * `url` - required for all layers except graphics layers.
    * `technicalName` - key for this layer to retrieve metadata about it from the GFW metadata API
    * `legendLayer` - If this layer has no legend or a bad legend, and has an alternative one available here, `http://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer`, you can provide the layer id of it's legend here so the app can pull that legend in.
    * `layerIds` - An array of layer ids for dynamic layers, should look like this: `[0, 1, 2, 3]` or `[1]`.
    * `label` - An object of keys representing various languages, this is the label that shows in the UI
    * `sublabel` -  An object of keys representing various languages, this is the sublabel that shows in the UI
    * `popup` - See below for more explanation and an example of how to use this

#### Configuring Popups for layers not in Webmaps
This is currently only supported for dynamic layers and feature layers.  A popup configuration has some elements it must contain to keep the styling looking appropriate and they are outlined below. Here is an example layer configuration that contains a popup configuration (NOTE the addition of `popup` at the bottom):

```javascript
order: 6,
id: 'ACTIVE_FIRES',
type: 'dynamic',
url: 'http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer',
technicalName: 'noaa18_fires',
layerIds: [0, 1, 2, 3],
label: {
  ...
},
sublabel: {
  ...
},
popup: {
  title: {
    en: 'Active Fires'
  },
  content: {
    en: [
      {'label': 'Brightness', 'fieldExpression': 'BRIGHTNESS'},
      {'label': 'Confidence', 'fieldExpression': 'CONFIDENCE'},
      {'label': 'Latitude', 'fieldExpression': 'LATITUDE'},
      {'label': 'Longitude', 'fieldExpression': 'LONGITUDE'},
      {'label': 'Acquisition Date', 'fieldExpression': 'ACQ_DATE:DateString(hideTime:true)'},
      {'label': 'Acquisition Time', 'fieldExpression': 'ACQ_TIME'}
    ]
  }
}
```
This way you can add more languages and also use modifiers on fields.  `fieldExpression` get's used in the same manner the JSAPI uses fields for popup content, in a string like so: '${BRIGHTNESS}'.  This is why we can use modifiers like `ACQ_DATE:DateString(hideTime:true)`.  You can see a list of available modifiers here: [Format info window content](https://developers.arcgis.com/javascript/3/jshelp/intro_formatinfowindow.html)

### Strings
This portion refers to how a developer could add some  new strings, if you are looking at adding translations, see [Translations](#translations) below.  The convention to add new strings to the application is to add them in each language, in `src/js/languages.js`.  The name should be all uppercase separated by an underscore. For example, a link in the navigation bar for the word about would be added four times, once for each supported language in their appropriate section, like so:

```javascript
strings.en.NAV_ABOUT = 'About';
...
strings.fr.NAV_ABOUT = 'About';
...
strings.es.NAV_ABOUT = 'About';
...
strings.pt.NAV_ABOUT = 'About';
```

Then in your components, or any other part of the code, simply import the languages module, get the current language from React's context(or pass it out from a component if needs be).

```javascript
import text from 'js/languages';

export default class MyComponent extends Component {
  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  render () {
    const {language} = this.context;

    return (
      <div>
        {text[language].NAV_ABOUT}
      </div>
    );
  }
}

```

### Translations
If you are adding or fixing translations.  The strings used in the application can be found in two locations.  The majority of them will be in the `src/js/languages.js` file.  They are prefixed by the two digit country code.  Add the appropriate translation in the correct language section.  You may see something like this:

```javascript
strings.en.DATA = 'Data'; //English
...
strings.fr.DATA = 'Data'; // French
...
strings.es.DATA = 'Data'; // Spanish
...
strings.pt.DATA = 'Data'; // Portuguese
```

The other location is the `src/js/resources.js` file.  There are `layers` and `basemaps` each with subsections for each of the four languages.  In each subsection is an array or objects containing the layer configuration.  Be careful what you change in here, the only three things related to labels are `label`, `sublabel`, and `group`. The `group` refers to the name on the accordion, it needs to be the same as the other layers in the same group (they are linked by a `groupKey`).

### Deployment
[See DEPLOY.md](DEPLOY.md)

### Adding Analysis
[See ANALYSIS.md](ANALYSIS.md)

### Contributing
[See CONTRIBUTING.md](CONTRIBUTING.md)
