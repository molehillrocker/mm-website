(function() {
  'use strict';

  angular.module('app.feature.dateTime').component('mmDatetime', {
    templateUrl: '/views/dateTime.html',
    controllerAs: 'vm',
    controller: [
      '$interval',
      function($interval) {
        // Set the current date and time every second in an endless loop
        var datetimeInterval = $interval(function() {
          this.dateTime = Date.now();
        }, 1000);

        this.$onInit = function() {
          // Set the current date and time on startup
          this.dateTime = Date.now();
        }

        this.$onDestroy = function() {
          $interval.cancel(datetimeInterval);
        };
      }
    ]
  })
})();
