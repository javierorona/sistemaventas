'use strict';
(function() {
    describe('servicioMenu factory', function() {
        var $q = '';
        var $httpBackend = '';
        var servicioMenu = '';
        var Config= '';

        var API = 'app/modules/menu/services/menu.json';
        
        var RESPONSE_SUCCESS = {
            "meta": {},
            "data": {
            "menu": [
                {
                "name": "Dashboard",
                "uri": "/",
                "state": "app.home",
                "nodes": [],
                "icon": "fa-dashboard",
                "padre": true
                },
                {
                "name": "Tablas",
                "uri": "/tablas",
                "state": "tablas",
                "nodes": [
                    {
                    "name": "Tablas Simples",
                    "uri": "/tablassimples",
                    "state": "tablassimples",
                    "nodes": []
                    },
                    {
                    "name": "Tablas Plugins",
                    "uri": "/tablasplugins",
                    "state": "tablasplugins",
                    "nodes": []
                    }
                ],
                "icon": "fa-list",
                "padre": true
                },
                {
                "name": "Niveles",
                "uri": "/niveles",
                "state": "app.niveles",
                "nodes": [
                    {
                    "name": "Sub Nivel 1",
                    "uri": "/niveluno",
                    "state": "app.niveles.niveluno",
                    "nodes": []
                    },
                    {
                    "name": "Sub Nivel 2",
                    "uri": "/niveldos",
                    "state": "app.niveles.niveldos",
                    "padre": true,
                    "nodes": [
                        {
                        "name": "Sub Sub Nivel 1",
                        "uri": "/subnivel2",
                        "state": "app.niveles.niveldos.subniveluno",
                        "nodes": []
                        }
                    ]
                    }
                ],
                "icon": "fa-list",
                "padre": true
                }
            ]
            }
            };

        // Before each test load our api.users module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        // Before each test set our injected Users factory (_Users_) to our local Users variable
        beforeEach(
            inject(['$httpBackend', '$q', 'servicioMenu', function(_$httpBackend_, _$q_, _servicioMenu_) {
                $httpBackend = _$httpBackend_;
                $q = _$q_;
                servicioMenu = _servicioMenu_;
                
            }])
        );

        // A simple test to verify the Users factory exists
        it('should exist', function() {
            expect(servicioMenu).toBeDefined();
        });

        // // A set of tests for our Users.all() method
        describe('.getMenu()', function() {
            var result = {};

            it('Debe existir el metodo getMenu', function() {
                expect(servicioMenu.getMenu).toBeDefined();
            });

            // A test to verify that calling all() returns the array of users we hard-coded above
            it('Debe retornar el arreglo menu', function() {
                $httpBackend.whenGET(API).respond(200, $q.when(RESPONSE_SUCCESS));
                servicioMenu.getMenu().then(function(res) {
                    result = res;
                });
                $httpBackend.flush();

                expect(result.data.menu).toBeDefined();
                expect(result.data).toHaveArrayOfObjects('menu');

            });

            it('Debe contar con la estructura correcta', function() {
                $httpBackend.whenGET(API).respond(200, $q.when(RESPONSE_SUCCESS));
                servicioMenu.getMenu().then(function(res) {
                    result = res;
                });
                $httpBackend.flush();
                expect(result.data.menu[0].name).toBeDefined();
                expect(result.data.menu[0].uri).toBeDefined();
                expect(result.data.menu[0].state).toBeDefined();
                expect(result.data.menu[0].nodes).toBeDefined();

                expect(result.data.menu[0].nodes).toBeArray();
            });
        });
    });
})();

