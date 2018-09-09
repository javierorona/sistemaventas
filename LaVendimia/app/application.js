(function() {
    'use strict';
    //Start by defining the main module and adding the module dependencies
    angular.module(
        ApplicationConfiguration.applicationModuleName,
        ApplicationConfiguration.applicationModuleVendorDependencies
    );

    // Setting HTML5 Location Mode
    angular.module(ApplicationConfiguration.applicationModuleName).config([
        '$breadcrumbProvider',
        '$httpProvider',
        '$locationProvider',
        '$logProvider',
        '$provide',
        'blockUIConfig',
        'growlProvider',
        'localStorageServiceProvider',
        function(
            $breadcrumbProvider,
            $httpProvider,
            $locationProvider,
            $logProvider,
            $provide,
            blockUIConfig,
            growlProvider,
            localStorageServiceProvider
        ) {
            var directive = 0;

            $logProvider.debugEnabled(true);
            $provide.decorator('uibAccordionDirective', function($delegate) {
                directive = $delegate[0];
                directive.templateUrl = '/app/modules/core/views/templates/accordionAce.html';

                return $delegate;
            });
            $provide.decorator('uibAccordionGroupDirective', function($delegate) {
                directive = $delegate[0];
                directive.templateUrl = '/app/modules/core/views/templates/accordiongroup.html';

                return $delegate;
            });

            $provide.decorator('uibDaypickerDirective', function($delegate) {
                directive = $delegate[0];
                directive.templateUrl = '/app/modules/core/views/templates/day.html';

                return $delegate;
            });
            $provide.decorator('uibDatepickerPopupWrapDirective', function($delegate) {
                directive = $delegate[0];

                directive.templateUrl = '/app/modules/core/views/templates/popup.html';

                return $delegate;
            });
            $provide.decorator('uibYearpickerDirective', function($delegate) {
                directive = $delegate[0];

                directive.templateUrl = '/app/modules/core/views/templates/year.html';

                return $delegate;
            });
            $provide.decorator('uibMonthpickerDirective', function($delegate) {
                directive = $delegate[0];

                directive.templateUrl = '/app/modules/core/views/templates/month.html';

                return $delegate;
            });

            blockUIConfig.message = 'Cargando, espere por favor...';
            blockUIConfig.autoBlock = false;
            blockUIConfig.delay = 0;
            blockUIConfig.template =
                '<div class="block-ui-overlay"></div><div class="block-ui-message-container" aria-live="assertive" aria-atomic="true"><div class="block-ui-message" ng-class="$_blockUiMessageClass"><i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i> {{ state.message }}</div></div>';

            $locationProvider.hashPrefix('!');

            $breadcrumbProvider.setOptions({
                prefixStateName: 'app',
                templateUrl: '/app/modules/core/views/breadcrumb.view.html'
            });

            //GROWL CONFIG
            growlProvider.onlyUniqueMessages(true);
            growlProvider.messagesKey('mensajes');
            growlProvider.messageTextKey('mensaje');
            growlProvider.messageTitleKey('titulo');
            growlProvider.messageSeverityKey('severidad');
            growlProvider.globalDisableIcons(false);
            growlProvider.globalTimeToLive({
                error: -1,
                info: 3000,
                success: 3000,
                warning: -1
            });

            $httpProvider.interceptors.push(growlProvider.serverMessagesInterceptor);
            $httpProvider.interceptors.push('RequestsInterceptor');

            localStorageServiceProvider.setStorageType('sessionStorage');
            localStorageServiceProvider.setPrefix('cpl.la-vendimia');
        }
    ]);

    // Then define the init function for starting up the application
    angular.element(document).ready(function() {
        //Fixing facebook bug with redirect
        if (window.location.hash === '#_=_') {
            window.location.hash = '#!';
        }

        // Then init the app
        angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
    });
})();
