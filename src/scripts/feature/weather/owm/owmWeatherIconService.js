(function() {
  'use strict';

  angular.module('app.feature.weather').service('_owmWeatherIconService', [
    '$log',
    function($log) {
      var isNight = function(dateTime) {
        return false;
      };

      this.fromIconId = function(iconId, dateTime) {
        if (!angular.isDefined(dateTime) || dateTime === null) {
          return 'wi wi-fw ' + (!angular.isDefined(iconId) ? 'wi-na' : 'wi-owm-' + iconId);
        }
        return 'wi wi-fw ' + (!angular.isDefined(iconId) ? 'wi-na' : 'wi-owm-' + isNight() ? 'night-' : 'day-' + iconId);
      };

      this.fromWindDirection = function(degrees) {
        if (!angular.isNumber(degrees)) {
          return 'wi wi-fw wi-na';
        }

        if (degrees > 360) {
          degrees = degrees % 360;
        }

        if (degrees > 337.5 && degrees <= 22.5) {
          return 'wi-from-n';
        }
        if (degrees > 22.5 && degrees <= 67.5) {
          return 'wi-from-ne';
        }
        if (degrees > 67.5 && degrees <= 112.5) {
          return 'wi-from-e';
        }
        if (degrees > 112.5 && degrees <= 157.5) {
          return 'wi-from-se';
        }
        if (degrees > 157.5 && degrees <= 202.5) {
          return 'wi-from-s';
        }
        if (degrees > 202.5 && degrees <= 247.5) {
          return 'wi-from-sw';
        }
        if (degrees > 247.5 && degrees <= 292.5) {
          return 'wi-from-w';
        }
        if (degrees > 292.5 && degrees <= 337.5) {
          return 'wi-from-nw';
        } else {
          $log.warn('Unknown wind direction: ' + degrees);
          return 'wi wi-fw wi-na';
        }
      };
    }
  ]);
})();
