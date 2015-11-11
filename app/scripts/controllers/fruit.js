'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:fruitContrl
 * @description
 * # fruitContrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('fruitContrl', [
    '$scope', '$routeParams', 'communicationService',
    function ($scope, $routeParams, communicationService) {
      communicationService.get_data($routeParams.call_type, function(rv) {
        $scope.things = rv.topics;
  	    $scope.selectors = rv.selectors;
      });
    }
  ]);