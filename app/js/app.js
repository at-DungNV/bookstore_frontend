'use strict';

// Declare our `templateApp` and its depends.
var bookApp = angular.module('bookApp', [
  'bookControllers',
  'shareServices',
  'satellizer',
  'ui.router',
  'ngStorage'
]);

bookApp.config(['$stateProvider', '$urlRouterProvider', '$authProvider', '$httpProvider', 
  function ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {
    $stateProvider
      .state('login', { // declare a state
          url: '/login',
          templateUrl: 'view/login.html',
          controller: 'LoginController'
      })
      .state('home', {
          url: '/home',
          templateUrl: 'view/home.html',
          controller: 'HomeController'
      })
      .state('about', {
          resolve: {
            "check" : function (checkLogin) {
              checkLogin.isLoggedIn();
            }
          },
          url: '/about',
          templateUrl: 'view/about.html',
          controller: 'AboutController'
      })
      .state('index', {
          url: '/index',
          templateUrl: 'view/index.html',
          controller: 'IndexController'
      })
      .state('logout', {
          url: '/logout',
          templateUrl: 'view/logout.html',
          controller: 'LogoutController'
      })
      ;
    $urlRouterProvider.otherwise('/login');
  }
]);
