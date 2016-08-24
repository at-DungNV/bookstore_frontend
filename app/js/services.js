'use strict';

var bookServices = angular.module('bookServices', []);

bookServices.service('myHttp', ['$http', '$q', function ($http, $q) {
  
  // this.getAllPeople = function(url) {
  //   var data = $http.get(url).then(function (response) {
  //       // The then function here is an opportunity to modify the response
  //       // console.log(response);
  //       // The return value gets picked up by the then in the controller.
  //       return response.data;
  //     });
  //     // Return the promise to the controller
  //   return data;
  // };
  
  // var getAllPeople = function (url) {
  //   var defer = $q.defer();
  //   
  //   $http.get(url).then(function(response) {
  //     defer.resolve(response.data);
  //   }, function(response) {
  //     defer.reject(response);
  //   });
  // 
  //   return defer.promise;
  // };
  
  function getAllPeople (url) {
    var defer = $q.defer();
    
    $http.get(url).then(function(response) {
      defer.resolve(response.data);
    }, function(response) {
      defer.reject(response);
    });
  
    return defer.promise;
  };
}]);
