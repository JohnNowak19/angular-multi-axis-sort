'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LargeCtrl
 * @description
 * # LargeCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('LargeCtrl', [ '$scope', function ($scope) {
    $scope.selectors = {
      'Sizes': [ 'Large', 'Small' ],
      'Colors': [ 'Blue', 'Red' ],
    };

    $scope.things = {
      'Blue Coconut': { size: 'Large', color: 'Blue' },
      'Pomegrante': { size: 'Large', color: 'Red' },
      'Blueberry': { size: 'Small', color: 'Blue' },
      'Cherry': { size: 'Small', color: 'Red' },
    };
  }])
;
