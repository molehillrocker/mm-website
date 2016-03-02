(function() {
  'use strict';

  angular.module('app.feature.dateTime').controller('DateTimeController', [
    '$scope', '$interval',
    function($scope, $interval) {
      $interval(function() {
        $scope.dateTime = Date.now();
      }, 1000);
    }
  ]);
})();
