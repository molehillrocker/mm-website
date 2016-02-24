(function() {
  'use strict';

  angular.module('app.feature.weather').service('_weatherIconService', [
    '$log',
    function($log) {
      var isNight = function(dateTime) {
        return false;
      };

      this.fromOpenWeatherMapIconId = function(iconId, dateTime) {
        if (!angular.isDefined(dateTime) || dateTime === null) {
          return 'wi wi-fw ' + (!angular.isDefined(iconId) ? 'wi-na' : 'wi-owm-' + iconId);
        }
        return 'wi wi-fw ' + (!angular.isDefined(iconId) ? 'wi-na' : 'wi-owm-' + isNight() ? 'night-' : 'day-' + iconId);
      };
    }
  ]);
})();
