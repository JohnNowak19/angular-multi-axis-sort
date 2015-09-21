'use strict';

angular.module('selector', [])
  .directive('selectors', [ '$rootScope', function ($rootScope) {
    $rootScope.buildSelectors = function (things) {
      var selectors = {};
      angular.forEach(things, function(attrs, _) {
        angular.forEach(attrs, function(value, name) {
          if (!selectors[name]) selectors[name] = {};
          selectors[name][value] = true;
        });
      });

      var rv = {};
      angular.forEach(selectors, function (values, name) {
        rv[name] = Object.keys(values).sort();
      });

      return rv;
    };

    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function(){}, // This controller is required.
      template: '<div><ul ng-transclude/></div>',
      replace: true,
    };
  }])
  .directive('selector', [ '$rootScope', function($rootScope) {
    return {
      require: '^selectors',
      restrict: 'E',
      transclude: true,
      scope: {},
      link: function($scope, element, attrs){//, $parent) {
        $scope.title = attrs.title;
        $scope.selected = true;
      },
      controller: function($scope) {//, $element) {
        $scope.select = function() {
          $rootScope.$broadcast([
            'display', $scope.title, $scope.selected
          ].join(':'));
        };
      },
      template:
        '<li>' +
          '<input type="checkbox" ng-model="selected" ng-click="select()"/>' +
          '{{title}}' +
        '</li>',
      replace: true,
    };
  }])
;
