(function() {
    'use strict';
    angular.module('configuracion').factory('Servconfig', [
        '$http',
        '$q',
        'Config',
        function(
            $http, 
            $q, 
            Config
        ) {
            var someMethod = function() {
                return $http({
                    method: 'GET',
                    url: Config.api + '/recurso'
                    //data:parametros,
                }).then(
                    function(response) {
                        return response.data;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };

            var cargarConfig = function() {
                return $http({
                    method: 'GET',
                    url: Config.api + '/configuracion'
                }).then(
                    function(response) {
                        return response.data.data.response;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };

            var guardarConfig = function(estatus, tasa, porcentaje, plazo) {
                return $http({
                    method: 'PUT',
                    url: Config.api + '/configuracion/'+estatus+'/'+tasa+'/'+porcentaje+'/'+plazo
                }).then(
                    function(response) {
                        return response.data.data.response;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };
            // Public API
            return {
                someMethod: someMethod,
                cargarConfig: cargarConfig,
                guardarConfig: guardarConfig
            };
        }
    ]);
})();
