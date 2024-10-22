const path = require( 'path' );
const fs = require( 'fs-extra' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const I18nLoaderWebpackPlugin = require( '@automattic/i18n-loader-webpack-plugin' );

// removing old build files
fs.removeSync( path.resolve( __dirname, './assets/build/' ) );
fs.removeSync( path.resolve( __dirname, './assets/blocks/' ) );

/**
 * Given a string, returns a new string with dash separators converted to
 * camelCase equivalent. This is not as aggressive as `_.camelCase` in
 * converting to uppercase, where Lodash will also capitalize letters
 * following numbers.
 *
 * @param {string} string Input dash-delimited string.
 * @return {string} Camel-cased string.
 */
function camelCaseDash( string ) {
	return string.replace( /-([a-z])/g, ( _, letter ) => letter.toUpperCase() );
}

const chunkUniqueKey = Date.now().toString();

const resolve = {
	alias: {
		'@formgent': path.resolve( __dirname, 'resources/js' ),
		'@icon': path.resolve( __dirname, 'resources/svg/icons' ),
		'@assets': path.resolve( __dirname, 'assets' ),
		'@image': path.resolve( __dirname, 'resources/images' ),
	},
};

const plugins = [
	...defaultConfig[ 0 ].plugins.reduce( ( acc, plugin ) => {
		if (
			plugin.constructor.name !== 'DependencyExtractionWebpackPlugin' &&
			plugin.constructor.name !== 'RtlCssPlugin'
		) {
			acc.push( plugin );
		}
		return acc;
	}, [] ),
	new I18nLoaderWebpackPlugin( {
		textdomain: 'formgent',
		loaderModule: 'formgent/i18n',
	} ),
	new DependencyExtractionWebpackPlugin( {
		requestToExternal( request ) {
			if (
				'@formgent/modules' === request ||
				'@formgent/components' === request ||
				'@formgent/hooks' === request ||
				'formgent/i18n' === request
			) {
				return [
					'formgent',
					camelCaseDash( request.split( '/' )[ 1 ] ),
				];
			}
		},
		requestToHandle( request ) {
			if (
				'@formgent/modules' === request ||
				'@formgent/components' === request ||
				'@formgent/hooks' === request ||
				'formgent/i18n' === request
			) {
				return `formgent/${ camelCaseDash(
					request.split( '/' )[ 1 ]
				) }`;
			}
		},
	} ),
];

const moduleConfig = {
	...defaultConfig[ 0 ].module,
	rules: [
		...defaultConfig[ 0 ].module.rules.filter(
			( rule ) => rule.type !== 'asset/resource'
		),
		{
			test: /\.(bmp|png|jpe?g|gif|webp)$/i,
			type: 'asset/resource',
			generator: {
				filename: 'images/[name][ext]',
			},
		},
	],
};

module.exports = [
	{
		...defaultConfig[ 0 ],
		output: {
			...defaultConfig[ 0 ].output,
			path: path.resolve( __dirname, './assets/blocks/' ),
		},
		module: moduleConfig,
		plugins,
		resolve,
	},
	{
		...defaultConfig[ 0 ],
		module: moduleConfig,
		entry: {
			// 'js/frontend/FormSubmission/index':
			// 	'./resources/js/frontend/pages/FormSubmission/index.js',
			'js/notification': './resources/js/components/Notification.js',
			'css/notification': './resources/js/components/notification.scss',
			'js/elementor': './resources/js/elementor.js',
			'js/admin': './resources/js/admin/index.js',
			'js/modules': './resources/js/modules/index.js',
			'js/components': './resources/js/components/index.js',
			'css/app': './resources/sass/app.scss',

			/**
			 * Block scripts
			 */
			'js/blocks-editor': './resources/blocks/editor.js',
			'css/blocks-frontend': './resources/blocks/frontend.scss',
			'css/blocks-editor': './resources/blocks/editor.scss',
			'js/i18n-loader': {
				import: './resources/js/i18n-loader.js',
				library: {
					name: [ 'wp', 'formgent18nLoader' ],
					type: 'window',
				},
			},
		},
		output: {
			...defaultConfig[ 0 ].output,
			path: path.resolve( __dirname, './assets/build/' ),
			filename: '[name].js',
			chunkFilename: 'chunk/[name].js?ver=' + chunkUniqueKey,
		},
		plugins: plugins.reduce( ( acc, plugin ) => {
			if ( plugin.constructor.name !== 'CopyPlugin' ) {
				acc.push( plugin );
			}
			return acc;
		}, [] ),
		resolve,
	},
	{
		...defaultConfig[ 1 ],
		entry: {
			'js/blocks-frontend': './resources/blocks/frontend.js',
		},
		output: {
			...defaultConfig[ 1 ].output,
			path: path.resolve( __dirname, './assets/build/' ),
			filename: '[name].js',
			chunkFilename: '[name].js?ver=' + chunkUniqueKey,
		},
		plugins: defaultConfig[ 1 ].plugins.reduce( ( acc, plugin ) => {
			if ( plugin.constructor.name !== 'RtlCssPlugin' ) {
				acc.push( plugin );
			}
			return acc;
		}, [] ),
	},
];
