(function() {
    'use strict';
    angular.module('core').factory('focusElem', [
        '$rootScope',
        '$timeout',
        function(
          $rootScope,
          $timeout
        ) {
            return function(name) {
                $timeout(function() {
                    $rootScope.$broadcast('coppelFocusOn', name);
                });
            };
        }
    ]);
})();
