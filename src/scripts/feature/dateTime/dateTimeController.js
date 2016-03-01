(function() {
  'use strict';

  angular.module('app.feature.weather').controller('DateTimeController', [
    '$scope', '$interval',
    function($scope, $interval) {
      $interval(function() {
        $scope.dateTime = Date.now();
      }, 1000);
    }
  ]);
})();
