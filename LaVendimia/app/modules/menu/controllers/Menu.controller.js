(function() {
    'use strict';
    angular.module('menu').controller('Menu', [
        '$rootScope',
        '$scope',
        'servicioMenu',
        function(
            $rootScope,
            $scope,
            servicioMenu
        ) {
            var vmMenu = this;

            vmMenu.collapseMenu = true;
            vmMenu.toggleMenu = function() {
                vmMenu.collapseMenu = !vmMenu.collapseMenu;
            };

            vmMenu.isLoginScreen = false;
            servicioMenu.getMenu().then(function(respuesta) {
                vmMenu.tree = respuesta.data.menu;
                $rootScope.$broadcast('menuRefresh');
            });

            $scope.$on('toggleMenu', function(event, data) {
                vmMenu.displayMenu = data;
            });
        }
    ]);
})();
