'use strict';

var shareServices = angular.module('shareServices', []);

shareServices.service('myHttp', ['$http', '$q', '$localStorage', function ($http, $q, $localStorage) {
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

shareServices.service('AuthenticationService', ['$http', '$q', '$localStorage', '$location', function ($http, $q, $localStorage, $location) {
  this.login = function (email, password, url) {
    var deferred = $q.defer();
    return $http.post(url, { email: email, password: password })
      .success(function (response) {
        if (response.token) {
            // store username and token in local storage to keep user logged in between page refreshes
            $localStorage.currentUser = { email: email, token: response.token };
            // add jwt token to auth header for all requests made by the $http service
            $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
            console.log($http);
        }
        deferred.resolve(response);
      })
      .error(function (response) {
        deferred.reject(response);
      }
    );
  }
  this.logout = function () {
    delete $localStorage.currentUser;
    $http.defaults.headers.common.Authorization = '';
    $location.path('/login');
  }
}]);

shareServices.service('checkLogin', ['$localStorage', '$location', function ($localStorage, $location) {
  this.isLoggedIn = function () {
    if(!$localStorage.currentUser) {
      $location.path('/index');
    }
  }
}]);
