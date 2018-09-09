(function() {
    'use strict';
    angular.module('navbar').controller('Header', [
        '$rootScope',
        '$scope',
        'Authentication',
        'Config',
        'blockUI',
        
        function(
            $rootScope,
            $scope,
            Authentication,
            Config,
            blockUI
        ) {
            var vmHeader = this;

            vmHeader.hojaAzul = Config.hojaAzul;
            vmHeader.btnToggler = false;
            vmHeader.isCollapsed = false;
            vmHeader.isLoginScreen = false;
            vmHeader.usuario = {};
            vmHeader.fecha = new Date();
            vmHeader.dia = vmHeader.fecha.getDate();
            vmHeader.mes = vmHeader.fecha.getMonth() +1;
            vmHeader.anio = vmHeader.fecha.getFullYear();

            vmHeader.fecActual = vmHeader.dia + "/" + vmHeader.mes + "/" + vmHeader.anio;
            vmHeader.fecActual = moment(vmHeader.fecActual).format('MM/DD/YYYY');

            $scope.$on('autoLogIn', function(_event, _args) {
                vmHeader.usuario = Authentication.currentUser();
                blockUI.stop();
            });

            vmHeader.toggleCollapsibleMenu = function() {
                vmHeader.isCollapsed = !vmHeader.isCollapsed;
            };

            $scope.$on('$stateChangeSuccess', function(
                _event,
                _toState,
                _toParams,
                _fromState,
                _fromParams
            ) {
                vmHeader.isCollapsed = false;
                vmHeader.isLoginScreen = false;
                if (_toState.name === 'login') {
                    vmHeader.isLoginScreen = true;
                }
            });
            vmHeader.toggleMenu = function() {
                vmHeader.btnToggler = !vmHeader.btnToggler;
                $rootScope.$broadcast('toggleMenu', vmHeader.btnToggler);
            };

            vmHeader.logout = function() {
                Authentication.logout();
            };

        }
    ]);
})();
