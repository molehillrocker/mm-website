(function() {
  'use strict';

  angular.module('app.feature.weather').controller('WeatherController', [
    '$log', '$scope', 'OpenWeatherMapFactory', '_weatherService', '_weatherIconService',
    function($log, $scope, OpenWeatherMapFactory, _weatherService, _weatherIconService) {

      var WeatherInfo = OpenWeatherMapFactory.getWeatherInfo(function() {
        var currentWeatherInfo = _weatherService.fromOpenWeatherMapWeatherInfo(WeatherInfo);
        $scope.currentWeatherInfo = currentWeatherInfo;
        $scope.currentWeatherIconClass = _weatherIconService.fromOpenWeatherMapIconId(currentWeatherInfo.weather.iconName);
      });

      var WeatherForecast = OpenWeatherMapFactory.getWeatherForecast(function() {
        $scope.weatherForecast = _weatherService.fromOpenWeatherMapDailyForecastInfo(WeatherForecast);
      });
    }
  ]);
})();
