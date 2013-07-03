'use strict';
var App;

// Declare app level module which depends on filters, and services
App = angular.module('app', ['ngCookies', 'ngResource', 'app.controllers', 'app.directives', 'app.filters', 'app.services']);

App.config([
	'$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, config) {
		$routeProvider.when('/todo', {
			templateUrl: '/partials/todo.html',
			controller: 'TodoCtrl'
		}).when('/view1', {
				templateUrl: '/partials/partial1.html',
				controller: 'AppCtrl'
			}).when('/view2', {
				templateUrl: '/partials/partial2.html',
				controller: 'AppCtrl'
			}).otherwise({ // Catch all
				redirectTo: '/todo'
			});
		// Without server side support html5 must be disabled.
		return $locationProvider.html5Mode(false);
	}
]);