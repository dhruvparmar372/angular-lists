'use strict';
/* Filters*/

App.filter('interpolate', [
	'version', function(version) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		};
	}
]);