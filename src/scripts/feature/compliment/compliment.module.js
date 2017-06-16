(function() {
  'use strict';

  angular.module('app.feature.compliment', [])
    .constant('COMPLIMENT_SETTINGS', [{
      name: 'MORNING',
      fromHour: 6,
      toHour: 10
    }, {
      name: 'NOON',
      fromHour: 10,
      toHour: 13
    }, {
      name: 'AFTERNOON',
      fromHour: 13,
      toHour: 18
    }, {
      name: 'EVENING',
      fromHour: 18,
      toHour: 0
    }, {
      name: 'NIGHT',
      fromHour: 0,
      toHour: 6
    }]);
})();
