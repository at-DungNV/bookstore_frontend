'use strict';
var articleControllers = angular.module('articleControllers', []);

articleControllers.controller('ArticleShowController', 
  function ($scope, $stateParams, ArticleService, commonLanguage, showArticleLanguage) {
    // set language
    $scope.labelLeaveAComment = commonLanguage.labelLeaveAComment;
    $scope.buttonSubmit = commonLanguage.buttonSubmit;
    $scope.labelCreatedBy = showArticleLanguage.labelCreatedBy;
    $scope.labelPostedOn = showArticleLanguage.labelPostedOn;
    $scope.previousButton = showArticleLanguage.previousButton;
    $scope.nextButton = showArticleLanguage.nextButton;
    
    ArticleService.get({ slug : $stateParams.slug }).$promise
      .then(function (data) {
        $scope.article = data;
        console.log(data);
      })
      .catch(function (fallback) {
        $scope.labelError = commonLanguage.labelError;
      }
    );
  }
);
