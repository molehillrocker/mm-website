(function() {
  'use strict';

  angular.module('app.feature.weather').component('mmWeatherInfo', {
    templateUrl: '/views/weatherInfo.html',
    controllerAs: 'vm',
    controller: [
      '$log', '$interval', '_owmWeatherFactory', '_owmWeatherService', '_owmWeatherIconService',
      function($log, $interval, _owmWeatherFactory, _owmWeatherService, _owmWeatherIconService) {
        var vm = this;

        var fetchWeatherInfo = function() {
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
        };

        // Update the weather information every 15 minutes in an endless loop
        var weatherInfoInterval = $interval(fetchWeatherInfo, 1500000);

        this.$onInit = function() {
          // Set the current date and time on startup
          fetchWeatherInfo();
        }

        this.$onDestroy = function() {
          $interval.cancel(weatherInfoInterval);
        };
      }
    ]
  });
})();
