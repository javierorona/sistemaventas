(function() {
    'use strict';
    angular.module('ventas').factory('Servventas', [
        '$http',
        '$q',
        'Config',
        function(
            $http, 
            $q, 
            Config
        ) {
            var consultarVentas = function() {
                return $http({
                    method: 'GET',
                    url: Config.api + '/ventas'
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

            var consultarFolio = function() {
                return $http({
                    method: 'GET',
                    url: Config.api + '/folio'
                }).then(
                    function(response) {
                        return response.data.data.response;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };

            var obtenerConfirugacion = function() {
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

            var obtenerConfirugacion = function() {
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

            var validarExistencia = function(articulo) {
                return $http({
                    method: 'GET',
                    url: Config.api + '/existencia/'+ articulo
                }).then(
                    function(response) {
                        return response.data.data.response;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };

            var obtenerDatosCliente = function() {
                return $http({
                    method: 'GET',
                    url: Config.api + '/datoscliente'
                }).then(
                    function(response) {
                        return response.data.data.response;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };

            var obtenerDatosArticulo = function() {
                return $http({
                    method: 'GET',
                    url: Config.api + '/datosarticulo'
                }).then(
                    function(response) {
                        return response.data.data.response;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };

            var actualizarExistencia = function(articulo, cantidad, sumar) {
                return $http({
                    method: 'PUT',
                    url: Config.api + '/existencia/'+ articulo+'/'+cantidad+'/'+sumar
                }).then(
                    function(response) {
                        return response.data.data.response;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };
            var grabarVenta = function(objeto) {
                return $http({
                    method: 'PUT',
                    url: Config.api + '/venta',
                    data:objeto
                }).then(
                    function(response) {
                        return response.data.data.response;
                    },
                    function(response) {
                        return $q.reject(response);
                    }
                );
            };

            var eliminarVenta = function(folio) {
                return $http({
                    method: 'DELETE',
                    url: Config.api + '/venta/'+folio
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
                consultarVentas: consultarVentas,
                consultarFolio: consultarFolio,
                obtenerConfirugacion: obtenerConfirugacion,
                validarExistencia: validarExistencia,
                actualizarExistencia: actualizarExistencia,
                grabarVenta: grabarVenta,
                obtenerDatosCliente: obtenerDatosCliente,
                obtenerDatosArticulo: obtenerDatosArticulo,
                eliminarVenta: eliminarVenta
            };
        }
    ]);
})();
