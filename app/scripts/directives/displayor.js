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
        var visibility = {};

        angular.forEach(['size', 'color'], function (param) {
          var values = [];
          if (param === 'color') {
            values = attrs[param].split(',');
          }
          else { //if (param === 'size') {
            values = [attrs[param]];
          }

          var is_visible = function (param) {
            var hideme = true;
            angular.forEach(visibility[param], function (visible) {
              if (visible) { hideme = false; }
            });
            return !hideme;
          };

          visibility[param] = {};
          angular.forEach(values, function(value) {
            // Always start as being visible
            visibility[param][value] = true;

            $rootScope.$on(
              ['display', value, false].join(':'),
              function () {
                visibility[param][value] = false;

                if (!is_visible(param)) { element.addClass('ng-hide'); }
              }
            );

            $rootScope.$on(
              ['display', value, true].join(':'),
              function () {
                visibility[param][value] = true;
                if (is_visible('size') && is_visible('color')) {
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
