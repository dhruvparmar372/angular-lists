'use strict';
/* Directives*/

// register the module with Angular
angular.module('app.directives', ['app.services']).directive('appVersion', [ // require the 'app.service' module
	'version', function(version) {
		return function(scope, elm, attrs) {
			return elm.text(version);
		};
	}
]);