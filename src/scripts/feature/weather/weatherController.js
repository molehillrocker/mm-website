(function() {
  'use strict';

  angular.module('app.feature.weather').controller('WeatherController', [
    '$log', '$scope', '_owmWeatherFactory', '_owmWeatherService', '_owmWeatherIconService',
    function($log, $scope, _owmWeatherFactory, _owmWeatherService, _owmWeatherIconService) {

      var currentWeather = _owmWeatherFactory.getCurrentWeather(function() {
        var currentWeatherInfo = _owmWeatherService.fromCurrentWeather(currentWeather);
        $scope.weatherIcon = _owmWeatherIconService.fromIconId(currentWeatherInfo.weather.iconId);
        $scope.windIcon = _owmWeatherIconService.fromWindDirection(currentWeatherInfo.wind.direction);
        $scope.location = currentWeatherInfo.name;
        $scope.windSpeed = currentWeatherInfo.wind.speed;
        $scope.sunrise = currentWeatherInfo.sunrise;
        $scope.sunset = currentWeatherInfo.sunset;
        $scope.temperature = currentWeatherInfo.weather.temperature;
        $scope.humidity = currentWeatherInfo.weather.humidity;
        $scope.precipitation = currentWeatherInfo.rainVolumeInLastThreeHours ||
          currentWeatherInfo.snowVolumeInLastThreeHours || 0;
      });

      var dailyForecast = _owmWeatherFactory.getDailyForecast(function() {
        $scope.dailyForecast = _owmWeatherService.fromDailyForecast(dailyForecast);
      });

      var threeHourlyForecast = _owmWeatherFactory.getThreeHourlyForecast(function() {
        $scope.threeHourlyForecast = _owmWeatherService.fromThreeHourlyForecast(threeHourlyForecast);
      });
    }
  ]);
})();
