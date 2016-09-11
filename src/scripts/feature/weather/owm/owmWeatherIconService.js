(function() {
  'use strict';

  angular.module('app.feature.weather').service('_owmWeatherIconService', [
    '$log',
    function() {
      var isNight = function() {
        return false;
      };

      this.fromIconId = function(iconId, dateTime) {
        if (!angular.isDefined(dateTime) || dateTime === null) {
          return 'wi wi-fw ' + (!angular.isDefined(iconId) ? 'wi-na' : 'wi-owm-' + iconId);
        }
        return 'wi wi-fw ' + (!angular.isDefined(iconId)
          ? 'wi-na'
          : 'wi-owm-' + isNight()
            ? 'night-'
            : 'day-' + iconId);
      };

      this.fromWindDirection = function(degrees) {
        return !angular.isNumber(degrees)
          ? 'wi wi-fw wi-wind wi-na'
          : 'wi wi-fw wi-wind from-' + Math.round(degrees) % 360 + '-deg';
      };
    }
  ]);
})();
