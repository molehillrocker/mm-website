(function() {
  'use strict';

  angular.module('app.feature.compliment').factory('_complimentProvider', [
    '$log', 'COMPLIMENT_SETTINGS',
    function($log, complimentSettings) {
      var getRandomCompliment = function(compliments) {
        if (!angular.isArray(compliments)) {
          $log.error('No compliments have been configured. Using "N/A" as fallback.');
        }

        var randomIndex = Math.floor(Math.random() * compliments.length);
        return compliments[randomIndex];
      };

      var getComplimentSlot = function(hour) {
        if (!angular.isArray(complimentSettings)) {
          $log.error('Not compliments have been configured. Using "N/A" as fallback.');
        }

        for (var i = 0; i < complimentSettings.length; i++) {
          var setting = complimentSettings[i];
          if (setting.fromHour >= setting.toHour && hour >= setting.fromHour) {
            return setting;
          }
          if (hour >= setting.fromHour && hour < setting.toHour) {
            return setting;
          }
        }

        $log.warn('Could not find a time slot that matches the current hour: ' + hour);
        return [];
      };

      return {
        provide: function(hour) {
          if (!angular.isNumber(hour)) {
            hour = new Date().getHours();
          } else {
            hour = hour % 24;
          }

          var complimentSlot = getComplimentSlot(hour);
          return getRandomCompliment(complimentSlot.compliments);
        }
      };
    }
  ]);
})();
