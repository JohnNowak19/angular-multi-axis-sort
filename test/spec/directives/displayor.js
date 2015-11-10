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


    function is_visible(elem) {
      expect(elem.hasClass('ng-hide')).toBeFalsy();
    }
    function is_hidden(elem) {
      expect(elem.hasClass('ng-hide')).toBeTruthy();
    }

    function hide_on(attr){
      scope.$emit(['display', attr, false].join(':'));
    }

    function show_on(attr){
      scope.$emit(['display', attr, true].join(':'));
    }

  describe('creating a displayor', function() {
    beforeEach(function () {
      compile(
        '<things>' +
          '<thing color="Blue,Green" size="Small">Bluegreenberry</thing>' +
        '</things>'
      );
    });

    it('should produce a list element', function () {
      expect(element.find('li').length).toEqual(1);
    });

    // FIXME: Why do we use $emit here, but $broadcast in the main code?
    it('should receive on the right topic', function() {
      var li = element.find('li');

      // This doesn't change anything
      hide_on('Blue');
      show_on('Blue');

      show_on('Blue');
      is_visible(li);

      // This hides the element
      hide_on('Blue');
      is_hidden(li);

      // This doesn't do anything once hidden
      hide_on('Blue');
      is_hidden(li);

      // This shows the element again
      show_on('Blue');
      is_visible(li);
      
      // This hides the element because of Green
      hide_on('Green');
      is_hidden(li);

      // This shows the element because of Blue (and Green is still hiding)
      show_on('Blue');
      is_hidden(li);

      // This tries to show the element because of Blue (but Green is still hiding)
      show_on('Blue');
      is_hidden(li);

      // This shows the element because of Green
      show_on('Green');
      is_visible(li);

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
      //is_visible(blue_small');

      var blue_large = angular.element(li[1]);
      expect(blue_large.text()).toEqual('blue-large');
      //is_visible(blue_large');
      //(blue_large.hasClass('ng-hide')).toBeFalsy();

      var red_large = angular.element(li[2]);
      expect(red_large.text()).toEqual('red-large');
      //is_visible(red_large');

      // Turn off all selectors
      hide_on('Blue');
      is_hidden(blue_small);
      is_hidden(blue_large);
      is_visible(red_large);


      hide_on('Small');
      is_hidden(blue_small);
      is_hidden(blue_large);
      is_visible(red_large);

      hide_on('Red');
      is_hidden(blue_small);
      is_hidden(blue_large);
      is_hidden(red_large);

      hide_on('Large');
      is_hidden(blue_small);
      is_hidden(blue_large);
      is_hidden(red_large);

      // Show the Blue things
      show_on('Blue');

      // Everything should remain hidden
      is_hidden(blue_small);
      is_hidden(blue_large);
      is_hidden(red_large);

      // Show the Small things
      show_on('Small');

      // Only the blue-small thing should be shown
      is_visible(blue_small);
      is_hidden(blue_large);
      is_hidden(red_large);
    });
  });
});
