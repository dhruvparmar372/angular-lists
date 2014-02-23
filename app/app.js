'use strict';

// Declare app level module which depends on filters, and services
var App = angular.module('app', ['ngSanitize', 'ngResource', 'ui.router', 'oc.modal']).config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
	$locationProvider.hashPrefix('!');
	$urlRouterProvider.otherwise("/todo");

	$stateProvider.state('todo', {
		url: "/todo", // root route
		views: {
			"mainView": {
				templateUrl: "partials/todo.html",
				controller: 'TodoCtrl'
			}
		}
	}).state('view', {
		url: "/view",
		views: {
			"mainView": {
				templateUrl: "partials/partial.html",
				controller: 'MyCtrl'
			}
		}
	});

	// Without server side support html5 must be disabled.
	return $locationProvider.html5Mode(false);
}]);