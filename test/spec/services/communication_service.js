'use strict';

describe('Service: getThings', function () {
  beforeEach(module('angularApp'));

  var myService, httpBackend;
  beforeEach(inject(function ($httpBackend, _communicationService_) {
    myService = _communicationService_;
    httpBackend = $httpBackend;
  }));

  afterEach(function () {
    httpBackend.flush();
  });

  var call_types = ['track', 'ubarea'];
  angular.forEach(call_types, function (call_type) {
    describe("calls to get_data('"+call_type+"')", function(){
      describe('responds in the callback', function(){
        var tests = [
          {'a': 1},
          {'a': 2},
        ];
        angular.forEach(tests, function (item) {
          it(""+item, function() {
            // Use httpBackend.whenGET(url, data) for setting what should be returned in a GET
            // q.v. http://nathanleclaire.com/blog/2014/04/12/unit-testing-services-in-angularjs-for-fun-and-for-profit/

            var url = '/mocked_data/'+call_type+'.json';
            httpBackend.expectGET(url).respond(item);
            myService.get_data(call_type, function (stuff) {
              expect(stuff).toEqual(item);
            });
          });
        });
      });
    });
  });
});
