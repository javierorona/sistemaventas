(function() {
    'use strict';
    angular.module('users').directive('coppelEnter', [
        function() {
            return {
                link: function(scope, element, attrs, ngModelCtrl) {
                    element.bind('keydown keypress', function(event) {
                        if (event.which === 13) {
                            if (angular.isDefined(ngModelCtrl.$modelValue)) {
                                scope.$apply(function() {
                                    scope.$eval(attrs.coppelEnter);
                                });
                            }
                            event.preventDefault();
                        }
                    });
                },
                require: '^?ngModel'
            };
        }
    ]);
})();
