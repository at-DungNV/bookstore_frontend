'use strict';

var bookControllers = angular.module('bookControllers', [
  'articleControllers',
  'categoryControllers',
  'errorControllers',
]);

bookControllers.controller('ViewController', 
  function ($rootScope, $scope, UserService, commonLanguage, Category) {
    $scope.init = function () {
      // set language
      $scope.titlePage = commonLanguage.common.titlePage;
      $scope.labelHome = commonLanguage.common.labelHome;
      $scope.labelLoginRegister = commonLanguage.common.labelLoginRegister;
      $scope.labelPostArticleFree = commonLanguage.common.labelPostArticleFree;
      $scope.labelPostedArticles = commonLanguage.common.labelPostedArticles;
      $scope.labelProfile = commonLanguage.common.labelProfile;
      $scope.labelHistoryTransaction = commonLanguage.common.labelHistoryTransaction;
      $scope.titleWebPage = commonLanguage.common.titleWebPage;
      $scope.labelLogout = commonLanguage.common.labelLogout;
      $scope.labelEmail = commonLanguage.common.labelEmail;
      $scope.labelPhone = commonLanguage.common.labelPhone;
      $scope.labelContact = commonLanguage.common.labelContact.toUpperCase();
      $scope.labelAbout = commonLanguage.common.labelAbout;
      $scope.contentAbout = commonLanguage.common.contentAbout;
      $scope.labelCustomerServices = commonLanguage.common.labelCustomerServices;
      $scope.contentCustomerServices = commonLanguage.common.contentCustomerServices;
      $scope.labelHumanResource = commonLanguage.common.labelHumanResource;
      $scope.contentHumanResource = commonLanguage.common.contentHumanResource;
      $scope.labelAuthor = commonLanguage.common.labelAuthor;
      $scope.labelCarrer = commonLanguage.common.labelCarrer;
      $scope.labelLicense = commonLanguage.common.labelLicense;
      
      $rootScope.isLoggedIn = UserService.isLoggedIn();
      $rootScope.email = UserService.getCredentials().email;
      
      Category.query().then(function (response){
        $scope.categories = response.data;
      }, function (response) {
        $scope.labelError = commonLanguage.common.labelError;
      });
    };
    
    $scope.init();
  }
);

bookControllers.controller('HomeController', function (
  $rootScope, $scope, Article, commonLanguage, UserService, constant) {
    
    $scope.init = function () {
      // set language
      $scope.labelBuy = commonLanguage.common.labelBuy;
      $scope.labelSell = commonLanguage.common.labelSell;
      $scope.dollarCurrency = commonLanguage.homeLanguage.dollarCurrency;
      $rootScope.isLoggedIn = UserService.isLoggedIn();
      $rootScope.email = UserService.getCredentials().email;
      // process logic
      
      Article.query().then(function (response){
        $scope.articles = response.data;
        $scope.viewby = constant.maxSelectedPagination;
        $scope.totalItems = $scope.articles.length;
        $scope.currentPage = constant.defaultCurrentPage;
        $scope.itemsPerPage = $scope.viewby;
        $scope.maxSize = constant.maxSizePagination;
      }, function (response) {
        $scope.labelError = commonLanguage.common.labelError;
      });
    };
    $scope.init();
  }
);

bookControllers.controller('LogoutController', 
  function (UserService) {
    UserService.logout();
  }
);

bookControllers.controller('AboutController',  
  function ($scope, UserService) {
  }
);

bookControllers.controller('LoginController', function ($scope, $location, AuthenticationService, constant,
    commonLanguage) {
    $scope.init = function () {
      // set language
      $scope.labelSignin = commonLanguage.loginLanguage.labelSignin;
      $scope.labelForgotPassword = commonLanguage.loginLanguage.labelForgotPassword;
      $scope.labelRememberMe = commonLanguage.loginLanguage.labelRememberMe;
      $scope.labelLoginWithFacebook = commonLanguage.loginLanguage.labelLoginWithFacebook;
      $scope.labelLogin = commonLanguage.common.labelLogin;
      $scope.labelCreateAccount = commonLanguage.loginLanguage.labelCreateAccount;
      $scope.labelSignup = commonLanguage.loginLanguage.labelSignup;
      $scope.labelSignup = commonLanguage.loginLanguage.labelSignup;
      $scope.labelEmail = commonLanguage.common.labelEmail;
      $scope.labelName = commonLanguage.loginLanguage.labelName;
      $scope.labelPassword = commonLanguage.loginLanguage.labelPassword;
      $scope.labelBirthday = commonLanguage.loginLanguage.labelBirthday;
      $scope.labelAddress = commonLanguage.loginLanguage.labelAddress;
      $scope.titleSignup = commonLanguage.loginLanguage.titleSignup;
      
      // process logic
      $scope.email = 'dungnv@gmail.com';
      $scope.password = '12345678';
      $scope.isShowedLogin = true;
    };
    $scope.setShowedLogin = function (value) {
      $scope.isShowedLogin = value;
    };
      
    $scope.setShowedLogin = function (value) {
      $scope.isShowedLogin = value;
    };
    $scope.login = function () {
      AuthenticationService.login($scope.email, $scope.password, constant.urlAuthentication).then(
        function(successParam) { 
          $state.go('home');
        }, function(rejectParam) {
          $state.go('login');
          $scope.labelInvalidAccount = commonLanguage.common.labelInvalidAccount;
        }
      );
    }
    $scope.init();
});
