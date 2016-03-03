(function() {
  'use strict';

  angular.module('app.feature.dateTime').controller('DateTimeController', [
    '$scope', '$interval',
    function($scope, $interval) {
      // Set the current date and time on startup
      $scope.dateTime = Date.now();
      // And afterwards every second in an endless loop
      $interval(function() {
        $scope.dateTime = Date.now();
      }, 1000);
    }
  ]);
})();
