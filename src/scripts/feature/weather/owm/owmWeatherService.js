(function() {
  'use strict';

  angular.module('app.feature.weather').service('_owmWeatherService', [
    '$log',
    function($log) {
      var getWindDirection = function(degrees) {
        if (!angular.isNumber(degrees)) {
          return 'N/A';
        }
        if (degrees > 360) {
          degrees = degrees % 360;
        }
        if ((degrees > 337.5 && degrees <= 360) || (degrees >= 0 && degrees <= 22.5)) {
          return 'N';
        }
        if (degrees > 22.5 && degrees <= 67.5) {
          return 'NE';
        }
        if (degrees > 67.5 && degrees <= 112.5) {
          return 'E';
        }
        if (degrees > 112.5 && degrees <= 157.5) {
          return 'SE';
        }
        if (degrees > 157.5 && degrees <= 202.5) {
          return 'S';
        }
        if (degrees > 202.5 && degrees <= 247.5) {
          return 'SW';
        }
        if (degrees > 247.5 && degrees <= 292.5) {
          return 'W';
        }
        if (degrees > 292.5 && degrees <= 337.5) {
          return 'NW';
        } else {
          throw 'Unknown wind direction: ' + degrees;
        }
      };

      this.fromCurrentWeather = function(data) {
        if (!angular.isDefined(data) || data === null) {
          return {};
        }

        var weatherInfo = {
          name: data.name,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          updateTimeStamp: data.dt,
          coordinates: {
            lat: data.coord.lat,
            lng: data.coord.lon
          },
          weather: {
            iconId: data.weather[0].id,
            category: data.weather[0].main,
            description: data.weather[0].description,
            temperature: data.main.temp,
            // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
            temperatureMin: data.main.temp_min,
            // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
            temperatureMax: data.main.temp_max,
            pressure: data.main.pressure,
            // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
            pressureSeaLevel: data.main.sea_level,
            // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
            pressureGroundLevel: data.main.ground_level,
            humidity: data.main.humidity,
          },
          wind: {
            direction: getWindDirection(data.wind.deg),
            speed: data.wind.speed
          },
          cloudiness: data.clouds.all
        };

        // These two seem to be optional...
        if (angular.isDefined(data.rain) && data.rain !== null) {
          weatherInfo.rainVolumeInLastThreeHours = data.rain['3h'];
        }
        if (angular.isDefined(data.snow) && data.snow !== null) {
          weatherInfo.snowVolumeInLastthreeHours = data.snow['3h'];
        }

        return weatherInfo;
      };

      this.fromDailyForecast = function(data) {
        if (!angular.isDefined(data) || data === null) {
          return {};
        }

        var forecastInfo = {
          name: data.city.name,
          // sunrise: data.sys.sunrise,
          // sunset: data.sys.sunset,
          updateTimeStamp: data.dt,
          coordinates: {
            lat: data.city.coord.lat,
            lng: data.city.coord.lon
          },
          dailyForecasts: []
        };

        for (var i = 0; i < data.list.length; i++) {
          var entry = data.list[i];
          var dailyForecast = {
            date: entry.dt,
            weather: {
              category: entry.weather[0].main,
              description: entry.weather[0].description,
              temperatureDay: entry.temp.day,
              temperatureMin: entry.temp.min,
              temperatureMax: entry.temp.max,
              temperatureMorning: entry.temp.morn,
              temperatureEvening: entry.temp.eve,
              temperatureNight: entry.temp.night,
              pressure: entry.pressure,
              // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
              //pressureSeaLevel: entry.main.sea_level,
              // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
              // pressureGroundLevel: entry.main.ground_level,
              humidity: entry.humidity,
            },
            wind: {
              direction: 'N/A',
              speed: entry.speed
            },
            cloudiness: entry.clouds.all
          };

          // These two seem to be optional...
          if (angular.isDefined(entry.rain) && entry.rain !== null) {
            dailyForecast.rainVolumeInLastThreeHours = data.rain;
          }
          if (angular.isDefined(entry.snow) && entry.snow !== null) {
            dailyForecast.snowVolumeInLastthreeHours = entry.snow;
          }

          forecastInfo.dailyForecasts.push(dailyForecast);
        }

        return forecastInfo;
      };
    }
  ]);
})();
