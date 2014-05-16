'use strict';

// Declare app level module which depends on filters, and services
// var App = angular.module('app', ['ngSanitize', 'ngResource', 'ui.router']).config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
// 	$locationProvider.hashPrefix('!');
// 	$urlRouterProvider.otherwise("/users");

// 	$stateProvider.state('todo', {
// 		url: "/todo", // root route
// 		views: {
// 			"mainView": {
// 				templateUrl: "partials/todo.html",
// 				controller: 'TodoCtrl'
// 			}
// 		}
// 	}).state('view', {
// 		url: "/view",
// 		views: {
// 			"mainView": {
// 				templateUrl: "partials/partial.html",
// 				controller: 'MyCtrl'
// 			}
// 		}
// 	});

// 	
// }]);

var App = angular.module("app",['ui.router']).config(["$stateProvider","$locationProvider","$urlRouterProvider", function($stateProvider,$locationProvider,$urlRouterProvider){
	$locationProvider.hashPrefix('!');
	$urlRouterProvider.otherwise("/users");
	$stateProvider.state('users',{
		url:'/users', //root route for the application
		templateUrl: "partials/users.html",
		controller: 'UsersController',
		resolve: {
			users: function(store,constants,generator){
				//read all the existing user records and create some fake ones when entering into
				//users route. If store.readAll() returns a promise then transition will wait for it to resolve
				var users = store.readAll("user"); 
				if(users.length < constants.maxUsers){
					//Generate Fake Users
					var i = constants.fakeUserCount;
					while(i>0){
						var user = generator.generateFakeUser();
						store.create("user",user);
						i--;
					}
				}
				return store.readAll("user");
			}
		}
	})
	// Without server side support html5 must be disabled.
	return $locationProvider.html5Mode(false);	
}]);