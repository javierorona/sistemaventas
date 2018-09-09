(function() {
    'use strict';
    angular.module('users').service('Authentication', [
        '$http',
        '$log',
        '$rootScope',
        '$urlRouter',
        '$window',
        'Config',
        'localStorageService',
        function(
            $http,
            $log,
            $rootScope,
            $urlRouter,
            $window,
            Config,
            localStorageService
        ) {
            var _this = this;
            var setAuthenticationData = function (user, tokenId) {
                _this.user = user;
                _this.accessToken = tokenId;

                localStorageService.set('user', user);
                localStorageService.set('access_token', tokenId);
               
                // If($rootScope.returnToState){
                //   $state.go($rootScope.returnToState);
                //  }else{
                //   $state.go('app.home');
                // }
                
                $rootScope.$broadcast('autoLogIn');
            };
            var unsetAuthenticationData = function() {
                _this.user = null;
                _this.accessToken = null;
                localStorageService.remove('user', 'access_token');
                $window.location.href = Config.redirect;
            };

            _this.user = localStorageService.get('user');
            _this.accessToken = localStorageService.get('access_token');

            this.login = function(_credentials) {
                return true;
            };

            this.loginAutomatico = function(token) {
                return $http({
                    data: { token: token },
                    method: 'POST',
                    url: Config.ssoDesarrollo + '/v1/verify'
                }).then(
                    function(_response) {
                        $http({
                            data: { token: token },
                            method: 'POST',
                            url: Config.ssoDesarrollo + '/v1/me'
                            
                        }).then(
                            function(response) {
                                $urlRouter.listen();
                                $log.info(response);
                                setAuthenticationData(response.data.data, token);
                            },
                            function(_error) {
                                $window.location.href = Config.redirect;
                            }
                        );
                        
                        return _response;
                    },
                    function(_error) {
                        $window.location.href = Config.redirect;
                    }
                );
            };

            this.logout = function() {
                unsetAuthenticationData();
                
            };
            this.isAuth = function() {
                if (localStorageService.get('access_token')) {
                    return true;
                } else {
                    return false;
                }
            };
            this.currentUser = function() {
                return localStorageService.get('user');
            };
        }
    ]);
})();
