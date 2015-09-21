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
        $scope.size = attrs.size;
        $scope.color = attrs.color;
        $parent.addThing($scope);

        $rootScope.$on( 'display:'+$scope.size, function (event, data) {
          if (data) {
            element.removeClass('ng-hide');
          }
          else {
            element.addClass('ng-hide');
          }
        });
        $rootScope.$on( 'display:'+$scope.color, function (event, data) {
          if (data) {
            element.removeClass('ng-hide');
          }
          else {
            element.addClass('ng-hide');
          }
        });
      },
      controller: function(){},//$scope, $element) {},
      template: '<li>{{size}} - {{color}}</li>',
      replace: true,
    };
  }])
;
