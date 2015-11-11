'use strict';

describe('selector-displayer: integration test', function() {
  var element, scope, rootScope;

  beforeEach(module('angularApp'));

  beforeEach(inject(function($rootScope) {
  	rootScope = $rootScope;
    scope = $rootScope.$new();
  }));

  function compile(template) {
    inject(function($compile) {
      element = $compile(template)(scope);
    });
    scope.$digest();
  }

  beforeEach(function () {
    compile(
    	'<div>' +
    	'<selectors title="size">' +
          	'<selector title="Small"/>' +
        	'<selector title="Large"/>' +
        '</selectors>' +
		'<selectors title="color">' +
          	'<selector title="Blue"/>' +
        	'<selector title="Green"/>' +
        	'<selector title="Red"/>' +
        '</selectors>' +
      	'<things>' +
	        '<thing color="Green" size="Small">Greenberry</thing>' +
	        '<thing color="Blue" size="Large">blue-large</thing>' +
	        '<thing color="Red" size="Large">red-large</thing>' +
	        '<thing color="Green" size="Large">green-large</thing>' +
	        '<thing color="Red,Blue" size="Small">redblue-small</thing>' +
	      '</things>' +
	      '</div>' 
    );
  });

  function click(elem) {
  	elem.click();
  }
/*  function show_on(attr){
    scope.$emit(['display', attr, true].join(':'));
  }*/

  function is_visible(elem) {
    expect(elem.hasClass('ng-hide')).toBeFalsy();
  }
  function is_hidden(elem) {
    expect(elem.hasClass('ng-hide')).toBeTruthy();
  }
  function matches_itself(elm, text){
    expect(elm.text()).toEqual(''+text+'');
  }

/*
  describe('click everything', function() {
	  it('should display all ', function() {
	    // Start with 2 sizes, 3 colors, 5 items
	    // Verify nothing selected, everything visible.
	   	//var li = element.find('li');
	   	var inputs = element.find('input');

	   	angular.forEach(inputs , function (input){
            var e = angular.element(input);
	   		click(e);	   		
      		expect(e.prop('checked')).toBeTruthy();
	   	});
	 });
  });
*/

  describe('clicking a selector and evaluate a displayor ', function() {
	  it('should display the ', function() {
	    // Start with 2 sizes, 2 colors, 5 items

      var li = element.find('li');

      // Verify nothing selected, everything visible.
	  var Greenberry = angular.element(li[5]);
      matches_itself(Greenberry, 'Greenberry');
      is_visible(Greenberry);

      var blue_large = angular.element(li[6]);
      matches_itself(blue_large, 'blue-large');
      is_visible(blue_large);

      var red_large = angular.element(li[7]);
      matches_itself(red_large, 'red-large');
      is_visible(red_large);

      var green_large = angular.element(li[8]);
      matches_itself(green_large, 'green-large');
      is_visible(green_large);

      var redblue_small = angular.element(li[9]);
      matches_itself(redblue_small, 'redblue-small');
      is_visible(redblue_small);

	  var inputs = element.find('input');
	  var small_click = angular.element(inputs[0]);
	  var blue_click = angular.element(inputs[2]);

	  expect(small_click.prop('checked')).toBeFalsy();
	  click(small_click);
	  expect(small_click.prop('checked')).toBeTruthy();

      // What is visible?
      is_visible(Greenberry);
      is_hidden(blue_large);
      is_hidden(red_large);
      is_hidden(green_large);
      is_visible(redblue_small);

	  click(blue_click);
	  // What is visible?
	  is_hidden(Greenberry);
      is_hidden(blue_large);
      is_hidden(red_large);
      is_hidden(green_large);
      is_visible(redblue_small);

      //should return to the state with just small checked
      click(blue_click);
      is_visible(Greenberry);
      is_hidden(blue_large);
      is_hidden(red_large);
      is_hidden(green_large);
      is_visible(redblue_small);

      //uncheck small so that nothing is checked, you should see everything in the list.
      click(small_click);
      is_visible(Greenberry);
      is_visible(blue_large);
      is_visible(red_large);
      is_visible(green_large);
      is_visible(redblue_small);

      // Add a test where we click (in order): Blue, Green, Green (this will execute selector.js:27)

    });
  });
});