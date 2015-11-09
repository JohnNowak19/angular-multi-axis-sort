'use strict';

var myModule = angular.module('myThings', []);

myModule.factory('myThingsService', function(){

     var serviceImplementation   = {};
     serviceImplementation.one   = 1;
    // serviceImplementation.two   = 2;
    // serviceImplementation.three = 3;

     return serviceImplementation;

});