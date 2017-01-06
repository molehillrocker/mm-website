(function() {
  'use strict';

  angular.module('app.feature.weather', ['ngResource', 'plotly'])
    .constant('WEATHER_SETTINGS', {
      OPEN_WEATHER_MAP: {
        BASE_URI: 'http://api.openweathermap.org/data/2.5',
        API_KEY: 'ADD_API_KEY_HERE',
        // Frankenthal
        CITY_ID: 2925550,
        // Baiersbronn
        //CITY_ID: 2953197,
        LANGUAGE_ID: 'de',
        UNITS: 'metric'
      }
    });
})();
