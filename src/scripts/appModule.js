(function() {
  'use strict';

  angular.module('app', [
    'app.config',
    'app.core',
    'app.feature'
  ]);

  angular.module('app').config([
    '$logProvider', 'LOG', '$locationProvider',
    function($logProvider, log, $locationProvider) {
      // Enable or disable debug logging
      $logProvider.debugEnabled(log.ENABLE_DEBUG);

      $locationProvider.html5Mode(true);
    }
  ]);

  // CONFIG SETTINGS
  angular.module('app.config', [])
    // Log settings
    .constant('LOG', {
      ENABLE_DEBUG: true
    });
})();
