(function() {
    'use strict';
    angular.module('core').config([
        '$stateProvider',
        '$urlRouterProvider',
        function(
            $stateProvider,
            $urlRouterProvider
        ) {
            $urlRouterProvider.otherwise(function($injector) {
                var $state = $injector.get('$state');

                $state.go('app.home');
            });
            $stateProvider.state('app', {
                abstract: true,
                views: {
                    root: {
                        templateUrl: '/app/modules/core/views/core.view.html'
                    }
                }
            });
        }
    ]);
})();
