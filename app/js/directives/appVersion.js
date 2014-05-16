'use strict';
/* Directives*/

// register the module with Angular
App.directive('appVersion', [ // require the 'app.service' module
	'version','service', function(version) {
		return function(scope, elm, attrs) {
			return elm.text(version);
		};
	}
]);