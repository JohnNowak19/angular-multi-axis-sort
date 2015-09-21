'use strict';

describe('Controller: LargeCtrl', function () {
  beforeEach(module('angularApp'));

  var LargeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LargeCtrl = $controller('LargeCtrl', {
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
