'use strict';

angular.module('myModule', []).factory('myThingsService', function() {
  var serviceImplementation = {
  	"get_many": function (callback) {
      callback({});
  	}
  };

  return serviceImplementation;
});