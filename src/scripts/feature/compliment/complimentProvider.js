(function() {
  'use strict';

  angular.module('app.feature.compliment').factory('_complimentProvider', [
    '$log', '$q', '$http', 'COMPLIMENT_SETTINGS',
    function($log, $q, $http, complimentSettings) {
      var sanitizeHour = function(hour) {
        return angular.isNumber(hour) ? hour % 24 : new Date().getHours();
      };

      var getRandomComplimentForSlot = function(complimentSlotName) {
        if (!angular.isString(complimentSlotName)) {
          $log.error('The name of the compliment slot must be a String! Using "N/A" as fallback.');
          return 'N/A';
        }

        return $http.get('/assets/data/compliments.json')
          .then(function(response) {
            if (!response || !response.data) {
              return $q.reject('Response is invalid!');
            }

            var compliments = response.data[complimentSlotName];
            if (angular.isUndefined(compliments) || compliments === null) {
              return $q.reject('Could not find compliment slot with name "' + complimentSlotName + '"!');
            }

            if (!angular.isArray(compliments)) {
              return $q.reject('Compliment slot is malformed (must be an array)!');
            }

            var randomIndex = Math.floor(Math.random() * compliments.length);
            return $q.resolve(compliments[randomIndex]);
          })
          .catch(function() {
            return $q.reject('Could not load compliments from server!');
          });
      };

      var getComplimentSlotName = function(hour) {
        if (!angular.isArray(complimentSettings)) {
          $log.error('No compliments have been configured.');
          return '';
        }

        for (var i = 0; i < complimentSettings.length; i++) {
          var setting = complimentSettings[i];
          if ((setting.fromHour >= setting.toHour && hour >= setting.fromHour) ||
            (hour >= setting.fromHour && hour < setting.toHour)) {
            return setting.name;
          }
        }

        $log.warn('Could not find a compliment slot that matches the current hour: ' + hour);
        return '';
      };

      return {
        provide: function(hour) {
          hour = sanitizeHour(hour);
          var complimentSlotName = getComplimentSlotName(hour);
          return getRandomComplimentForSlot(complimentSlotName);
        }
      };
    }
  ]);
})();
