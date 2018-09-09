(function() {
    'use strict';
    //Setting up route
    angular.module('articulos').config([
        '$stateProvider',
        function($stateProvider) {
            // Articulos state routing
            $stateProvider
            .state('app.articulos', {
                ncyBreadcrumb: {
                    label: 'Articulos'
                },
                url: '/articulos',
                views: {
                    'content@app': {
                        controller: 'Articulos',
                        controllerAs: 'vm',
                        templateUrl: '/app/modules/articulos/views/articulos.view.html'
                    }
                }
            });
        }
    ]);
})();
