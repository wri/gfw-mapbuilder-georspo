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

### Contributing
Please fork off of the `develop` branch and submit your pull requests to `develop`.

### TODO
* Add Documentation
* Add some tests
* Automate the inclusion of the built ArcGIS Module
* Start looking into deploying the application in various formats
  * Deploy a built javascript file with version number in the name (hosted on CDN)
  * Deploy a built css file with version in the name (hosted on CDN)
  * Deploy a build where the resources file comes from another location (also on some CDN)
  * Deploy a build where the html file is hosted on a cdn with the resources file, with js and css files on another CDN
  * Deploy a build in Portal with all assets coming from the app
