(function() {
    'use strict';
    // Setting up route
    angular.module('home').config([
        '$stateProvider',
        function($stateProvider) {
            // Home state routing
            $stateProvider
            .state('app.home', {
                ncyBreadcrumb: {
                    label: ' '
                },
                url: '/home',
                views: {
                    'content@app': {
                        controller: 'Home',
                        controllerAs: 'vmHome',
                        templateUrl: '/app/modules/home/views/home.view.html'
                    }
                }
            });
        }
    ]);
})();
