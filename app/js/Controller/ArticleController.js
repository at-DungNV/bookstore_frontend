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

articleControllers.controller('ArticleCreateController', 
  function ($scope, $stateParams, CategoryService, CityService) {
    CategoryService.query().$promise
      .then(function (data) {
        $scope.categories = data;
      })
      .catch(function (fallback) {
        $scope.labelError = commonLanguage.labelError;
      }
    );
    CityService.query().$promise
      .then(function (data) {
        $scope.cities = data;
      })
      .catch(function (fallback) {
        $scope.labelError = commonLanguage.labelError;
      }
    );
    $scope.submit = function () {
      console.log("ten" +$scope.name);
      console.log("email" +$scope.email);
      console.log("phone" +$scope.phone);
      console.log("address" +$scope.address);
      console.log("selectedCategory " +$scope.selectedCategory.name);
      console.log("selectedCity " +$scope.selectedCity.name);
      console.log("type" +$scope.type);
      console.log("title" +$scope.title);
      console.log("content" +$scope.content);
      console.log("price" +$scope.price);
      console.log("image " +$scope.images);
      
    }
  }
);
