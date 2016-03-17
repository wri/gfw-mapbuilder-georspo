/*eslint-disable*/
({
	baseUrl: 'build',
	paths: {
		// Empty Modules/Aliases
		'dojo': 'empty:',
		'esri': 'empty:',
		'dijit': 'empty:',
		'dojox': 'empty:',
    'resources': 'js/resources',
    // 'alt': 'vendor/alt/dist/alt.min',
    // 'react': 'vendor/react/react.min',
    // 'react-dom': 'vendor/react/react-dom.min',
    'babel-polyfill': 'vendor/babel-polyfill/browser-polyfill',
		// My configured packages
    'js': 'js',
    'vendor': 'vendor',
    'utils': 'js/utils',
    'report': 'js/report',
    // 'stores': 'js/stores',
    // 'actions': 'js/actions',
    'constants': 'js/constants',
    // 'components': 'js/components',
    'helpers': 'js/helpers'
	},
	name: 'js/reportMain',
	out: 'dist/js/reportMain.js'
});
