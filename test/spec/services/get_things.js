'use strict';

describe('Service: getThings', function () {
  beforeEach(module('angularApp'));

  var myService;
  beforeEach(function() {
    var $injector = angular.injector([ 'myModule' ]);
    myService = $injector.get( 'myThingsService');
  });

  var call_types = ['many', 'few'];
  angular.forEach(call_types, function (call_type) {
    describe("calls to get_data('"+call_type+"')", function(){
      describe('responds in the callback', function(){
        var tests = [
          {'a': 1},
          {'a': 2},
        ];
        angular.forEach(tests, function (item) {
          it(""+item, function(done) {
            myService.set_data(call_type, item);
            myService.get_data(call_type, function (stuff) {
              expect(stuff).toEqual(item);
              done();
            });
          });
        });
      });
    });
  });
});
