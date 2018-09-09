(function() {
    'use strict';
    angular.module('clientes').factory('Servclientes', [
        '$http',
        '$q',
        'Config',
        function(
            $http, 
            $q, 
            Config
        ) {
            var consultarClientes = function() {
                return $http({
                    method: 'GET',
                    url: Config.api + '/clientes'
                }).then(
                    function(response) {
                        return response.data.data.response;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };

            var consultarIdCliente = function() {
                return $http({
                    method: 'GET',
                    url: Config.api + '/idcliente'
                }).then(
                    function(response) {
                        return response.data.data.response;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };

            var guardarCliente = function(actualizar, nombre, apPaterno, apMaterno, rfc, id) {
                return $http({
                    method: 'PUT',
                    url: Config.api + '/cliente/'+actualizar+'/'+nombre+'/'+apPaterno+'/'+apMaterno+'/'+rfc+'/'+id
                }).then(
                    function(response) {
                        return response.data.data.response;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };

            var eliminarCliente = function(id) {
                return $http({
                    method: 'DELETE',
                    url: Config.api + '/cliente/'+id
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
                consultarClientes: consultarClientes,
                consultarIdCliente: consultarIdCliente,
                guardarCliente: guardarCliente,
                eliminarCliente: eliminarCliente
            };
        }
    ]);
})();
