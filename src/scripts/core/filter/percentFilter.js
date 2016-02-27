(function() {
  'use strict';

  angular.module('app.core.filter').filter('percent', [
    '$filter',
    function($filter) {
      return function(input, decimals) {
        return $filter('number')(input, decimals) + '%';
      };
    }
  ]);
})();
