(function() {
    'use strict';
    //Setting up route
    angular.module('ventas').config([
        '$stateProvider',
        function($stateProvider) {
            // Ventas state routing
            $stateProvider
            .state('app.ventas', {
                ncyBreadcrumb: {
                    label: 'Ventas'
                },
                url: '/ventas',
                views: {
                    'content@app': {
                        controller: 'Ventas',
                        controllerAs: 'vm',
                        templateUrl: '/app/modules/ventas/views/ventas.view.html'
                    }
                }
            });
        }
    ]);
})();
