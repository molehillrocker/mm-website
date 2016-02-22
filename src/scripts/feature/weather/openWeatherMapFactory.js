(function() {
  'use strict';

  angular.module('app.feature.weather').factory('OpenWeatherMapFactory', [
    '$log', '$resource', 'WEATHER_SETTINGS',
    function($log, $resource, weatherSettings) {
      var owmSettings = weatherSettings.OPEN_WEATHER_MAP;

      var _dateTimeReviver = function(key, value) {
        if (angular.isNumber(value) && (key === 'dt' || key === 'sunrise' || key === 'sunset')) {
          // NOTE: DateTime is a unix timestamp in seconds, so multiply with 1000 to get milliseconds
          return new Date(value * 1000);
        }
        return value;
      };

      return $resource(owmSettings.BASE_URI + '/:intent/:subIntent', {
        id: owmSettings.CITY_ID,
        units: owmSettings.UNITS,
        lang: owmSettings.LANGUAGE_ID,
        appid: owmSettings.API_KEY
      }, {
        getWeatherInfo: {
          method: 'GET',
          params: {
            intent: 'weather'
          },
          isArray: false,
          transformResponse: function(data) {
            return JSON.parse(data, _dateTimeReviver);
          }
        },
        getWeatherForecast: {
          method: 'GET',
          params: {
            intent: 'forecast',
            subIntent: 'daily',
            cnt: 5
          },
          isArray: false,
          transformResponse: function(data) {
            return JSON.parse(data, _dateTimeReviver);
          }
        }
      });
    }
  ]);
})();
