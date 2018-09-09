(function() {
    'use strict';
    angular.module('users').run([
        '$location',
        '$rootScope',
        '$state',
        '$timeout',
        '$window',
        'Authentication',
        'Config',
        'blockUI',
        'growlMessages',
        function(
            $location,
            $rootScope,
            $state,
            $timeout,
            $window,
            Authentication,
            Config,
            blockUI,
            growlMessages
        ) {
            var token = $location.search().token;
            var stateChangeSuccessIgnored = '';
            var stateChangeStartIgnored = '';

            var setChange = function () {
                stateChangeStartIgnored = $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
                    if (!Authentication.isAuth() && toState.name !== 'login') {
                        $rootScope.returnToState = toState.name;
                        $rootScope.returnToStateParams = toParams;
                        Authentication.logout();
                        event.preventDefault();
                    }
                    if (toState.name === 'login' && Authentication.isAuth() === true) {
                        $state.go('app.home');
                        event.preventDefault();
                    }
                });
            };

            if(Config.enviroment === 'Produccion') {
                blockUI.start();
                if(token) {
                    Authentication.loginAutomatico(token).then(function(data){
                        setChange();
                    });
                }else if(Authentication.isAuth()) {
                    blockUI.stop();
                    setChange();
                }else{
                    $timeout(function() {
                        $window.location.href = Config.redirect;
                    });
                }
            }

            stateChangeSuccessIgnored = $rootScope.$on('$stateChangeSuccess', function(event, toState) {
                $timeout(function() {
                    if(Authentication.isAuth()) {
                        $rootScope.$broadcast('autoLogIn');
                    }
                    $rootScope.$broadcast('menuRefresh', {state: toState});
                });
                growlMessages.destroyAllMessages();
                event.preventDefault();
            });
            

            return false;
        }
    ]);
})();
