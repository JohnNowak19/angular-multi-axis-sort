'use strict';

describe('Controller: fruitContrl', function () {
  beforeEach(module('angularApp'));

  var scope;

  beforeEach(inject(function ($controller, $rootScope, communicationService) {
    scope = $rootScope.$new();
    communicationService.set_data('many', {
      "Blue Coconut": { "size": "Large", "color": ["Blue"] },
      "Pomegrante": { "size": "Large", "color": ["Red"] },
      "Cocunut": { "size": "Large", "color": ["Green"] },
      "Apple": { "size": "Medium", "color": ["Red"] },
      "Banana": { "size": "Medium", "color": ["Yellow"] },
      "Blueberry": { "size": "Small", "color": ["Blue"] },
      "Cherry": { "size": "Small", "color": ["Red"] }
    });
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
