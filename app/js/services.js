'use strict';

var shareServices = angular.module('shareServices', []);

shareServices.factory('ArticleService', ['$resource', 'urlArticle', function ($resource, urlArticle) {
    return $resource(urlArticle, {
        article: "@article"
      }, {
        query : {
          method : 'GET',
          params : { skippedNumber: '@skippedNumber', takenNumber: '@skippedNumber' },
          isArray: true
        }
      }
    );
}]);

shareServices.service('AuthenticationService', function ($http, $q, UserService) {
  this.login = function (email, password, urlAuthentication) {
    var deferred = $q.defer();
    return $http.post(urlAuthentication, { email: email, password: password })
      .success(function (response) {
        if (response.token) {
            // store username and token in local storage to keep user logged in between page refreshes
            UserService.setEmail(email);
            UserService.setToken(response.token);
        }
        deferred.resolve(response);
      })
      .error(function (response) {
        deferred.reject(response);
      }
    );
  }
});

shareServices.factory("UserService", function($window, $location) {
  return {
    setEmail: function(email) {
      $window.localStorage && $window.localStorage.setItem('email', email);
      return this;
    },
    getEmail: function() {
      return $window.localStorage && $window.localStorage.getItem('email');
    },
    setToken: function(token) {
      $window.localStorage && $window.localStorage.setItem('token', token);
      return this;
    },
    getToken: function() {
      return $window.localStorage && $window.localStorage.getItem('token');
    },
    logout : function () {
      delete $window.localStorage.email;
      delete $window.localStorage.token;
      $location.path('/login');
    },
    isLoggedIn : function () {
      return $window.localStorage.email ? true : false;
    }
  };
});

shareServices.factory("LazyLoadingService", function($window) {
  return {
    setSkippedNumber: function(skippedNumber) {
      $window.localStorage && $window.localStorage.setItem('skippedNumber', skippedNumber);
      return this;
    },
    getSkippedNumber: function() {
      return $window.localStorage && $window.localStorage.getItem('skippedNumber');
    },
    setTakenNumber: function(takenNumber) {
      $window.localStorage && $window.localStorage.setItem('takenNumber', takenNumber);
      return this;
    },
    getTakenNumber: function() {
      return $window.localStorage && $window.localStorage.getItem('takenNumber');
    }
  };
});
