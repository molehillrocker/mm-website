(function() {
  'use strict';

  angular.module('app.feature.weather').controller('WeatherController', [
    '$log', '$scope', '_owmWeatherFactory', '_owmWeatherService', '_owmWeatherIconService',
    function($log, $scope, _owmWeatherFactory, _owmWeatherService, _owmWeatherIconService) {

      var WeatherInfo = _owmWeatherFactory.getWeatherInfo(function() {
        var currentWeatherInfo = _owmWeatherService.fromOpenWeatherMapWeatherInfo(WeatherInfo);
        $scope.currentWeatherInfo = currentWeatherInfo;
        $scope.currentWeatherIconClass = _owmWeatherIconService.fromOpenWeatherMapIconId(currentWeatherInfo.weather.iconId);
      });

      var WeatherForecast = _owmWeatherFactory.getWeatherForecast(function() {
        $scope.weatherForecast = _owmWeatherService.fromOpenWeatherMapDailyForecastInfo(WeatherForecast);
      });
    }
  ]);
})();
