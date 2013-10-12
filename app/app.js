'use strict';

// Declare app level module which depends on filters, and services
var App = angular.module('app', ['ngCookies', 'ngResource', 'ui.router'])
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/todo");

        $stateProvider.state('todo', {
            url: "/todo", // root route
            views: {
                "mainView": {
                    templateUrl: "partials/todo.html",
                    controller: 'TodoCtrl'
                }
            }
        }).state('view1', {
                url: "/view1",
                views: {
                    "mainView": {
                        templateUrl: "partials/partial1.html",
                        controller: 'MyCtrl1'
                    }
                }
            }).state('view2', {
                url: "/view2",
                views: {
                    "mainView": {
                        templateUrl: "partials/partial2.html",
                        controller: 'MyCtrl2'
                    }
                }
            });

        // Without server side support html5 must be disabled.
        return $locationProvider.html5Mode(false);
    }]);