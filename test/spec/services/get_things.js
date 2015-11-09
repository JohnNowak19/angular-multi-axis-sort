'use strict';

describe('Service: getThings', function () {
  beforeEach(module('angularApp'));

  describe('myService test', function(){
    describe('when I call stuff.things', function(){
      it('returns 1', function(){
        var $injector = angular.injector([ 'myThings' ]);
        var myService = $injector.get( 'myThingsService' );
        expect( myService.one ).toEqual(1);
      });
    });
  });  
});
