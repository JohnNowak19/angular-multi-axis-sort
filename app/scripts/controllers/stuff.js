'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:StuffContrl
 * @description
 * # StuffContrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('StuffContrl', ['$scope', '$routeParams', 'myThingsService', function ($scope, $routeParams, myThingsService) {
   	var buildSelectors = function (things) {
      var selectors = {};
      // JSHint ignoring for unused variable '_'
      angular.forEach(things, function(attrs, _) { // jshint ignore:line
        angular.forEach(attrs, function(value, name) {
          if (!selectors[name]) { selectors[name] = {}; }
          selectors[name][value] = true;
        });
      });

      var rv = {};
      angular.forEach(selectors, function (values, name) {
        rv[name] = Object.keys(values).sort();
      });

      return rv;
    };

    myThingsService.get_data($routeParams.call_type, function(data) {
      $scope.things = data;
	  $scope.selectors = buildSelectors( $scope.things );
    });
  }])
;
