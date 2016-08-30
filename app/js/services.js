'use strict';

var shareServices = angular.module('shareServices', []);

shareServices.factory('ArticleService', ['$resource', '$localStorage', function ($resource, $localStorage) {
    return $resource('http://bookstore.me/api/article/:article', 
      {
        article: "@article"
      },
      {
        query: {
          method: "GET",
          isArray: true,
          headers: {
            "Authorization": $localStorage.currentUser.token
          }
        }
      }
    );
}]);

shareServices.service('AuthenticationService', ['$http', '$q', '$localStorage', '$location', '$rootScope', function ($http, $q, $localStorage, $location, $rootScope) {
  this.login = function (email, password, url) {
    var deferred = $q.defer();
    return $http.post(url, { email: email, password: password })
      .success(function (response) {
        if (response.token) {
            // store username and token in local storage to keep user logged in between page refreshes
            $localStorage.currentUser = { email: email, token: response.token };
            // add jwt token to auth header for all requests made by the $http service
            $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
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
    $localStorage.isLoggedIn = false;
    $rootScope.isLoggedIn = $localStorage.isLoggedIn;
    $location.path('/login');
  }
}]);
