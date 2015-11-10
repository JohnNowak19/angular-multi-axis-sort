'use strict';

angular.module('myModule', []).factory('communicationService', function() {
  var impl = {};

  var data = {
  	'many': { 
  		'Blue Coconut': { size: 'Large', color: ['Blue'] },
	    'Pomegrante': { size: 'Large', color: ['Red'] },
	    'Cocunut': { size: 'Large', color: ['Green'] },
	    'Apple': { size: 'Medium', color: ['Red'] },
	    'Banana': { size: 'Medium', color: ['Yellow'] },
	    'Blueberry': { size: 'Small', color: ['Blue'] },
	    'Cherry': { size: 'Small', color: ['Red'] }
	},
  	'few': { 
	  	'Blue Coconut': { size: 'Large', color: ['Blue'] },
	    'Pomegrante': { size: 'Large', color: ['Red'] },
	    'Cocunut': { size: 'Large', color: ['Green'] },
	    'Cherry': { size: 'Small', color: ['Red'] }
	}
  };

  impl.set_data = function(call_type, item){
    data[call_type] = item;  	
  };

  impl.get_data = function(call_type, callback){
    callback(data[call_type]);
  };

  return impl;
});