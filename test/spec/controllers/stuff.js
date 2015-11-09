'use strict';

describe('Controller: StuffContrl', function () {
  beforeEach(module('angularApp'));

  var StuffContrl, scope;

  // Initialize the controller and a mock scope and a mock route
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StuffContrl = $controller('StuffContrl', {
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
