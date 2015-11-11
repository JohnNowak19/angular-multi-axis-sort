'use strict';

angular.module('myModule', []).factory('communicationService', [
  '$http',
  function($http) {
    var impl = {};

    var selectors = {
      thematic: {
        track: [
          'Large', 'Medium', 'Small'
        ],
        ubarea: [
          'Blue', 'Green', 'Red', 'Yellow'
        ]
      },
      global: {
        track: [
          'Large', 'Medium', 'Small'
        ],
        ubarea: [
          'Blue', 'Green', 'Red', 'Purple'
        ]
      }
    };
    var data = {};

    impl.set_data = function(call_type, item){
      data[call_type] = item;  	
    };

    impl.get_data = function(call_type, callback){
      if (data[call_type]) {
        callback({
          selectors: selectors[call_type],
          topics: data[call_type]
        });
      }
      else {
        var url = '/mocked_data/' + call_type + '.json';
        $http.get(url).then(
          function (response) {
            impl.set_data(call_type, response.data);
            callback({
              selectors: selectors[call_type],
              topics: data[call_type]
            });
          },
          /* istanbul ignore next: Not going to reproduce a window.alert() */
          function () {
            window.alert("Failed to call " + url);
          }
        );
      }
    };

    return impl;
  }
]);