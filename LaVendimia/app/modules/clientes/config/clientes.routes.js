(function() {
    'use strict';
    //Setting up route
    angular.module('clientes').config([
        '$stateProvider',
        function($stateProvider) {
            // Clientes state routing
            $stateProvider
            .state('app.clientes', {
                ncyBreadcrumb: {
                    label: 'Clientes'
                },
                url: '/clientes',
                views: {
                    'content@app': {
                        controller: 'Clientes',
                        controllerAs: 'vm',
                        templateUrl: '/app/modules/clientes/views/clientes.view.html'
                    }
                }
            });
        }
    ]);
})();
