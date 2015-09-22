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
        $scope.attributesSet = {};
        angular.forEach(['size', 'color'], function (param) {
          $scope[param] = attrs[param];

          $rootScope.$on(
            ['display', $scope[param], false].join(':'),
            function () {
              $scope.attributesSet[param] = true;
              element.addClass('ng-hide');
            }
          );

          $rootScope.$on(
            ['display', $scope[param], true].join(':'),
            function () {
              delete $scope.attributesSet[param];
              if (Object.keys($scope.attributesSet).length == 0) {
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
