(function() {
  'use strict';

  angular.module('app.feature.dateTime').component('mmDatetime', {
    templateUrl: '/views/dateTime.html',
    controllerAs: 'vm',
    controller: [
      '$interval',
      function($interval) {
        var vm = this;

        var retrieveCurrentDateTime = function(){
          vm.dateTime = Date.now();
        };

        // Set the current date and time every second in an endless loop
        var dateTimeInterval = $interval(retrieveCurrentDateTime, 1000);

        vm.$onInit = function() {
          // Set the current date and time on startup
          retrieveCurrentDateTime();
        }

        vm.$onDestroy = function() {
          $interval.cancel(dateTimeInterval);
        };
      }
    ]
  })
})();
