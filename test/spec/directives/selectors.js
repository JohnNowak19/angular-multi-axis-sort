'use strict';

describe('directive: selectors', function() {
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

  describe('creating a selector', function() {
    beforeEach(function () {
      compile(
        '<selectors title="ubarea">' +
          '<selector title="Arts"/>' +
        '</selectors>'
      );
    });

    it('should produce a checkbox', function () {
      expect(element.find('input').length).toEqual(1);
    });

    it('should publish on the right topic', function() {
      // The checkboxes start checked
      var selected = false;

      angular.forEach([true, false], function (val) {
        scope.$on(
          ['display', 'Arts', val].join(':'),
          function () { selected = val; }
        );
      });

      // This de-selects the checkbox
      element.find('input').click();
      expect(selected).toBeTruthy();

      // This re-selects the checkbox
      element.find('input').click();
      expect(selected).toBeFalsy();
    });
  });
});
