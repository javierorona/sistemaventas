(function() {
    'use strict';
    angular.module('users').config([
        '$stateProvider',
        function($stateProvider) {
            $stateProvider.state('login', {
                url: '/login',
                views: {
                    root: {
                        templateUrl: '/app/modules/users/views/login.view.html'
                    }
                }
            });
        }
    ]);
})();
