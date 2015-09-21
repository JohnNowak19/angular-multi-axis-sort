'use strict';

angular.module('selector', [])
  .directive('selectors', function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function(){},//$scope, $element) {},
      template: '<div><ul ng-transclude/></div>',
      replace: true,
    };
  })
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
          $rootScope.$broadcast('display:'+$scope.title, $scope.selected);
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
