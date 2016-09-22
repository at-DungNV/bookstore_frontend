'use strict';
var errorControllers = angular.module('errorControllers', []);

errorControllers.controller('PageNotFoundController', function ($scope, commonLanguage) {
    $scope.init = function () {
      $scope.label404 = commonLanguage.errorLanguage.label404;
      $scope.content404 = commonLanguage.errorLanguage.content404;
      $scope.labelPageNotFound = commonLanguage.errorLanguage.labelPageNotFound;
      $scope.buttonGoHome = commonLanguage.common.buttonGoHome;
      $scope.buttonContactUs = commonLanguage.common.buttonContactUs;
    };
    $scope.init();
  }
);
errorControllers.controller('ServerErrorController', function ($scope, commonLanguage) {
    $scope.init = function () {
      $scope.label500 = commonLanguage.errorLanguage.label500;
      $scope.content500 = commonLanguage.errorLanguage.content500;
      $scope.labelServerError = commonLanguage.errorLanguage.labelServerError;
      $scope.buttonGoHome = commonLanguage.common.buttonGoHome;
      $scope.buttonContactUs = commonLanguage.common.buttonContactUs;
    }
    $scope.init();
  }
);
