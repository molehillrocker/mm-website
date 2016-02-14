(function() {
  'use strict';

  angular.module('app.feature.weather').factory('OpenWeatherMapFactory', [
    '$log', '$resource',
    function($log, $resource) {
      const BASE_URI = 'http://api.openweathermap.org/data/2.5';
      // TODO: Set these in the configuration
      var cityId = '2925550';
      var units = 'metric';
      var languageId = 'de';
      var apiKey = '<api-key>';

      var _dateTimeReviver = function(key, value) {
        if (key === 'dt' && angular.isNumber(value)) {
          // NOTE: DateTime is a unix timestamp in seconds, so multiply with 1000 to get milliseconds
          return new Date(value * 1000);
        }
        return value;
      };

      return $resource(BASE_URI + '/:intent/:subIntent', {
        id: cityId,
        units: units,
        lang: languageId,
        appid: apiKey
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
