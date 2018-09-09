// Karma configuration
// Generated on Thu May 25 2017 16:28:50 GMT-0600 (MDT)

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'jasmine-matchers'],

        // list of files / patterns to load in the browser
        files: [
            './app/lib/jquery/dist/jquery.js',
            './app/lib/angular/angular.js',
            './app/lib/angular-ui-router/release/angular-ui-router.js',
            './app/lib/angular-resource/angular-resource.js',
            './app/lib/angular-mocks/angular-mocks.js',
            './app/lib/angular-cookies/angular-cookies.js',
            './app/lib/angular-animate/angular-animate.js',
            './app/lib/angular-touch/angular-touch.js',
            './app/lib/angular-sanitize/angular-sanitize.js',
            './app/lib/angular-bootstrap/ui-bootstrap-tpls.js',
            './app/lib/angular-ui-scroll/dist/ui-scroll.js',
            './app/lib/angular-ui-utils/index.js',
            './app/lib/angular-ui-scroll/dist/ui-scroll.js',
            './app/lib/angular-ui-scrollpoint/dist/scrollpoint.js',
            './app/lib/angular-ui-event/dist/event.js',
            './app/lib/angular-ui-mask/dist/mask.js',
            './app/lib/angular-ui-validate/dist/validate.js',
            './app/lib/angular-ui-indeterminate/dist/indeterminate.js',
            './app/lib/angular-ui-uploader/dist/uploader.js',
            './app/lib/angular-ui-router/release/angular-ui-router.js',
            './app/lib/angular-local-storage/dist/angular-local-storage.js',
            './app/lib/marked/lib/marked.js',
            './app/lib/highlightjs/highlight.pack.js',
            './app/lib/angular-scroll/angular-scroll.js',
            './app/lib/angular-breadcrumb/release/angular-breadcrumb.js',
            './app/lib/angular-clipboard/angular-clipboard.js',
            './app/lib/matchmedia/matchMedia.js',
            './app/lib/bootbox/bootbox.js',
            './app/lib/sweetalert/dist/sweetalert.min.js',
            './app/lib/rangy/rangy-core.js',
            './app/lib/rangy/rangy-classapplier.js',
            './app/lib/rangy/rangy-highlighter.js',
            './app/lib/rangy/rangy-selectionsaverestore.js',
            './app/lib/rangy/rangy-serializer.js',
            './app/lib/rangy/rangy-textrange.js',
            './app/lib/angular-growl-v2/build/angular-growl.js',
            './app/lib/ng-table/dist/ng-table.min.js',
            './app/lib/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.js',
            './app/lib/angular-i18n/angular-locale_es-mx.js',
            './app/lib/angular-base64-upload/src/angular-base64-upload.js',
            './app/lib/chosen/chosen.jquery.js',
            './app/lib/angular-chosen-localytics/dist/angular-chosen.js',
            './app/lib/angular-file-upload/dist/angular-file-upload.min.js',
            './app/lib/angular-loading-bar/build/loading-bar.js',
            './app/lib/angular-ui-grid/ui-grid.js',
            './app/lib/angular-ui-tree/dist/angular-ui-tree.js',
            './app/lib/angular-wizard/dist/angular-wizard.min.js',
            './app/lib/angular-block-ui/dist/angular-block-ui.js',
            './app/lib/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js',
            './app/lib/moment/moment.js',
            './app/lib/chart.js/dist/Chart.js',
            './app/lib/angular-ui-utils/index.js',
            './app/lib/angular-marked/dist/angular-marked.js',
            './app/lib/ngSticky/lib/sticky.js',
            './app/lib/ngBootbox/dist/ngBootbox.js',
            './app/lib/ngSweetAlert/SweetAlert.js',
            './app/lib/textAngular/dist/textAngular.js',
            './app/lib/textAngular/dist/textAngular-sanitize.js',
            './app/lib/textAngular/dist/textAngularSetup.js',
            './app/lib/fullcalendar/dist/fullcalendar.js',
            './app/lib/angular-chart.js/dist/angular-chart.js',
            './app/lib/angular-ui-calendar/src/calendar.js',
            './app/constantConfig.module.js',
            './app/config.js',
            './app/application.js',
            './app/modules/core/core.module.js',
            './app/modules/users/users.module.js',
            './app/modules/users/services/Authentication.service.js',
            './app/modules/users/services/RequestsInterceptor.service.js',
            './app/modules/menu/menu.module.js',
            './app/modules/menu/services/servicioMenu.service.js',
            './app/modules/menu/tests/servicioMenu.service.spec.js',
            './app/modules/menu/controllers/Menu.controller.js',
            './app/modules/menu/tests/Menu.controller.spec.js',
            './app/modules/navbar/navbar.module.js',
            './app/modules/navbar/controllers/Header.controller.js',
            './app/modules/navbar/tests/Header.controller.spec.js'
        ],
        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
