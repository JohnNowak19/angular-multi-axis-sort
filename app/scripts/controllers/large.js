'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LargeCtrl
 * @description
 * # LargeCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('LargeCtrl', [ '$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.things = {
      'Blue Coconut': { size: 'Large', color: 'Blue' },
      'Pomegrante': { size: 'Large', color: 'Red' },
      'Cocunut': { size: 'Large', color: 'Green' },
      'Apple': { size: 'Medium', color: 'Red' },
      'Banana': { size: 'Medium', color: 'Yellow' },
      'Blueberry': { size: 'Small', color: 'Blue' },
      'Cherry': { size: 'Small', color: 'Red' },
    };

    $scope.selectors = $rootScope.buildSelectors($scope.things);
  }])
;
