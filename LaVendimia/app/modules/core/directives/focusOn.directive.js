(function() {
    'use strict';
    angular.module('core').directive('focusOn', function() {
        return function(scope, elem, attr) {
            scope.$on('focusOn', function(e, name) {
                if (name === attr.focusOn) {
                    elem[0].focus();
                    if (attr.type === 'text') {
                        elem[0].select();
                    }
                }
            });
        };
    });
})();
