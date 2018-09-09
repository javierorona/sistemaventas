(function() {
    'use strict';
    
    /**
     * @ngdoc directive
     * @name core.delayEnter
     * @element attribute
     * @function
     *
     * @description
     * Agrega un delay con el keypress enter para alcanzar actualzar el modelo de datos.
     *
     * @example
       <input type="text" coppel-delay-enter="200" ng-model="datos.parametro">
    */

    angular.module('core').directive('delayEnter', [
        '$timeout',
        function(
            $timeout
        ) {
            return {
                link: function (scope, element, attrs, ngModelCtrl) {
                    element.bind('keydown keypress', function (event) {
                        if(event.which === 13) {
                            $timeout(attrs.delayEnter || 500);
                            if(ngModelCtrl.$modelValue !== undefined) {
                                scope.$apply(function () {
                                    scope.$eval(attrs.delayEnter);
                                });
                            }
                        }
                    });
                },
                require: '^?ngModel',
                restrict: 'A'
            };
        }
    ]);
})();
