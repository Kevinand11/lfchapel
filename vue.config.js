const path = require('path')

module.exports = {
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', path.join(__dirname, 'src'))
			.set('@modules', path.join(__dirname, 'src/modules'))
			.set('@app', path.join(__dirname, 'src/application'))
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: '@import \'~@/application/assets/style/variables.scss\';'
			}
		}
	},
	pwa: {
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: './src/application/config/service-worker.js',
			importWorkboxFrom: 'local'
		},
		msTileColor: '#FFFFFF',
		manifestOptions: {
			name: 'Living Faith Chapel',
			short_name: 'LFChapel',
			start_url: '.',
			theme_color: '#D00F25',
			background_color: '#FFFFFF',
			display: 'standalone',
			orientation: 'portrait-primary',
			icons: [
				{
					'src': './img/icons/android-chrome-192x192.png',
					'sizes' :'192x192',
					'type': 'image/png'
				},
				{
					'src': './img/icons/android-chrome-512x512.png',
					'sizes': '512x512',
					'type':'image/png'
				},
				{
					'src': './img/icons/android-chrome-maskable-192x192.png',
					'sizes': '192x192',
					'type':'image/png',
					'purpose': 'maskable'
				},
				{
					'src': './img/icons/android-chrome-maskable-512x512.png',
					'sizes': '512x512',
					'type': 'image/png',
					'purpose': 'maskable'
				}
			]
		}
	}
}
