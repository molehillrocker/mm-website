(function() {
  'use strict';

  angular.module('app.feature.compliment').controller('ComplimentController', [
    '$scope', '$interval', '_complimentProvider',
    function($scope, $interval, _complimentProvider) {
      var getRandomCompliment = function() {
        var now = new Date();
        return _complimentProvider.provide(now.getHours());
      };

      // Set a random compliment on startup
      $scope.compliment = getRandomCompliment();
      // And afterwards every 5 minutes in an endless loop
      $interval(function() {
        $scope.compliment = getRandomCompliment();
      }, 300000);
    }
  ]);
})();
