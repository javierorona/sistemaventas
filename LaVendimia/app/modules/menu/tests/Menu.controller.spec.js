'use strict';
(function() {
    describe('MenuController', function() {
        var scope = {};
        var httpBackend = {};
        var createController = {};
        var _servicioMenu_ = {};

        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        beforeEach(
            inject([
                '$controller',
                '$httpBackend',
                '$rootScope',
                'servicioMenu',
                function($controller, $httpBackend, $rootScope, servicioMenu) {
                    httpBackend = $httpBackend;
                    _servicioMenu_ = servicioMenu;
                    scope = $rootScope.$new();

                    createController = function() {
                        return $controller('Menu', {
                            $scope: scope
                        });
                    };
                    httpBackend.whenGET('app/modules/menu/services/menu.json').respond(200, {
                        meta: {},
                        data: {
                            menu: [
                                {
                                    name: 'Dashboard',
                                    uri: '/',
                                    state: 'app.home',
                                    nodes: [],
                                    icon: 'fa-dashboard',
                                    padre: true
                                }
                            ]
                        }
                    });
                }
            ])
        );
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
        });

        it('Deben existir los elementos', function() {
            var vmMenu = createController();

            expect(vmMenu.isLoginScreen).toBeDefined();
            expect(vmMenu.collapseMenu).toBeDefined();
            expect(vmMenu.tree).toBeDefined();
            expect(vmMenu.tree).toBeArrayOfObjects();
        });

        it('Debe llamar el servicio getMenu', function() {
            httpBackend.expectGET('app/modules/menu/services/menu.json');

            _servicioMenu_.getMenu('app/modules/menu/services/menu.json').then(function(response) {
                expect(response.data.menu).toBeArrayOfObjects();
            });

            httpBackend.flush();
        });

        it('Debe existir toggleMenu', function(){
            
            expect(scope.$on('toggleMenu')).toBeDefined();
        });
    });
})();
