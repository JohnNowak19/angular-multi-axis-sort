'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:StuffContrl
 * @description
 * # StuffContrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('StuffContrl', ['$scope', '$rootScope', '$route', function ($scope, $rootScope, $route) {
    $scope.things = $route.current.$$route.things;
    $scope.selectors = $rootScope.buildSelectors( $scope.things );
  }])
;
