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

#### How the build works
> If you need to configure the build or update the process for how it works, read this section

The build can work and run right out of the `dist` folder which is generated when you run `npm run dist`.  However, there are some additional methods for deploying to allow greater flexibility and customization.  The current output looks something like this:
```javascript
|- index.html
|- report.html
|- resources.js
|- '1.0.0' // Or whatever the version number is
|  |- 'css'
|  |  |- app.css
|  |- 'js'
|  |  |- main.js
|  |  |- reportMain.js
|  |- 'vendor'
|  |  |- 'vendor libs here...'
```
The `index.html` and `report.html` have an option to change where to load the base versioned folder from.  As previously said, it will by default load from whatever version the latest build is on from the folder in dist.  If you want to deploy those resources to a different server, you can do so and change the references in the html files with these two steps.
1. In `index.html` and `report.html`, search for _app and you should see something like this: `var _app={cache:"0.1.26",esri:"3.16",base:"0.1.26"},`. Change base here to your remote path, something like this for example: 'http://s3.amazonaws.com/gfw-mapbuilder/0.1.26'. This would make that line look like this: ``var _app={cache:"0.1.26",esri:"3.16",base:"http://s3.amazonaws.com/gfw-mapbuilder/0.1.26"},``
2. Next you need to set the base variable, different from _app.base, and set it to "", this appears immediately after the above line. Example of original setting: `var _app={cache:"0.1.26",esri:"3.16",base:"0.1.26"},base=location.href.replace(/\/[^\/]+$/,"");`, example of new setting: `var _app={cache:"0.1.26",esri:"3.16",base:"http://s3.amazonaws.com/gfw-mapbuilder/0.1.26"},base='';`

### Configuring
This application has a general `src/js/config.js` file that contains things controlled by the developers.  There is also a `resources.js` file which contains more configurations.  However the Resources file contains configurations that are controlled via ArcGIS Online or whomever may be deploying the application.  You can control things like the layers in the accordion, their source urls, service urls (print, geometry, map, etc.), which layers to include in the analysis, and even the configurations for slope analysis and other aspects of the analysis.  Anything that needs to be controlled from ArcGIS Online or the person deploying it, should be placed in `resources.js`.

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

### Contributing
Please fork off of the `develop` branch and submit your pull requests to `develop`.  Make sure `npm test` passes which will do a simple eslint test on your src code.
