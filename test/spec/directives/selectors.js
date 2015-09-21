describe('directive: selectors', function() {
  var element, scope;

  beforeEach(module('angularApp'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    scope.aspect = 'Aspect';
  }));

  function compile(template) {
    inject(function($compile) {
      element = $compile(template)(scope);
    });
    scope.$digest();
  }

  describe('creating a selector', function() {
    beforeEach(function () {
      compile(
        '<selectors>' +
          '<selector title="{{aspect}}"/>' +
        '</selectors>'
      );
    });

    it('should produce a checkbox', function () {
      expect(element.find('input').length).toEqual(1);
    });
  });
});
