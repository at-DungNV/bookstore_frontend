'use strict';

var bookApp = angular.module('bookApp', [
  'bookControllers',
  'shareServices',
  'satellizer',
  'ui.router',
  'ngStorage',
  'ngResource',
  'languageService',
  'yaru22.angular-timeago'
]);
bookApp.config(['$stateProvider', '$urlRouterProvider', '$authProvider', '$httpProvider', 
  function ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {
    $stateProvider
      .state('login', {
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
var urlBase = 'http://bookstore.me';
bookApp.constant("urlArticle", urlBase+ '/api/article/:article');
bookApp.constant("urlCategory", urlBase+ '/api/category/:category');
bookApp.constant("urlAuthentication", urlBase+ '/api/authenticate');
bookApp.constant("urlENCommon", 'view/lang/en/common.json');
bookApp.constant("defaultSkippedNumber", 0);
bookApp.constant("skippedNumber", 5);
bookApp.constant("takenNumber", 5);
bookApp.constant("offsetHeight", 100);
