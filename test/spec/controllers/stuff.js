'use strict';

describe('Controller: StuffContrl', function () {
  beforeEach(module('angularApp'));

  var scope;

  beforeEach(inject(function ($controller, $rootScope, myThingsService) {
    scope = $rootScope.$new();
    $controller('StuffContrl', {
      '$scope': scope,
      '$routeParams': {'call_type': 'many'},
      'myThingsService': myThingsService
    });
  }));

  it('should attach a hash of selectors to the scope', function () {
    expect(Object.keys(scope.selectors).length).toBe(2);
  });
  it('should attach a hash of things to the scope', function () {
    expect(Object.keys(scope.things).length).toBe(7);
  });
});
