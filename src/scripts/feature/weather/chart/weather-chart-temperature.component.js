(function() {
  'use strict';

  angular.module('app.feature.weather').component('mmWeatherChartTemperature', {
    template: '<plotly plotly-layout="vm.chart.layout" plotly-data="vm.chart.data" plotly-options="vm.chart.options">' +
      '</plotly>',
    controllerAs: 'vm',
    controller: [
      '$log', '$filter', '_owmWeatherFactory', '_owmWeatherService',
      function($log, $filter, _owmWeatherFactory, _owmWeatherService) {
        var vm = this;
        var backgroundColor = 'rgb(0,0,0)';
        var foregroundColor = 'rgb(255,255,255)';

        var createFont = function(size, color, family) {
          return {
            size: size || 20,
            color: color || foregroundColor,
            family: family || 'Ubuntu'
          };
        };

        vm.chart = {
          layout: {
            title: 'Temperaturvorhersage (5 Tage)',
            titlefont: {
              family: 'Ubuntu',
              size: 24,
              color: foregroundColor
            },
            paper_bgcolor: backgroundColor,
            plot_bgcolor: backgroundColor,
            xaxis: {
              //title: 'Datum',
              titlefont: createFont(),
              tickfont: createFont(18),
            },
            yaxis: {
              //title: 'Temperatur (°C)',
              titlefont: createFont(),
              tickfont: createFont(18),
              ticksuffix: ' °C',
              range: [-25, 50]
            },
            margin: {
              t: 50,
              l: 50,
              b: 50,
              r: 50
            },
            zerolinecolor: '#FFAA00',
          },
          options: {
            staticPlot: true
          },
          data: [{
            type: 'scatter',
            x: [],
            y: [],
            line: {
              shape: 'spline',
              color: foregroundColor,
              width: 4
            },
            marker: {
              size: 10,
              color: foregroundColor
            }
          }]
        };

        _owmWeatherFactory.getDailyForecast(function(forecast) {
          var dailyForecast = _owmWeatherService.fromDailyForecast(forecast);
          angular.forEach(dailyForecast.dailyForecasts, function(value) {
            this.x.push($filter('date')(value.date, 'shortDate'));
            this.y.push(value.weather.temperatureDay);
          }, vm.chart.data[0]);
        });
      }
    ]
  });
})();
