'use strict';

var bookControllers = angular.module('bookControllers', []);

bookControllers.controller('ViewController', 
  function ($scope, UserService, commonLanguage, CategoryService) {
    // set language
    $scope.titlePage = commonLanguage.titlePage;
    $scope.labelHome = commonLanguage.labelHome;
    $scope.labelLoginRegister = commonLanguage.labelLoginRegister;
    $scope.labelPostArticleFree = commonLanguage.labelPostArticleFree;
    $scope.labelPostedArticles = commonLanguage.labelPostedArticles;
    $scope.labelProfile = commonLanguage.labelProfile;
    $scope.labelHistoryTransaction = commonLanguage.labelHistoryTransaction;
    $scope.titleWebPage = commonLanguage.titleWebPage;
    $scope.labelLogout = commonLanguage.labelLogout;
    $scope.labelEmail = commonLanguage.labelEmail;
    $scope.labelPhone = commonLanguage.labelPhone;
    $scope.labelContact = commonLanguage.labelContact.toUpperCase();
    $scope.labelAbout = commonLanguage.labelAbout;
    $scope.contentAbout = commonLanguage.contentAbout;
    $scope.labelCustomerServices = commonLanguage.labelCustomerServices;
    $scope.contentCustomerServices = commonLanguage.contentCustomerServices;
    $scope.labelHumanResource = commonLanguage.labelHumanResource;
    $scope.contentHumanResource = commonLanguage.contentHumanResource;
    $scope.labelAuthor = commonLanguage.labelAuthor;
    $scope.labelCarrer = commonLanguage.labelCarrer;
    $scope.labelLicense = commonLanguage.labelLicense;
    
    // process logic
    $scope.isLoggedIn = UserService.isLoggedIn();
    $scope.email = UserService.getEmail();
    CategoryService.query().$promise
      .then(function (data) {
        $scope.categories = data;
      })
      .catch(function (fallback) {
        $scope.labelError = commonLanguage.labelError;
      }
    );
    
  }
);

bookControllers.controller('HomeController', function (
  $scope, ArticleService, commonLanguage, homeLanguage, UserService, $window, skippedNumber, takenNumber, LazyLoadingService, $timeout, defaultSkippedNumber, offsetHeight
  ) {
    // set language
    $scope.labelBuy = commonLanguage.labelBuy;
    $scope.labelSell = commonLanguage.labelSell;
    $scope.dollarCurrency = homeLanguage.dollarCurrency;
    
    // process logic
    LazyLoadingService.setSkippedNumber(defaultSkippedNumber);
    LazyLoadingService.setTakenNumber(takenNumber);
    $scope.email = UserService.getEmail();
    $scope.isLoggedIn = UserService.isLoggedIn();
    ArticleService.query({ skippedNumber: LazyLoadingService.getSkippedNumber(), takenNumber: LazyLoadingService.getTakenNumber() }).$promise
      .then(function (data) {
        $scope.articles = data;
      })
      .catch(function (fallback) {
        $scope.labelError = commonLanguage.labelError;
      }
    );
    
    // lazy loading
    angular.element($window).bind("scroll", function() {
			var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
			var body = document.body, html = document.documentElement;
			var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, 
        html.scrollHeight, html.offsetHeight);
			var windowBottom = windowHeight + window.pageYOffset;
			if (windowBottom >= docHeight - offsetHeight) {
        $scope.labelLoading = homeLanguage.labelLoading;
        $timeout(function () {
          LazyLoadingService.setSkippedNumber(parseInt(LazyLoadingService.getSkippedNumber()) + parseInt(skippedNumber));
          LazyLoadingService.setTakenNumber(parseInt(LazyLoadingService.getTakenNumber()));
          ArticleService.query({ skippedNumber: LazyLoadingService.getSkippedNumber(), takenNumber: LazyLoadingService.getTakenNumber() }).$promise
            .then(function (data) {
              $scope.articles.push.apply($scope.articles, data);
            })
            .catch(function (fallback) {
              $scope.labelError = commonLanguage.labelError;
            }
          );
          $scope.labelLoading = '';
        }, 1500);
			}
		});
    
  }
);

bookControllers.controller('LogoutController', 
  function (UserService) {
    UserService.logout();
  }
);

bookControllers.controller('AboutController',  
  function ($scope, UserService) {
    $scope.email = UserService.getEmail();
    $scope.isLoggedIn = UserService.isLoggedIn();
  }
);

bookControllers.controller('LoginController', function ($scope, $location, AuthenticationService, urlAuthentication,
    commonLanguage, loginLanguage) {
      // set language
        $scope.labelSignin = loginLanguage.labelSignin;
        $scope.labelForgotPassword = loginLanguage.labelForgotPassword;
        $scope.labelRememberMe = loginLanguage.labelRememberMe;
        $scope.labelLoginWithFacebook = loginLanguage.labelLoginWithFacebook;
        $scope.labelLogin = commonLanguage.labelLogin;
        $scope.labelCreateAccount = loginLanguage.labelCreateAccount;
        $scope.labelSignup = loginLanguage.labelSignup;
        $scope.labelSignup = loginLanguage.labelSignup;
        $scope.labelEmail = commonLanguage.labelEmail;
        $scope.labelName = loginLanguage.labelName;
        $scope.labelPassword = loginLanguage.labelPassword;
        $scope.labelBirthday = loginLanguage.labelBirthday;
        $scope.labelAddress = loginLanguage.labelAddress;
        $scope.titleSignup = loginLanguage.titleSignup;
        
        // process logic
        $scope.email = 'dungnv@gmail.com';
        $scope.password = '12345678';
        $scope.isShowedLogin = true;
        $scope.setShowedLogin = function (value) {
          $scope.isShowedLogin = value;
        };
        $scope.login = function () {
          AuthenticationService.login($scope.email, $scope.password, urlAuthentication).then(
            function(successParam) { 
              $location.path('/home');
            }, function(rejectParam) {
              $location.path('/login');
              $scope.labelInvalidAccount = commonLanguage.labelInvalidAccount;
            }
          );
        }
});
