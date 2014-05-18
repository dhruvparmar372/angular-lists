'use strict';

var App = angular.module("app",['ui.router',"ngAnimate"]).config(["$stateProvider","$locationProvider","$urlRouterProvider", function($stateProvider,$locationProvider,$urlRouterProvider){
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
					console.log("generating fake stuff");
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
	}).state("newUser",{
		url:'/user-new',
		templateUrl: "partials/new-user.html",
		controller:"NewUserController",
	}).state("showUser",{
		url:'/user/:id',
		controller:"UserController",
		templateUrl:'partials/user-show.html',
		resolve:{
			user:function($stateParams,store){
				return store.read("user",$stateParams.id)
			}
		}
	}).state("editUser",{
		url:'/edit/:id',
		controller:"EditUserController",
		templateUrl:'partials/new-user.html',
		resolve:{
			user:function($stateParams,store){
				return store.read("user",$stateParams.id)
			}
		}
	})
	// Without server side support html5 must be disabled.
	return $locationProvider.html5Mode(false);	
}]);