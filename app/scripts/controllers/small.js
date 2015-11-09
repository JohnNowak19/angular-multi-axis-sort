'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:SmallCtrl
 * @description
 * # SmallCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('SmallCtrl', ['$scope', '$rootScope', '$route', function ($scope, $rootScope, $route) {
    $scope.things = $route.current.$$route.things;
    $scope.selectors = $rootScope.buildSelectors( $scope.things );
  }])
;
