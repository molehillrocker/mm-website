(function() {
  'use strict';

  angular.module('app.feature.compliment').component('mmCompliment', {
    templateUrl: '/views/compliment.html',
    controllerAs: 'vm',
    controller: [
      '$interval', '_complimentProvider',
      function($interval, _complimentProvider) {
        var vm = this;

        var retrieveRandomCompliment = function() {
          var now = new Date();
          vm.compliment = _complimentProvider.provide(now.getHours());
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
