var MapBuilder = function(args){

  this.init = function(constructorParams) {
    //if dojo is already loaded (aka if window.dojoConfig exists) call main.js

    //TODO: Explain that these parameters take precedence over resources, but not AGOL

    window._app = {
      cache: '#{version}',
      esri: '#{esriVersion}',
      base: '#{base}' //TODO: how is this evaluated? We are missing this! --see the logo in upper left's img src
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
    base = makePath(base);
    // Add _app.base if it is present
    // if (_app.base) { base = makePath(base, _app.base); } // --> This is fucking our basepath up!! (as a library)
    console.log(getResourcePath(location.href.replace(/\/[^/]+$/, '')));

    window.dojoConfig = {
      parseOnLoad: false,
      async: true,
      packages: [
        { name: 'root', location: getResourcePath(location.href.replace(/\/[^/]+$/, ''))},
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
        ['pickadate', 'vendor/pickadate/lib/compressed/picker.date']
      ],
      deps: ['dojo/ready'],
      callback: function () {

        require(['js/libraryMain'], function(libraryMain) { //TODO: Don't resort to module.default !!
          console.log(libraryMain);
          console.log(libraryMain.startup);
          libraryMain.default.startup();
          libraryMain.default.configureApp();
          libraryMain.default.lazyloadAssets();
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
