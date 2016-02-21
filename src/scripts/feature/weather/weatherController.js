(function() {
  'use strict';

  angular.module('app.feature.weather').controller('WeatherController', [
    '$log', '$scope', 'OpenWeatherMapFactory', '_weatherService',
    function($log, $scope, OpenWeatherMapFactory, _weatherService) {
      var WeatherInfo = OpenWeatherMapFactory.getWeatherInfo(function() {
        $scope.weatherInfo = _weatherService.fromOpenWeatherMapWeatherInfo(WeatherInfo);
      });

      var WeatherForecast = OpenWeatherMapFactory.getWeatherForecast(function() {
        $scope.weatherForecast = _weatherService.fromOpenWeatherMapDailyForecastInfo(WeatherForecast);
      });
    }
  ]);
})();
