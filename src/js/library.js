var MapBuilder = function(args){

  this.init = function(constructorParams) {
    var scripts = document.getElementsByTagName('script');
    var newBase, resourcesBase;
    for (var j = 0; j < scripts.length; j++) {
      if (scripts[j].id === 'lucas1') {
        newBase = scripts[j].src;
        console.log(scripts[j]);
      }
    }
    console.log('newBase', newBase);
    if (newBase) {
      newBase = newBase.split('/js/library.js')[0];
      resourcesBase = newBase.split('library-load/')[0];
    }
    console.log('newerBase!', newBase);


    //TODO: Don't hard-code this, get it from our last url-to-lib/gfwLibName/somethingHere/

    console.log('resourcesBase!', resourcesBase);

    // console.log('src', src);
    console.log('constructorParams', constructorParams);
    //if dojo is already loaded (aka if window.dojoConfig exists) call main.js

    //TODO: Explain that these parameters take precedence over resources, but not AGOL

    window._app = {
      cache: constructorParams.version,
      esri: '#{esriVersion}',
      base: newBase //TODO: how is this evaluated? We are missing this! --see the logo in upper left's img src
    }; //these are no longer getting injected via gulp's jade-build or jade-dist tasks!

    function makePath (base, path) {
      var position = base.length - 1;
      return !path ?
        (base.indexOf('/', position) !== position ? base + '/' : base) :
        (base.indexOf('/', position) !== position ?
          base + '/' + path :
          base + path
        );
    }
    function getResourcePath (path) {
      var position = path.length - 1;
      return path.indexOf('/', position) === position ? path.slice(0, -1) : path;
    }
    // Change this to '' if _app.base is a remote url
    var base = location.href.replace(/\/[^/]+$/, '');
    // Add trailing slash if it is not present
    console.log('oldBase', base);
    console.log(base);
    // Add _app.base if it is present
    // if (window._app.base) { base = makePath(base, window._app.base); }
    if (newBase) {
      base = newBase;
      constructorParams.cssPath = makePath(base, 'css');
      constructorParams.basePath = base;
    }
    base = makePath(base);

    console.log('newesttttBase', base);

    if (!resourcesBase) {
      resourcesBase = location.href;
      //todo: make css path
    }
    console.log('This is our base Path for js!!', makePath(base, 'js'));
    console.log('This is our base Path for vendor!', makePath(base, 'vendor'));
    // console.log(makePath(base, 'js/components'));

    //TODO: We need a Different path if we are in build versus dist for root (for resources.js only):
    //if we are build, resources.js lives at root, one folder above us: js/library.js
    //if we are dist, resources.js lives at root, two folders above us: 1.1.10/js/library.js
    // --> Either way, we can't use location.href! This is the same for our example.jade's src path
    window.dojoConfig = {
      parseOnLoad: false,
      async: true,
      packages: [
        { name: 'root', location: getResourcePath(resourcesBase.replace(/\/[^/]+$/, ''))},
        { name: 'js', location: makePath(base, 'js')},
        { name: 'vendor', location: makePath(base, 'vendor')},
        { name: 'utils', location: makePath(base, 'js/utils')},
        { name: 'stores', location: makePath(base, 'js/stores')},
        { name: 'actions', location: makePath(base, 'js/actions')},
        { name: 'constants', location: makePath(base, 'js/constants')},
        { name: 'components', location: makePath(base, 'js/components')},
        { name: 'helpers', location: makePath(base, 'js/helpers')}
      ],
      aliases: [
        ['resources', 'root/resources'],
        ['alt', 'vendor/alt/dist/alt.min'],
        ['react', 'vendor/react/react'],
        ['react-dom', 'vendor/react/react-dom'],
        ['babel-polyfill', 'vendor/babel-polyfill/browser-polyfill'],
        ['jquery', 'vendor/jquery/dist/jquery.min'],
        ['picker', 'vendor/pickadate/lib/compressed/picker'],
        ['pickadate', 'vendor/pickadate/lib/compressed/picker.date'],
        ['FileSaver', 'vendor/file-saver.js/FileSaver']
      ],
      deps: ['dojo/ready'],
      callback: function () {
        console.log('innn callback');
        console.log(window);
        require(['js/libraryMain'], function(libraryMain) { //TODO: Don't resort to module.default !!
          console.log(libraryMain);
          console.log(libraryMain.default);
          console.log(libraryMain.startup);
          libraryMain.default.startup();
          libraryMain.default.configureApp(constructorParams);
          libraryMain.default.lazyloadAssets(constructorParams);
          libraryMain.default.initializeApp(constructorParams);
        });

      }
    };

    function loadjsfile(filename) {
      // const dojoInit = basePath + filename;

      const script = document.createElement('script');
      script.src = filename;
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    loadjsfile('http://my.gfw-mapbuilder.org/js/arcgis-api-mapbuilder-1.0/dojo/dojo.js');

    /*eslint-disable */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    /*eslint-enable */
  };

  this.init(args);
};

window.MapBuilder = MapBuilder;
