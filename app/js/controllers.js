'use strict';

var bookControllers = angular.module('bookControllers', [
  'ngRoute'
]);

bookControllers.controller('HomeController', ['$scope', '$route', 'ArticleService', 
  function ($scope, $route, ArticleService) {
    ArticleService.query().$promise
      .then(function (data) {
        $scope.articles = data;
      })
      .catch(function (fallback) {
        $scope.articles = fallback.toUpperCase() + '!!';
      }
    );
  }
]);

bookControllers.controller('ViewController', ['$scope', 'UserService', 'LanguageService', 
  function ($scope, UserService, LanguageService) {
    $scope.isLoggedIn = UserService.isLoggedIn();
    $scope.email = UserService.getEmail();
  }
]);

bookControllers.controller('IndexController', ['$scope', '$route', '$localStorage', 
  function ($scope, $route, $localStorage) {
  }
]);

bookControllers.controller('LogoutController', ['UserService', 
  function (UserService) {
    UserService.logout();
  }
]);

bookControllers.controller('AboutController', ['$scope', '$route', 
  function ($scope, $route) {
    
  }
]);

bookControllers.controller('LoginController', ['$scope', '$location', '$rootScope', 'AuthenticationService', '$localStorage', 'urlAuthentication', 
  function ($scope, $location, $rootScope, AuthenticationService, $localStorage, urlAuthentication) {
    $scope.email = 'dungnv@gmail.com';
    $scope.password = '12345678';
    $scope.isShowedLogin = true;
    $scope.setShowedLogin = function (value) {
      $scope.isShowedLogin = value;
    };
    $scope.login = function () {
      AuthenticationService.login($scope.email, $scope.password, urlAuthentication).then(
        function(successParam) { 
          $location.path('/home');
        }, function(rejectParam) {
          $location.path('/login');
        }
      );
    }
}]);
