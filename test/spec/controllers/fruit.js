'use strict';

describe('Controller: fruitContrl', function () {
  beforeEach(module('angularApp'));

  var scope;

  beforeEach(inject(function ($controller, $rootScope, communicationService) {
    scope = $rootScope.$new();
    $controller('fruitContrl', {
      '$scope': scope,
      '$routeParams': {'call_type': 'many'},
      'communicationService': communicationService
    });
  }));

  it('should attach a hash of selectors to the scope', function () {
    expect(Object.keys(scope.selectors).length).toBe(2);
  });
  it('should attach a hash of things to the scope', function () {
    expect(Object.keys(scope.things).length).toBe(7);
  });
});
