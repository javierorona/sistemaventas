(function() {
    'use strict';
    //Setting up route
    angular.module('configuracion').config([
        '$stateProvider',
        function($stateProvider) {
            // Configuracion state routing
            $stateProvider
            .state('app.configuracion', {
                ncyBreadcrumb: {
                    label: 'Configuracion'
                },
                url: '/configuracion',
                views: {
                    'content@app': {
                        controller: 'Configuracion',
                        controllerAs: 'vm',
                        templateUrl: '/app/modules/configuracion/views/configuracion.view.html'
                    }
                }
            });
        }
    ]);
})();
