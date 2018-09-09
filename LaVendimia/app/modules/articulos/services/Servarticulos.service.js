(function() {
    'use strict';
    angular.module('articulos').factory('Servarticulos', [
        '$http',
        '$q',
        'Config',
        function(
            $http, 
            $q, 
            Config
        ) {
            var consultarArticulos = function() {
                return $http({
                    method: 'GET',
                    url: Config.api + '/articulos'
                    //data:parametros,
                }).then(
                    function(response) {
                        return response.data.data.response;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };

            var obtenerSiguiente = function() {
                return $http({
                    method: 'GET',
                    url: Config.api + '/idarticulo'
                    //data:parametros,
                }).then(
                    function(response) {
                        return response.data.data.response;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };

            var guardarArticulo = function(actualiza, descripcion, modelo, precio, existencia, id) {
                return $http({
                    method: 'PUT',
                    url: Config.api + '/articulo/'+actualiza+'/'+descripcion+'/'+modelo+'/'+precio+'/'+existencia+'/'+id
                    //data:parametros,
                }).then(
                    function(response) {
                        return response.data.data.response;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };

            var eliminarArticulo = function(id) {
                return $http({
                    method: 'DELETE',
                    url: Config.api + '/articulo/'+id
                    //data:parametros,
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
                consultarArticulos: consultarArticulos,
                obtenerSiguiente: obtenerSiguiente,
                guardarArticulo: guardarArticulo,
                eliminarArticulo: eliminarArticulo
            };
        }
    ]);
})();
