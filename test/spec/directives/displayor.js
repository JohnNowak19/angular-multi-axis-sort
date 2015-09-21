'use strict';

describe('directive: displayors', function() {
  var element, scope;

  beforeEach(module('angularApp'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  function compile(template) {
    inject(function($compile) {
      element = $compile(template)(scope);
    });
    scope.$digest();
  }

  describe('creating a displayor', function() {
    beforeEach(function () {
      compile(
        '<things>' +
          '<thing color="Blue" size="Small">Blueberry</thing>' +
        '</things>'
      );
    });

    it('should produce a list element', function () {
      expect(element.find('li').length).toEqual(1);
    });

    it('should receive on the right topic', function() {
      var li = element.find('li');

      expect(li.hasClass('ng-hide')).toBeFalsy();

      // This doesn't change anything
      scope.$emit(['display', 'Blue', true].join(':'));
      expect(li.hasClass('ng-hide')).toBeFalsy();

      // This hides the element
      scope.$emit(['display', 'Blue', false].join(':'));
      expect(li.hasClass('ng-hide')).toBeTruthy();

      // This doesn't do anything once hidden
      scope.$emit(['display', 'Blue', false].join(':'));
      expect(li.hasClass('ng-hide')).toBeTruthy();

      // This shows the element again
      scope.$emit(['display', 'Blue', true].join(':'));
      expect(li.hasClass('ng-hide')).toBeFalsy();
    });
  });
});
