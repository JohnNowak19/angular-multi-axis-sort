'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:SmallCtrl
 * @description
 * # SmallCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('SmallCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.things = {
      'Blue Coconut': { size: 'Large', color: 'Blue' },
      'Pomegrante': { size: 'Large', color: 'Red' },
      'Blueberry': { size: 'Small', color: 'Blue' },
      'Cherry': { size: 'Small', color: 'Red' },
    };

    $scope.selectors = $rootScope.buildSelectors($scope.things);
  }])
;
