(function() {
  'use strict';

  angular.module('app.feature.weather').controller('WeatherController', [
    '$log', '$scope', 'OpenWeatherMapFactory',
    function($log, $scope, OpenWeatherMapFactory) {
      var WeatherInfo = OpenWeatherMapFactory.getWeatherInfo(function() {
        $scope.weatherInfo = WeatherInfo;
      });

      var WeatherForecast = OpenWeatherMapFactory.getWeatherForecast(function() {
        $scope.weatherForecast = WeatherForecast;
      });
    }
  ]);
})();
