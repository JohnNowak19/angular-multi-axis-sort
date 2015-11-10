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
          var value = attrs[param];
          if (param === 'color') {
            value = attrs[param].split(',')[0];
          }
          $scope[param] = value;//attrs[param];

          $rootScope.$on(
            ['display', $scope[param], false].join(':'),
            function () {
              $scope.is_unselected[param] = true;
              element.addClass('ng-hide');
            }
          );

          $rootScope.$on(
            ['display', $scope[param], true].join(':'),
            function () {
              delete $scope.is_unselected[param];
              if (Object.keys($scope.is_unselected).length === 0) {
                element.removeClass('ng-hide');
              }
            }
          );
        });

        $parent.addThing($scope);
      },
      template: '<li ng-transclude/>',
      replace: true,
    };
  }])
;
