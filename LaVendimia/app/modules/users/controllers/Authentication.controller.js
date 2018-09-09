(function() {
    'use strict';
    angular.module('users').controller('Authentication', [
        '$scope',
        'Authentication',
        function(
          $scope,
          Authentication
        ) {
            var vm = this;
            
            vm.user = {};
            vm.alerts = [];

            vm.addAlert = function(msg) {
                vm.alerts.push(
                    {
                        msg: msg,
                        type: 'danger'
                    }
              );
            };

            vm.closeAlert = function(index) {
                vm.alerts.splice(index, 1);
            };

            vm.login = function() {
                Authentication.login($scope.user);
            };
        }
    ]);
})();
