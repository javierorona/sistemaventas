(function() {
    'use strict';
    angular.module('core').factory('requestHuella', [
        '$http',
        '$q',
        'Config',
        function(
          $http,
          $q,
          Config
        ) {
            var huella = function() {
              
                return $http({
                    method: 'GET',
                    url: Config.webbridge
                }).then(
                    function(response) {

                        return response.data;
                    },
                    function(_response) {
                        var error = {'error': 'Verificar que se encuentre instalado el servicio de Huella (WebBridge)'};

                        return $q.reject(error);
                    }
                );
            };

            return {
                huella: huella
            };
        }
    ]);
})();
