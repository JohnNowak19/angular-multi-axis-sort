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
  .directive('thing', [ function () {
    return {
      require: '^things',
      restrict: 'E',
      transclude: true,
      scope: {},
      link: function($scope, element, attrs, $parent) {
        var visibility = {};
        var visible_for = function (param) {
          var hideme = true;
          angular.forEach(visibility[param], function (visible) {
            if (visible) { hideme = false; }
          });
          return !hideme;
        };
        var is_visible = function () {
          return visible_for('color') && visible_for('size');
        };
        var alter_visibility_for = function (param, truthy) {
          angular.forEach(visibility[param], function(_, key) {//jshint ignore:line
            visibility[param][key] = truthy;
          });
        };
        var set_visibility_for = function (param, value, truthy) {
          visibility[param][value] = truthy;
        };
        var update_element_visibility = function () {
          if (is_visible()) { element.removeClass('ng-hide'); }
          else { element.addClass('ng-hide'); }
        };

        angular.forEach(['size', 'color'], function (param) {
          var values = [];
          if (param === 'color') {
            values = attrs[param].split(',');
          }
          else { //if (param === 'size') {
            values = [attrs[param]];
          }

          $scope.$on('show-all-'+param, function () {
            alter_visibility_for(param, true);

            update_element_visibility();
          });
          $scope.$on('hide-if-not-'+param, function (_, value) {//jshint ignore:line
            // FIXME: Consider using indexOf()
            var found = false;
            angular.forEach(values, function (val) {
              if (val === value) { found = true; }
            });
            if (!found) { alter_visibility_for(param, false); }

            update_element_visibility();
          });

          visibility[param] = {};
          angular.forEach(values, function(value) {
            // Always start as being visible
            set_visibility_for(param, value, true);

            angular.forEach([true, false], function (truthy) {
              $scope.$on(['display', value, truthy].join(':'), function () {
                set_visibility_for(param, value, truthy);
                update_element_visibility();
              });
            });
          });
        });

        $parent.addThing($scope);
      },
      template: '<li ng-transclude/>',
      replace: true,
    };
  }])
;
