'use strict';

var bookControllers = angular.module('bookControllers', [
  'ngRoute'
]);

bookControllers.controller('HomeController', ['$scope', '$route',
  function ($scope, $route) {
    // Controller method for Home
    $scope.template = $route.current.templateUrl;
}]);

bookControllers.controller('AboutController', ['$scope', '$route', 'myHttp', 
  function ($scope, $route, myHttp) {
    // Controller method for About
    $scope.template = $route.current.templateUrl;
    // $scope.data = myHttp.getAllPeople('../data/people.json');
    
    // myHttp.getAllPeople().then(function(data) {
    //   $scope.data = data;
    // }, function() {
    //   $scope.error = 'unable to get the ponies';
    // });
    myHttp.getAllPeople('../data/people.json').then(function(data) {
      $scope.data = data;
    });
    
}]);

bookControllers.controller('LoginController', ['$scope', '$route',
  function ($scope, $route) {
    // Controller method for Home
    $scope.template = $route.current.templateUrl;
}]);