(function() {
  'use strict';

  angular.module('app.feature.weather').service('_weatherIconService', [
    '$log',
    function($log) {
      var isDayTime = function(iconId) {
        return iconId.endsWith('d');
      };

      this.fromOpenWeatherMapIconId = function(id) {
        var iconClass = '';

        // TODO:  Better rely on int-based id instead of image name
        if (!angular.isDefined(id) || !angular.isString(id)) {
          iconClass = 'wi-na';
        } else if (id.startsWith('01')) {
          iconClass = isDayTime(id) ? 'wi-day-sunny' : 'wi-night-clear';
        } else if (id.startsWith('02')) {
          iconClass = isDayTime(id) ? 'wi-day-sunny-overcast' : 'wi-night-partly-cloudy';
        } else if (id.startsWith('03')) {
          iconClass = isDayTime(id) ? 'wi-day-cloudy' : 'wi-night-alt-cloudy';
        } else if (id.startsWith('04')) {
          iconClass = isDayTime(id) ? 'wi-day-cloudy-high' : 'wi-night-alt-cloudy-high';
        } else if (id.startsWith('09')) {
          iconClass = isDayTime(id) ? 'wi-day-showers' : 'wi-night-alt-showers';
        } else if (id.startsWith('10')) {
          iconClass = isDayTime(id) ? 'wi-day-rain' : 'wi-night-alt-rain';
        } else if (id.startsWith('11')) {
          iconClass = isDayTime(id) ? 'wi-day-thunderstorm' : 'wi-night-alt-thunderstorm';
        } else if (id.startsWith('13')) {
          iconClass = isDayTime(id) ? 'wi-day-snow' : 'wi-night-alt-snow';
        } else if (id.startsWith('50')) {
          iconClass = isDayTime(id) ? 'wi-day-fog' : 'wi-night-fog';
        } else {
          $log.warn('Unknown OpenWeatherMap icon id: ' + id);
          iconClass = 'wi-na';
        }

        return 'wi wi-fw ' + iconClass;
      };
    }
  ]);
})();
