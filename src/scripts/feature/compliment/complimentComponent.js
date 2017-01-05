(function() {
  'use strict';

  angular.module('app.feature.compliment').component('mmCompliment', {
    templateUrl: '/views/compliment.html',
    controllerAs: 'vm',
    controller: [
      '$interval', '_complimentProvider',
      function($interval, _complimentProvider) {
        var getRandomCompliment = function() {
          var now = new Date();
          return _complimentProvider.provide(now.getHours());
        };

        // Set a random compliment every 5 minutes in an endless loop
        var complimentInterval = $interval(function() {
          this.compliment = getRandomCompliment();
        }, 300000);

        this.$onInit = function() {
          // Set a random compliment on startup
          this.compliment = getRandomCompliment();
        }

        this.$onDestroy = function() {
          $interval.cancel(complimentInterval);
        };
      }
    ]
  });
})();
