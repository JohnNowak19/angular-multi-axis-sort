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
      communicationService.get_data($routeParams.call_type, function(data) {
        $scope.things = data;
  	    $scope.selectors = {
          track: [
            'Large', 'Medium', 'Small'
          ],
          ubarea: [
            'Blue', 'Green', 'Red', 'Yellow'
          ]
        };
      });
    }
  ]);