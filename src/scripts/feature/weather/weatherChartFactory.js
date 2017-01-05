(function() {
  'use strict';

  angular.module('app.feature.weather').factory('_weatherChartFactory', [
    function() {
      return {
        createTemperatureLayout: function() {
          return {
            paper_bgcolor: '#000',
            yaxis: {
              range: [-20, 45]
            }
          }
        },
        createRainfallLayout: function() {
          return {
            paper_bgcolor: '#000',
            yaxis: {
              range: [0, 100]
            }
          }
        },
        createOptions: function() {
          return {
            staticPlot: true
          }
        }
      }
    }
  ]);
})();
