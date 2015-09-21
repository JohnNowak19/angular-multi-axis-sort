'use strict';

describe('Controller: SmallCtrl', function () {
  beforeEach(module('angularApp'));

  var SmallCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    // Injecting this here because there's a dependency on the selector directive
    $rootScope.buildSelectors = function (things) {
      var selectors = {};
      angular.forEach(things, function(attrs, _) {
        angular.forEach(attrs, function(value, name) {
          if (!selectors[name]) selectors[name] = {};
          selectors[name][value] = true;
        });
      });

      var rv = {};
      angular.forEach(selectors, function (values, name) {
        rv[name] = Object.keys(values).sort();
      });

      return rv;
    };

    scope = $rootScope.$new();
    SmallCtrl = $controller('SmallCtrl', {
      $rootScope: $rootScope,
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a hash of selectors to the scope', function () {
    expect(Object.keys(scope.selectors).length).toBe(2);
  });
  it('should attach a hash of things to the scope', function () {
    expect(Object.keys(scope.things).length).toBe(4);
  });
});
