'use strict';




describe('Service: getThings', function () {
  beforeEach(module('angularApp'));

  var call_types = ['many', 'few'];
  angular.forEach(call_types, function (call_type) {
    describe('calls to get_'+call_type, function(){
      describe('responds in the callback', function(){
        var tests = [
          {'a': 1},
          {'a': 2},
        ];
        angular.forEach(tests, function (item) {
          it(""+item, function(done) {
            var $injector = angular.injector([ 'myModule' ]);
            var myService = $injector.get( 'myThingsService');

            myService[call_type+'_data'] = item;
            myService['get_'+call_type](
              function (stuff) {
                expect(stuff).toEqual(item);
                done();
             });
          });
        });
      });
    });
  });
});
