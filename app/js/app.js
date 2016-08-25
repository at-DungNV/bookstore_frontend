'use strict';

// Declare our `templateApp` and its depends.
var bookApp = angular.module('bookApp', [
  'ngRoute',
  'bookControllers',
  'bookServices'
]);

bookApp.config(['$routeProvider', function ($routeProvider) {
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
    // .otherwise({
    //   redirectTo: '/index'
    // })
    ;
}]);
