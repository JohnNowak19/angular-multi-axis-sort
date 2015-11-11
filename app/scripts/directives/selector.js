'use strict';
 
angular.module('selector', [])
  .directive('selectors', [ '$rootScope', function ($rootScope) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      link: function ($scope, element, attrs) {
        $scope.title = attrs.title;
      },
      controller: function($scope){//, $element) {
        var items = [];
        this.addThing = function(child) {
          items.push(child);
        };

        var all_empty = true;
        this.trigger_all_check = function (value, is_selected) {
          if (all_empty && is_selected) {
            all_empty = false;
            $rootScope.$broadcast('hide-if-not-'+ $scope.title, value);
          }
          else {
            var any_selected = false;
            angular.forEach(items, function (item) {
              if (item.selected) { any_selected = true; }
            });
            if (!any_selected) {
              all_empty = true;
              $rootScope.$broadcast('show-all-'+$scope.title);
            }
          }
        };
      },
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
      link: function($scope, element, attrs, $parent){
        $scope.title = attrs.title;
        $scope.selected = false;
        $scope.parent = $parent;
        $parent.addThing($scope);
      },
      controller: function($scope) {
        $scope.select = function() {
          $rootScope.$broadcast([
            'display', $scope.title, $scope.selected
          ].join(':'));

          $scope.parent.trigger_all_check($scope.title, $scope.selected);
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
