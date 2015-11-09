'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LargeCtrl
 * @description
 * # LargeCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('LargeCtrl', ['$scope', '$rootScope', '$route', function ($scope, $rootScope, $route) {
    $scope.things = $route.current.$$route.things;
    $scope.selectors = $rootScope.buildSelectors( $scope.things );
  }])
;
