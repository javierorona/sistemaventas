(function() {
    'use strict';
    //Setting up route
    angular.module('niveles').config([
        '$stateProvider',
        function(
            $stateProvider
        ) {
            // Niveles state routing
            $stateProvider
            .state('app.niveles', {
                ncyBreadcrumb: {
                    label: 'Niveles'
                },
                url: '/niveles'
                
            })
            .state('app.niveles.item1', {
                ncyBreadcrumb: {
                    label: 'Item 1'
                },
                url: '/item1',
                views: {
                    'content@app': {
                        controller: 'Niveles',
                        controllerAs: 'vmNiveles',
                        templateUrl: '/app/modules/niveles/views/niveles.view.html'
                    }
                }
                
            })
            .state('app.niveles.item2', {
                ncyBreadcrumb: {
                    label: 'Item 2'
                },
                url: '/item2'
                
            })
            .state('app.niveles.item2.detalle', {
                ncyBreadcrumb: {
                    label: 'Detalle'
                },
                url: '/detalle',
                views: {
                    'content@app': {
                        controller: 'Niveles',
                        controllerAs: 'vmNiveles',
                        templateUrl: '/app/modules/niveles/views/niveles.view.html'
                    }
                }
                
            });
        }
    ]);
})();
