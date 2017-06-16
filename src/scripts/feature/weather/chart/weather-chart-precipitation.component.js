(function() {
  'use strict';

  angular.module('app.feature.weather').component('mmWeatherChartPrecipitation', {
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
            title: 'Niederschlagsvorhersage (5 Tage)',
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
              showgrid: true,
              linecolor: foregroundColor,
              linewidth: 3
            },
            yaxis: {
              //title: 'Niederschlagsmenge',
              range: [0, 100],
              linecolor: foregroundColor,
              linewidth: 3,
              tickfont: createFont(18),
              ticksuffix: ' l/m²'
            },
            margin: {
              t: 75,
              l: 75,
              b: 75,
              r: 75
            }
          },
          options: {
            staticPlot: true
          },
          data: [{
            type: 'bar',
            orientation: 'v',
            x: [],
            y: [],
            marker: {
              color: '#2E9AFE'
            }
          }]
        };

        _owmWeatherFactory.getDailyForecast(function(forecast) {
          var dailyForecast = _owmWeatherService.fromDailyForecast(forecast);
          angular.forEach(dailyForecast.dailyForecasts, function(value) {
            this.x.push($filter('date')(value.date, 'shortDate'));
            this.y.push(value.rainVolumeInLastThreeHours || value.snowVolumeInLastThreeHours);
          }, vm.chart.data[0]);
        });
      }
    ]
  });
})();
