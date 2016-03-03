(function() {
  'use strict';

  angular.module('app.core.filter').filter('percent', [
    '$filter',
    function($filter) {
      return function(input, decimals) {
        return !angular.isNumber(input) ? 'N/A' : $filter('number')(input, decimals) + '%';
      };
    }
  ]);
})();
