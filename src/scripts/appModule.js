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

      $locationProvider.html5Mode(false);
    }
  ]);

  // CONFIG SETTINGS
  angular.module('app.config', [])
    // Log settings
    .constant('LOG', {
      ENABLE_DEBUG: true
    })
    .constant('WEATHER_SETTINGS', {
      OPEN_WEATHER_MAP: {
        BASE_URI: 'http://api.openweathermap.org/data/2.5',
        API_KEY: '<api-key>',
        CITY_ID: '2925550',
        LANGUAGE_ID: 'de',
        UNITS: 'metric'
      }
    });
})();
