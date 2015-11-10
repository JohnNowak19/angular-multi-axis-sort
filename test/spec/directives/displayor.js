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

  // FIXME: Why do we use $emit here, but $broadcast in the main code?
  function hide_on(attr){
    scope.$emit(['display', attr, false].join(':'));
  }
  function show_on(attr){
    scope.$emit(['display', attr, true].join(':'));
  }

  function matches_itself(elm, text){
    expect(elm.text()).toEqual(''+text+'');
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

    it('should receive on the right topic', function() {
      var li = element.find('li');

      // We start as visible.
      is_visible(li);

      // This doesn't change anything
      show_on('Blue');
      is_visible(li);

      // This doesn't hide the element (green is still visible)
      hide_on('Blue');
      is_visible(li);

      // This doesn't do anything when called twice
      hide_on('Blue');
      is_visible(li);

      // This doesn't change anything if blue is now visible
      show_on('Blue');
      is_visible(li);
      
      // This also doesn't hide the element (green only, but blue still visible)
      hide_on('Green');
      is_visible(li);

      // NOW we're finally hidden (both blue and green are hidden)
      hide_on('Blue');
      is_hidden(li);

      // This shows the element because of Blue (but Green is still hiding)
      show_on('Blue');
      is_visible(li);

      // This doesn't change anything (already visible)
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

    it('will only display', function() {
      var li = element.find('li');

      var blue_small = angular.element(li[0]);
      matches_itself( blue_small, 'blue-small');
      is_visible(blue_small);

      var blue_large = angular.element(li[1]);
      matches_itself( blue_large, 'blue-large' );
      is_visible(blue_large);

      var red_large = angular.element(li[2]);
      matches_itself( red_large, 'red-large' );
      is_visible(red_large);

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
