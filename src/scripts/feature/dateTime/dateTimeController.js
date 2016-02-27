(function() {
  'use strict';

  angular.module('app.feature.weather').controller('DateTimeController', [
    '$log', '$scope', '$interval',
    function($log, $scope, $interval) {
      $scope.dateTime = new Date();
    }
  ]);
})();
