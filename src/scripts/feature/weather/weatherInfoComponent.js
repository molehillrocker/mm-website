(function() {
  'use strict';

  angular.module('app.feature.weather').component('mmWeatherInfo', {
    templateUrl: '/views/weatherInfo.html',
    controllerAs: 'vm',
    controller: [
      '$log', '_owmWeatherFactory', '_owmWeatherService', '_owmWeatherIconService',
      function($log, _owmWeatherFactory, _owmWeatherService, _owmWeatherIconService) {
        var vm = this;
        _owmWeatherFactory.getCurrentWeather(function(currentWeather) {
          var currentWeatherInfo = _owmWeatherService.fromCurrentWeather(currentWeather);

          vm.weatherIcon = _owmWeatherIconService.fromIconId(currentWeatherInfo.weather.iconId);
          vm.windIcon = _owmWeatherIconService.fromWindDirection(currentWeatherInfo.wind.direction);
          vm.location = currentWeatherInfo.name;
          vm.windSpeed = currentWeatherInfo.wind.speed;
          vm.sunrise = currentWeatherInfo.sunrise;
          vm.sunset = currentWeatherInfo.sunset;
          vm.temperature = currentWeatherInfo.weather.temperature;
          vm.humidity = currentWeatherInfo.weather.humidity;
          vm.precipitation = currentWeatherInfo.rainVolumeInLastThreeHours ||
            currentWeatherInfo.snowVolumeInLastThreeHours || 0;
        });
      }
    ]
  });
})();
