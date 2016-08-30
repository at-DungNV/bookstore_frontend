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

bookControllers.controller('IndexController', ['$scope', '$route', '$localStorage', 
  function ($scope, $route, $localStorage) {
  }
]);

bookControllers.controller('LogoutController', ['$scope', '$route', 'AuthenticationService', 
  function ($scope, $route, AuthenticationService) {
    AuthenticationService.logout();
  }
]);

bookControllers.controller('AboutController', ['$scope', '$route', 
  function ($scope, $route) {
    
  }
]);

bookControllers.controller('LoginController', ['$scope', '$location', '$rootScope', 'AuthenticationService', '$localStorage', 
  function ($scope, $location, $rootScope, AuthenticationService, $localStorage) {
    $scope.email = 'dungnv@gmail.com';
    $scope.password = '12345678';
    var url = 'http://bookstore.me/api/authenticate';
    $scope.isShowedLogin = true;
    $scope.setShowedLogin = function (value) {
      $scope.isShowedLogin = value;
    };
    $scope.login = function () {
      AuthenticationService.login($scope.email, $scope.password, url).then(
        function(successParam) { // success callback
          // got error here, after succesfully login and logoutcannot send url immediately
          $location.path('/home');
          $localStorage.isLoggedIn = true;
          $rootScope.isLoggedIn = $localStorage.isLoggedIn;
        }, function(rejectParam) { // error callback with reason
          $location.path('/login');
        }, function(notifyParam) { // notification
          console.log("notify");
        }
      );
    }
}]);
