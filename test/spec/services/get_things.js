'use strict';

describe('Service: getThings', function () {
  beforeEach(module('angularApp'));

  describe('calls to get_many', function(){
    describe('responds in the callback', function(){
      it('a:1', function(done) {
        var $injector = angular.injector([ 'myModule' ]);
        var myService = $injector.get( 'myThingsService');

        myService.many_data = { 'a': 1 };
        myService.get_many(
          function (stuff) {
            expect(stuff).toEqual({'a': 1});
            done();
         });
      });

      it('a:2', function(done) {
        var $injector = angular.injector([ 'myModule' ]);
        var myService = $injector.get( 'myThingsService');

        myService.many_data = { 'a': 2 };
        myService.get_many(function (stuff) {
          expect(stuff).toEqual({'a': 2});
          done();
        });
      });


    });
  });

  describe('calls to get_few', function(){
    describe('responds in the callback', function(){
      it('a:3', function(done) {
        var $injector = angular.injector([ 'myModule' ]);
        var myService = $injector.get( 'myThingsService');

        myService.few_data = { 'a': 3 };
        myService.get_few(function (stuff) {
          expect(stuff).toEqual({'a': 3});
          done();
        });
      });

      it('a:4', function(done) {
        var $injector = angular.injector([ 'myModule' ]);
        var myService = $injector.get( 'myThingsService');

        myService.few_data = { 'a': 4 };
        myService.get_few(function (stuff) {
          expect(stuff).toEqual({'a': 4});
          done();
        });
      });

    });
  });

});
