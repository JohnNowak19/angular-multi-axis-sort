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
  impl.get_many = function (callback) {
    callback(impl.many_data);
  };

  return impl;
});