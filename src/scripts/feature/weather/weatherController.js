(function() {
  'use strict';

  angular.module('app.feature.weather').controller('WeatherController', [
    '$log', '$scope', '_owmWeatherFactory', '_owmWeatherService', '_owmWeatherIconService',
    function($log, $scope, _owmWeatherFactory, _owmWeatherService, _owmWeatherIconService) {

      var currentWeather = _owmWeatherFactory.getCurrentWeather(function() {
        var currentWeatherInfo = _owmWeatherService.fromCurrentWeather(currentWeather);
        $scope.currentWeatherInfo = currentWeatherInfo;
        $scope.currentWeatherIconClass = _owmWeatherIconService.fromIconId(currentWeatherInfo.weather.iconId);
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
