var MapBuilder = function(args){
  // console.log('args', args);

  this.init = function(constructorParams) {
    console.log(constructorParams);
      //TODO: Explain that these parameters take precedence over resources, but not AGOL

    var _app = {
      cache: '#{version}',
      esri: '#{esriVersion}',
      base: '#{base}'
    };

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

    var dojoConfig = {
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
      callback: function () { //why is this not firing via a new MapBuilder?? Has the domReady already fired?!
        console.log('in callback');
        // define([
        //  'js/exampleMain'
        // ], function(exampleMain) {
        //   console.log(exampleMain);
        // });

        require(['js/exampleMain'], function(exampleMain) { //TODO: Don't resort to module.default !!
          console.log(exampleMain);
          console.log(exampleMain.startup);
          console.log('constructorParams!! ', constructorParams);
          exampleMain.default.startup(constructorParams);
          exampleMain.default.configureApp();
          exampleMain.default.lazyloadAssets();
          exampleMain.default.initializeApp(constructorParams);
        });

      }
    };


    function loadjsfile(filename) {
      // const dojoInit = basePath + filename;

      const script = document.createElement('script');
      // script.onload = function() { //This doesn't work b/c we dont have our dojo paths anymore
      //   console.log(arguments);
      //   console.log('loadddeddd');
      //   require(['/js/exampleMain.js'], function(exampleMain) {
      //     console.log(exampleMain);
      //     console.log(exampleMain.startup);
      //     console.log('constructorParams!! ', constructorParams);
      //     exampleMain.default.startup(constructorParams);
      //     exampleMain.default.configureApp();
      //     exampleMain.default.lazyloadAssets();
      //     exampleMain.default.initializeApp(constructorParams);
      //   });
      // };
      script.src = filename;
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    loadjsfile('http://my.gfw-mapbuilder.org/js/arcgis-api-mapbuilder-1.0/dojo/dojo.js');


    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  }

  this.init(args);
};

window.MapBuilder = MapBuilder;
