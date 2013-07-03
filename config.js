exports.config = {
	// See docs at https://github.com/brunch/brunch/blob/master/docs/config.md
	modules: {
		definition: false,
		wrapper: false
	},
	paths: {
		"public": '_public'
	},
	files: {
		javascripts: {
			joinTo: {
				'js/app.js': /^app/,
				'js/vendor.js': function(path) {
					return path.indexOf("vendor") !== -1 && path.indexOf("modernizr") === -1;
				},
				'js/modernizr.js': function(path) { // modernizr & respond
					return path.indexOf('respond') !== -1 || path.indexOf("modernizr") !== -1;
				},
				'test/scenarios.js': /^test(\/|\\)e2e/
			},
			order: {
				before: [
					'vendor/scripts/respond.js',
					'vendor/scripts/console-helper.js',
					'vendor/scripts/jquery.js',
					'vendor/scripts/angular/angular.js',
					'vendor/scripts/angular/angular-resource.js',
					'vendor/scripts/angular/angular-cookies.js',

					// make sure bootstrap order is correct
					'vendor/scripts/bootstrap/bootstrap-transition.js',
					'vendor/scripts/bootstrap/bootstrap-alert.js',
					'vendor/scripts/bootstrap/bootstrap-modal.js',
					'vendor/scripts/bootstrap/bootstrap-dropdown.js',
					'vendor/scripts/bootstrap/bootstrap-scrollspy.js',
					'vendor/scripts/bootstrap/bootstrap-tab.js',
					'vendor/scripts/bootstrap/bootstrap-tooltip.js',
					'vendor/scripts/bootstrap/bootstrap-popover.js',
					'vendor/scripts/bootstrap/bootstrap-button.js',
					'vendor/scripts/bootstrap/bootstrap-collapse.js',
					'vendor/scripts/bootstrap/bootstrap-carousel.js',
					'vendor/scripts/bootstrap/bootstrap-typeahead.js',
					'vendor/scripts/bootstrap/bootstrap-affix.js'
				]
			}
		},
		stylesheets: {
			joinTo: {
				'css/app.css': /^(app|vendor)/
			}
		},
		templates: {
			joinTo: 'js/templates.js'
		}
	},
	plugins: {
		jade: {
			pretty: true // Adds pretty-indentation whitespaces to output (false by default)
		}
	},

	server: {
		path: 'jst-server.js'
	}
};