'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:StuffContrl
 * @description
 * # StuffContrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('StuffContrl', ['$scope', '$route', function ($scope, $route) {
    $scope.things = $route.current.$$route.things;
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
    $scope.selectors = buildSelectors( $scope.things );
  }])
;
