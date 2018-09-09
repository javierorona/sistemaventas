(function() {
    'use strict';
    angular.module('menu').factory('servicioMenu', [
        '$http',
        '$q',
        function(
          $http,
          $q
        ) {
            var getMenu = function() {
                return $http({
                    method: 'GET',
                    url: 'app/modules/menu/services/menu.json'
                }).then(
                    function(response) {

                        return response.data;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };

            return {
                getMenu: getMenu
            };
        }
    ]);
})();
