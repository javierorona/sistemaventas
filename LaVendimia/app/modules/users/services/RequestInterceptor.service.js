'use strict';

angular.module('users').service('RequestsInterceptor', [
    '$location',
    '$q',
    'Config',
    'localStorageService',

    function(
      $location,
      $q,
      Config,
      localStorageService
      ) {
        var UNAUTHORIZED_CODE = 401;
        var FORBIDDEN_CODE = 403;
        var accessToken = '';

        this.request = function(config) {
            if (config.url !== Config.webbridge) {
                accessToken = localStorageService.get('access_token');

                if (accessToken) {
                    config.headers.Authorization = accessToken;
                }
            }

            return config;
        };

        this.responseError = function(rejection) {
            switch (rejection.status) {
            case UNAUTHORIZED_CODE:
                localStorageService.remove('user', 'access_token');
                $location.path(Config.redirect);
                break;

            case FORBIDDEN_CODE:
                
                break;
                
            default:

                break;
            }

            return $q.reject(rejection);
        };
    }
]);
