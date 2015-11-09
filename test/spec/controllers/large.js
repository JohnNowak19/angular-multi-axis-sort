'use strict';

describe('Controller: LargeCtrl', function () {
  beforeEach(module('angularApp'));

  var LargeCtrl, scope;

  // Initialize the controller and a mock scope and a mock route
  beforeEach(inject(function ($controller, $rootScope) {
    // Injecting this here because there's a dependency on the selector directive
    $rootScope.buildSelectors = function (things) {
      var selectors = {};
      angular.forEach(things, function(attrs, _) { // jshint ignore:line
        angular.forEach(attrs, function(value, name) {
          if (!selectors[name]) { selectors[name] = {}; }
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
    LargeCtrl = $controller('LargeCtrl', {
      $rootScope: $rootScope,
      $scope: scope,
      $route: {
        current: {
          '$$route': {
            things: {
              'Blue Coconut': { size: 'Large', color: 'Blue' },
              'Pomegrante': { size: 'Large', color: 'Red' },
              'Cocunut': { size: 'Large', color: 'Green' },
              'Apple': { size: 'Medium', color: 'Red' },
              'Banana': { size: 'Medium', color: 'Yellow' },
              'Blueberry': { size: 'Small', color: 'Blue' },
              'Cherry': { size: 'Small', color: 'Red' }
            }
          }
        }
      }
      // place here mocked dependencies
    });
  }));

  it('should attach a hash of selectors to the scope', function () {
    expect(Object.keys(scope.selectors).length).toBe(2);
  });
  it('should attach a hash of things to the scope', function () {
    expect(Object.keys(scope.things).length).toBe(7);
  });
});
