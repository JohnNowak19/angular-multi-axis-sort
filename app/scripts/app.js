'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('angularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'displayor', 'selector'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/small', {
        templateUrl: 'views/display.html',
        controller: 'SmallCtrl',
        controllerAs: 'small'
      })
      .when('/large', {
        templateUrl: 'views/display.html',
        controller: 'LargeCtrl',
        controllerAs: 'large'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(['$rootScope', '$location', function($rootScope, $location){
    var path = function() { return $location.path();};
    $rootScope.$watch(path, function(newVal){
      $rootScope.activetab = newVal;
    });
  }])
;
