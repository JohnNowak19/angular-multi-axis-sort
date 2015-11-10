'use strict';
 
angular.module('selector', [])
  .directive('selectors', [ function () {
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
      link: function($scope, element, attrs){
        $scope.title = attrs.title;
        $scope.selected = true;
      },
      controller: function($scope) {
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
