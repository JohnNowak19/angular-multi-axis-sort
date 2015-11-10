'use strict';

angular.module('displayor', [])
  .directive('things', function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope){//, $element) {
        var items = $scope.items = [];
        this.addThing = function(child) {
          items.push(child);
        };
      },
      template: '<ul ng-transclude/>',
      replace: true,
    };
  })
  .directive('thing', [ '$rootScope', function ($rootScope) {
    return {
      require: '^things',
      restrict: 'E',
      transclude: true,
      scope: {},
      link: function($scope, element, attrs, $parent) {
        $scope.is_unselected = {};
        angular.forEach(['size', 'color'], function (param) {
          var values = [];
          if (param === 'color') {
            values = attrs[param].split(',');
          }
          else { //if (param === 'size') {
            values = [attrs[param]];
          }

          //$scope[param] = values;

          angular.forEach(values, function(value) {
            $rootScope.$on(
              ['display', value, false].join(':'),
              function () {
                $scope.is_unselected[[param, value].join(':') ] = true;
                element.addClass('ng-hide');
              }
            );

            $rootScope.$on(
              ['display', value, true].join(':'),
              function () {
                delete $scope.is_unselected[[param, value].join(':')];
                if (Object.keys($scope.is_unselected).length === 0) {
                  element.removeClass('ng-hide');
                }
              }
            );
          });
        });

        $parent.addThing($scope);
      },
      template: '<li ng-transclude/>',
      replace: true,
    };
  }])
;
