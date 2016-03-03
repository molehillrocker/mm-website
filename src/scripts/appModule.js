(function() {
  'use strict';

  angular.module('app', [
    'app.config',
    'app.core',
    'app.feature',
    'ngMaterial'
  ]);

  angular.module('app').config([
    '$logProvider', 'LOG', '$locationProvider', '$mdThemingProvider',
    function($logProvider, log, $locationProvider, $mdThemingProvider) {
      // Enable or disable debug logging
      $logProvider.debugEnabled(log.ENABLE_DEBUG);

      $locationProvider.html5Mode(false);
      var mmBlack = $mdThemingProvider.extendPalette('grey', {
        '50': '000000',
        '100': '000000',
        '200': '000000',
        '300': '000000',
        '400': '000000',
        '500': '000000',
        '600': '000000',
        '700': '000000',
        '800': '000000',
        '900': '000000',
        'A100': '000000',
        'A200': '000000',
        'A400': '000000',
        'A700': '000000'
      });

      $mdThemingProvider.definePalette('mm-black', mmBlack);

      $mdThemingProvider.theme('default')
        .dark()
        .backgroundPalette('mm-black');
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
    })
    .constant('COMPLIMENT_SETTINGS', [{
      name: 'MORNING',
      fromHour: 6,
      toHour: 10,
      compliments: ['Good morning!']
    }, {
      name: 'NOON',
      fromHour: 10,
      toHour: 13,
      compliments: ['Lunch... yay!']
    }, {
      name: 'AFTERNOON',
      fromHour: 13,
      toHour: 18,
      compliments: ['Good afternoon!']
    }, {
      name: 'EVENING',
      fromHour: 18,
      toHour: 0,
      compliments: ['Good evening!']
    }, {
      name: 'NIGHT',
      fromHour: 0,
      toHour: 6,
      compliments: ['You should sleep!']
    }]);
})();
