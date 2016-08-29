'use strict';

var bookControllers = angular.module('bookControllers', [
  'ngRoute'
]);

bookControllers.controller('HomeController', ['$scope', '$route', 'myHttp', 
  function ($scope, $route, myHttp) {
    myHttp.index('http://bookstore.me/api/articles').then(
      function(successParam) { // success callback
        $scope.articles = successParam.data;
        
        console.log(successParam.data);
      }, function(rejectParam) { // error callback with reason
        console.log("rejected");
      }, function(notifyParam) { // notification
        console.log("notify");
      }
    );
  }
]);

bookControllers.controller('IndexController', ['$scope', '$route', 'myHttp', '$localStorage', 
  function ($scope, $route, myHttp, $localStorage) {
  }
]);

bookControllers.controller('LogoutController', ['$scope', '$route', 'AuthenticationService', 
  function ($scope, $route, AuthenticationService) {
    AuthenticationService.logout();
  }
]);

bookControllers.controller('AboutController', ['$scope', '$route', 'myHttp', 
  function ($scope, $route, myHttp) {
    // myHttp.index('http://bookstore.me/api/users').then(
    //   function(successParam) { // success callback
    //     $scope.data = successParam.data;
    //   }, function(rejectParam) { // error callback with reason
    //     console.log("rejected");
    //   }, function(notifyParam) { // notification
    //     console.log("notify");
    //   }
    // );
  }
]);

bookControllers.controller('LoginController', ['$scope', '$location', '$rootScope', '$auth', '$state', 'AuthenticationService', 
  function ($scope, $location, $rootScope, $auth, $state, AuthenticationService) {
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
        }, function(rejectParam) { // error callback with reason
          $location.path('/login');
        }, function(notifyParam) { // notification
          console.log("notify");
        }
      );
    }
}]);
