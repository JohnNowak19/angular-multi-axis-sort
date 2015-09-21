'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:SmallCtrl
 * @description
 * # SmallCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('SmallCtrl', [ '$location', function ($location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }])
;
