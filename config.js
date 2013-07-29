exports.config = {
	// See docs at https://github.com/brunch/brunch/blob/master/docs/config.md
	modules: {
		definition: false,
		wrapper: false
	},
	paths: {
		"public": 'public'
	},
	files: {
		javascripts: {
			joinTo: {
				'js/app.js': /^app/,
				'js/vendor.js': function(path) {
                    path = path.replace(/\\/g, '/');
                    switch(path) {
                        case 'vendor/scripts/brunch-JavaScriptCompiler-auto-reload.js': // auto reload script injected by brunch
                        case 'vendor/console-polyfill/index.js':

                        // jquery
                        case 'vendor/jquery/jquery.js':

                        // angular
                        case 'vendor/angular/angular.js':
                        case 'vendor/angular-resource/angular-resource.js':
                        case 'vendor/angular-cookies/angular-cookies.js':
                        case 'vendor/angular-ui-router/release/angular-ui-router.js':

                        // bootstrap
                        case 'vendor/bootstrap/dist/js/bootstrap.js':
                            return true;
                        default:
                            return false;
                    }
				},
				'js/modernizr.js': function(path) { // modernizr & respond
                    path = path.replace(/\\/g, '/');
                    switch(path) {
                        case 'vendor/respond/respond.src.js':
                        case 'vendor/modernizr/modernizr.js':
                            return true;
                        default:
                            return false;
                    }
                },
				'test/scenarios.js': /^test(\/|\\)e2e/
			},
			order: {
				before: [
                    'vendor/respond/respond.src.js',
                    'vendor/console-polyfill/index.js',

                    // jquery
                    'vendor/jquery/jquery.js',

                    // angular
                    'vendor/angular/angular.js',

                    // bootstrap
                    'vendor/bootstrap/dist/js/bootstrap.js'
				]
			}
		},
		stylesheets: {
			joinTo: {
				'css/app.css': function(path) {
                    path = path.replace(/\\/g, '/');
                    switch(path) {
                        case 'vendor/bootstrap/dist/css/bootstrap.css':
                        case 'vendor/bootstrap-glyphicons/css/bootstrap-glyphicons.css':
                            return true;
                        default:
                            if(path.indexOf('app/') === 0) {
                                return true;
                            }
                            return false;
                    }
                }
			}
		},
		templates: {
			joinTo: 'js/templates.js'
		}
	},
	plugins: {

	},

	server: {
		path: 'jst-server.js'
	},

    conventions: {
        assets: /app(\\|\/)assets(\\|\/)/
    }
};