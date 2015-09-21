'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:SmallCtrl
 * @description
 * # SmallCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('SmallCtrl', ['$scope', function ($scope) {
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
