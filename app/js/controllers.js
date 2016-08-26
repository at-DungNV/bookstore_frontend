'use strict';

var bookControllers = angular.module('bookControllers', [
  'ngRoute'
]);

bookControllers.controller('HomeController', ['$scope', '$route', 'myHttp', 
  function ($scope, $route, myHttp) {
    myHttp.index('http://bookstore.me/api/articles').then(
      function(successParam) { // success callback
        $scope.articles = successParam.data;
      }, function(rejectParam) { // error callback with reason
        console.log("rejected");
      }, function(notifyParam) { // notification
        console.log("notify");
      }
    );
  }
]);

bookControllers.controller('IndexController', ['$scope', '$route', 'myHttp', 
  function ($scope, $route, myHttp) {
    
  }
]);

bookControllers.controller('AboutController', ['$scope', '$route', 'myHttp', 
  function ($scope, $route, myHttp) {
    myHttp.index('http://bookstore.me/api/users').then(
      function(successParam) { // success callback
        $scope.data = successParam.data;
      }, function(rejectParam) { // error callback with reason
        console.log("rejected");
      }, function(notifyParam) { // notification
        console.log("notify");
      }
    );
}]);

bookControllers.controller('LoginController', ['$scope', '$route',
  function ($scope, $route) {
    $scope.isShowedLogin = true;
    $scope.setShowedLogin = function (value) {
      $scope.isShowedLogin = value;
    };
}]);
