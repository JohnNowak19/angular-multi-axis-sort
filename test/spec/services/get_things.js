'use strict';

describe('Service: getThings', function () {
  beforeEach(module('angularApp'));

  describe('calls to get_many', function(){
    describe('responds in the callback', function(){
      it('with stuff', function(done) {
        var $injector = angular.injector([ 'myModule' ]);
        var myService = $injector.get( 'myThingsService');

        myService.get_many(function (stuff) {
          expect(stuff).toEqual({});
          done();
        });
      });
    });
  });

});
