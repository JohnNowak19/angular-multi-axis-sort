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

    // FIXME: Why do we use $emit here, but $broadcast in the main code?
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

  describe('for all attributes', function() {
    beforeEach(function () {
      compile(
        '<things>' +
          '<thing color="Blue" size="Small">blue-small</thing>' +
          '<thing color="Blue" size="Large">blue-large</thing>' +
          '<thing color="Red" size="Large">red-large</thing>' +
        '</things>'
      );
    });

    // FIXME: Why do we use $emit here, but $broadcast in the main code?
    it('will only display', function() {
      var li = element.find('li');

      var blue_small = angular.element(li[0]);
      expect(blue_small.text()).toEqual('blue-small');
      expect(blue_small.hasClass('ng-hide')).toBeFalsy();

      var blue_large = angular.element(li[1]);
      expect(blue_large.text()).toEqual('blue-large');
      expect(blue_large.hasClass('ng-hide')).toBeFalsy();

      var red_large = angular.element(li[2]);
      expect(red_large.text()).toEqual('red-large');
      expect(red_large.hasClass('ng-hide')).toBeFalsy();

      // Turn off all selectors
      scope.$emit(['display', 'Blue', false].join(':'));
      expect(blue_small.hasClass('ng-hide')).toBeTruthy();
      expect(blue_large.hasClass('ng-hide')).toBeTruthy();
      expect(red_large.hasClass('ng-hide')).toBeFalsy();

      scope.$emit(['display', 'Small', false].join(':'));
      expect(blue_small.hasClass('ng-hide')).toBeTruthy();
      expect(blue_large.hasClass('ng-hide')).toBeTruthy();
      expect(red_large.hasClass('ng-hide')).toBeFalsy();

      scope.$emit(['display', 'Red', false].join(':'));
      expect(blue_small.hasClass('ng-hide')).toBeTruthy();
      expect(blue_large.hasClass('ng-hide')).toBeTruthy();
      expect(red_large.hasClass('ng-hide')).toBeTruthy();

      scope.$emit(['display', 'Large', false].join(':'));
      expect(blue_small.hasClass('ng-hide')).toBeTruthy();
      expect(blue_large.hasClass('ng-hide')).toBeTruthy();
      expect(red_large.hasClass('ng-hide')).toBeTruthy();

      // Show the Blue things
      scope.$emit(['display', 'Blue', true].join(':'));

      // Everything should remain hidden
      expect(blue_small.hasClass('ng-hide')).toBeTruthy();
      expect(blue_large.hasClass('ng-hide')).toBeTruthy();
      expect(red_large.hasClass('ng-hide')).toBeTruthy();

      // Show the Small things
      scope.$emit(['display', 'Small', true].join(':'));

      // Only the blue-small thing should be shown
      expect(blue_small.hasClass('ng-hide')).toBeFalsy();
      expect(blue_large.hasClass('ng-hide')).toBeTruthy();
      expect(red_large.hasClass('ng-hide')).toBeTruthy();
    });
  });
});
