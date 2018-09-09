(function() {
    'use strict';
    angular.module('core').directive('soloLetras', function() {
        return {
            link: function(scope, element, attr, ngModelCtrl) {
                var fromUser = function(text) {
                    var transformedInput = '';

                    if (text) {
                        transformedInput = text.replace(/[^a-zA-Z\s]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }

                        return transformedInput;
                    }
                    
                    return '';
                };
                
                ngModelCtrl.$parsers.push(fromUser);
            },
            require: '^?ngModel'
        };
    });
})();

