'use strict';

var bookServices = angular.module('bookServices', []);

bookServices.service('myHttp', ['$http', '$q', function ($http, $q) {
  this.index = function (url) {
    var deferred = $q.defer();
    return $http.get(url)
      .success(function (data) {
        deferred.resolve(data); // declare that has been solved
      })
      .error(function (data) {
        deferred.reject(data);
      }
    );
  }
}]);
