'use strict';

angular.module('myModule', []).factory('myThingsService', function() {
  var impl = {};

  impl.many_data = {
    'Blue Coconut': { size: 'Large', color: 'Blue' },
    'Pomegrante': { size: 'Large', color: 'Red' },
    'Cocunut': { size: 'Large', color: 'Green' },
    'Apple': { size: 'Medium', color: 'Red' },
    'Banana': { size: 'Medium', color: 'Yellow' },
    'Blueberry': { size: 'Small', color: 'Blue' },
    'Cherry': { size: 'Small', color: 'Red' },
  };
  impl.few_data = {
    'Blue Coconut': { size: 'Large', color: 'Blue' },
    'Pomegrante': { size: 'Large', color: 'Red' },
    'Cocunut': { size: 'Large', color: 'Green' },
    'Cherry': { size: 'Small', color: 'Red' }
  };

  impl.get_many = function (callback) {
    callback(impl.many_data);
  };

    
  impl.get_few = function (callback) {
    callback(impl.few_data);
  };

  return impl;
});