(function() {
  'use strict';

  angular.module('app.feature.compliment').component('mmCompliment', {
    templateUrl: '/views/compliment.html',
    controllerAs: 'vm',
    controller: [
      '$log', '$interval', '_complimentProvider',
      function($log, $interval, _complimentProvider) {
        var vm = this;

        var retrieveRandomCompliment = function() {
          var now = new Date();
          _complimentProvider.provide(now.getHours())
            .then(function(compliment) {
              vm.compliment = compliment;
            })
            .catch(function(errorMessage) {
              $log.error('Could not get compliment! Reason:', errorMessage);
              vm.compliment = 'N/A';
            });
        };

        // Set a random compliment every 5 minutes in an endless loop
        var complimentInterval = $interval(retrieveRandomCompliment, 300000);

        this.$onInit = function() {
          // Set a random compliment on startup
          retrieveRandomCompliment();
        }

        this.$onDestroy = function() {
          $interval.cancel(complimentInterval);
        };
      }
    ]
  });
})();
