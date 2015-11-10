'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:fruitContrl
 * @description
 * # fruitContrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('fruitContrl', ['$scope', '$routeParams', 'communicationService', function ($scope, $routeParams, communicationService) {
   	var buildSelectors = function (things) {
      var selectors = {};
      // JSHint ignoring for unused variable '_'
      angular.forEach(things, function(attrs, _) { // jshint ignore:line
        angular.forEach(attrs, function(value, name) {
          if (!selectors[name]) { selectors[name] = {}; }
          if (!Array.isArray(value)) { value = [value];}
          angular.forEach(value, function (v) { selectors[name][v] = true; });
        });
      });

      var rv = {};
      angular.forEach(selectors, function (values, name) {
        rv[name] = Object.keys(values).sort();
      });

      return rv;
    };

    communicationService.get_data($routeParams.call_type, function(data) {
      $scope.things = data;
	    $scope.selectors = buildSelectors( $scope.things );
    });
  }])
;
