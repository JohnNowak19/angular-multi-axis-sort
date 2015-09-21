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
      template: '<div><ul ng-transclude/></div>',
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
        var invoke = { 'true': 'removeClass', 'false': 'addClass' };

        angular.forEach(['size', 'color'], function (param) {
          $scope[param] = attrs[param];

          angular.forEach(invoke, function (action, cond) {
            $rootScope.$on(
              ['display', $scope[param], cond].join(':'),
              function () { element[action]('ng-hide'); }
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
