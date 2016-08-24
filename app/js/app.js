'use strict';

// Declare our `templateApp` and its depends.
var bookApp = angular.module('bookApp', [
  'ngRoute',
  'bookControllers',
  'bookServices'
]);

bookApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);   
  // $locationProvider.html5Mode({
  //   enabled: true,
  //   requireBase: false
  // });
  $routeProvider
    .when('/home', {
      templateUrl: 'view/home.html',
      controller: 'HomeController'
    })
    .when('/about', {
      templateUrl: 'view/about.html',
      controller: 'AboutController'
    })
    .when('/login', {
      templateUrl: 'view/login.html',
      controller: 'LoginController'
    })
    .when('/index', {
      templateUrl: 'view/index.html',
      controller: 'IndexController'
    })
    .otherwise({
      redirectTo: '/index'
    });
}]);
