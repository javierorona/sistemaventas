(function() {
    'use strict';
    angular.module('constantConfig', []).constant('Config', {
        api: 'http://localhost:80/LAVENDIMIA-BACK/api',
        enviroment: 'Desarrollo',
        hojaAzul: 'http://10.44.15.147/hojaazul/fotos/',
        redirect: 'http://intranet.cln/intranet',
        ssoDesarrollo: 'http://10.44.15.214/api',
        ssoProductivo: 'http://10.44.2.130:50060/api',
        webbridge: 'http://localhost:20542/api/huella'
        
    });
})();
