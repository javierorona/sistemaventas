'use strict';
(function() {
    describe('HeaderController', function() {
        var scope = {};
        var httpBackend = {};
        var createController = {};
       

        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        beforeEach(
            inject([
                '$controller',
                '$httpBackend',
                '$rootScope',
                function($controller, $httpBackend, $rootScope) {
                    httpBackend = $httpBackend;
                    scope = $rootScope.$new();

                    createController = function() {
                        return $controller('Header', {
                            $scope: scope
                        });
                    };
                    
                }
            ])
        );
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
        });

        it('Deben estar definidos los elementos', function() {
            var vmHeader = createController();

            expect(vmHeader.btnToggler).toBeDefined();
            expect(vmHeader.isCollapsed).toBeDefined();
            expect(vmHeader.isLoginScreen).toBeDefined();
            expect(vmHeader.toggleCollapsibleMenu).toBeDefined();
            expect(vmHeader.toggleMenu).toBeDefined();
            expect(vmHeader.logout).toBeDefined();
            expect(vmHeader.usuario).toBeDefined();
            
        });

        it('Deben cumplir los tipos de datos', function() {
            var vmHeader = createController();

            expect(vmHeader.btnToggler).toBeBoolean();
            expect(vmHeader.isCollapsed).toBeBoolean();
            expect(vmHeader.isLoginScreen).toBeBoolean();
            expect(vmHeader.usuario).toBeObject();

        });

    });
})();
