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
        controller: 'StuffContrl',
        controllerAs: 'small',
        things: {
          'Blue Coconut': { size: 'Large', color: 'Blue' },
          'Pomegrante': { size: 'Large', color: 'Red' },
          'Blueberry': { size: 'Small', color: 'Blue' },
          'Cherry': { size: 'Small', color: 'Red' }
        }
      })
      .when('/large', {
        templateUrl: 'views/display.html',
        controller: 'StuffContrl',
        controllerAs: 'large',
        things: {
          'Blue Coconut': { size: 'Large', color: 'Blue' },
          'Pomegrante': { size: 'Large', color: 'Red' },
          'Cocunut': { size: 'Large', color: 'Green' },
          'Apple': { size: 'Medium', color: 'Red' },
          'Banana': { size: 'Medium', color: 'Yellow' },
          'Blueberry': { size: 'Small', color: 'Blue' },
          'Cherry': { size: 'Small', color: 'Red' }
        }
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
