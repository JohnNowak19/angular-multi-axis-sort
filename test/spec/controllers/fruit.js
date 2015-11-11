'use strict';

describe('Controller: fruitContrl', function () {
  beforeEach(module('angularApp'));

  var scope;

  beforeEach(inject(function ($controller, $rootScope, _communicationService_) {
    scope = $rootScope.$new();
    _communicationService_.set_data('track', {
      "Blue Coconut": { "track": "Large", "ubarea": ["Blue"] },
      "Pomegrante": { "track": "Large", "ubarea": ["Red"] },
      "Cocunut": { "track": "Large", "ubarea": ["Green"] },
      "Apple": { "track": "Medium", "ubarea": ["Red"] },
      "Banana": { "track": "Medium", "ubarea": ["Yellow"] },
      "Blueberry": { "track": "Small", "ubarea": ["Blue"] },
      "Cherry": { "track": "Small", "ubarea": ["Red"] }
    });
    $controller('fruitContrl', {
      '$scope': scope,
      '$routeParams': {'call_type': 'track'},
      'communicationService': _communicationService_
    });
  }));

  it('should attach a hash of things to the scope', function () {
    expect(Object.keys(scope.things).length).toBe(7);
  });
});
