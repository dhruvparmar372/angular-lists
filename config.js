var path = require('path');

exports.config = {
	// See docs at https://github.com/brunch/brunch/blob/master/docs/config.md
	modules: {
		definition: false,
		wrapper: false
	},
	paths: {
		"public": 'public',
		"watched": ['app', 'vendor', 'bower_components']
	},
	files: {
		javascripts: {
			joinTo: {
				'js/app.js': /^app/,
				'js/vendor.js': function(path) {
					if(path.indexOf("vendor/scripts/")==0){	return true; }
					path = path.replace(/\\/g, '/');
					switch(path) {
						case 'bower_components/modernizr/modernizr.js':

						// jquery
						case 'bower_components/jquery/dist/jquery.js':

						// lodash
						case 'bower_components/lodash/dist/lodash.js':

						// angular
						case 'bower_components/angular/angular.js':
						case 'bower_components/angular-resource/angular-resource.js':
						case 'bower_components/angular-sanitize/angular-sanitize.js':
						case 'bower_components/angular-ui-router/release/angular-ui-router.js':
						case 'bower_components/angular-animate/angular-animate.js':

						// bootstrap
						case 'bower_components/sass-boostrap3/dist/js/bootstrap.js':
							return true;
						default:
							return false;
					}
				},
				'test/scenarios.js': /^test(\/|\\)e2e/
			},
			order: {
				before: [
					'bower_components/respond/respond.src.js',
					'bower_components/console-polyfill/index.js',

					// jquery
					'bower_components/jquery/jquery.js',

					// angular
					'bower_components/angular/angular.js',

					// bootstrap
					'bower_components/bootstrap/dist/js/bootstrap.js',

					//angular animate
					'bower_components/angular-animate/angular-animate.js',
					'vendor/scripts/prefixfree.min.js',
					'vendor/scripts/Faker.min.js',
					'vendor/scripts/moment.min.js'
				]
			}
		},
		stylesheets: {
			joinTo: {
				'css/app.css': /(^app)||^(vendor\/styles\/)/
			}
		}
	},

	server: {
		path: 'jst-server.js'
	},

	conventions: {
		assets: /app(\\|\/)assets(\\|\/)/
	},

	sourceMaps: true
};