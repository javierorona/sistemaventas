(function() {
    'use strict';
    angular.module('menu').directive('coppelMenu', [
        '$rootScope',
        '$state',
        '$timeout',
        function(
          $rootScope,
          $state,
          $timeout
          ) {
            return {
                link: function(scope, element) {
                    var menuRefreshIgnored = '';

                    $timeout(function() {
                        var animationSpeed = 300;

                        element.on('click', 'li a', function(e) {
                            var $this = angular.element(this);
                            var checkElement = $this.next();
                            var parent = '';
                            var ul = '';

                            if (checkElement.is('.submenu') && checkElement.is(':visible')) {
                                checkElement.slideUp(animationSpeed, function() {
                                    checkElement.removeClass('menu-open');
                                });
                                if($this.parent().hasClass('active')) {
                                    $this.parent().removeClass('open');
                                }
                            } else if (checkElement.is('.submenu') && !checkElement.is(':visible')) {
                                parent = $this.parents('ul').first();
                                ul = parent.find('ul:visible').slideUp(animationSpeed);
                                ul.removeClass('menu-open');
                                
                                if(ul.parent().hasClass('active')) {
                                    ul.parent().removeClass('open');
                                }

                                if($this.parent().hasClass('active')) {
                                    $this.parent().addClass('open');
                                }
                                checkElement.slideDown(animationSpeed, function() {
                                    checkElement.addClass('menu-open');
                                });
                            }
                            if (checkElement.is('.submenu')) {
                                e.preventDefault();
                            }
                        });
                    });

                    scope.customFilter = function(object, searchValue) {
                        var i = 0;
                        var o = null;

                        if (object.hasOwnProperty('state') && object.state === searchValue) {
                            return object;
                        }
                        for (i = 0; i < Object.keys(object).length; i++) {
                            if (angular.isObject(object[Object.keys(object)[i]])) {
                                o = scope.customFilter(object[Object.keys(object)[i]], searchValue);

                                if (o !== null) {

                                    return o;
                                }
                            }
                        }

                        return null;
                    };

                    scope.collapseAll = function() {
                        var key = 0;
                        var index = 0;
                        var k = 0;

                        for (key in scope.menuData) {
                            scope.menuData[key].show = false;
                            scope.menuData[key].active = false;
                            if (scope.menuData[key].nodes.length > 0) {
                                for (index in scope.menuData[key].nodes) {
                                    scope.menuData[key].nodes[index].show = false;
                                    scope.menuData[key].nodes[index].active = false;
                                    if (scope.menuData[key].nodes[index].nodes.length > 0) {
                                        for (k in scope.menuData[key].nodes[index].nodes) {
                                            scope.menuData[key].nodes[index].nodes[k].show = false;
                                            scope.menuData[key].nodes[index].nodes[k].active = false;
                                        }
                                    }
                                }
                            }
                        }
                    };

                    scope.handleMenu = function(stateName) {
                        var resp = scope.customFilter(scope.menuData, stateName);
                        var estado = stateName.split('.');

                        if (estado.length === 3) {
                            resp = scope.customFilter(scope.menuData, 'app.' + estado[1] + '.' + estado[2]);
                        } else if (estado.length > 3) {
                            resp = scope.customFilter(
                                scope.menuData,
                                'app.' + estado[1] + '.' + estado[2] + '.' + estado[3]
                            );
                        }

                        if (resp !== null) {
                            scope.expand(resp);
                        }
                    };

                    scope.expand = function(data) {
                        var key = 0;
                        var ley = 0;
                        var k = 0;

                        scope.collapseAll();
                        for (key in scope.menuData) {
                            for (ley in scope.menuData[key].nodes) {
                                if (scope.menuData[key].nodes[ley].name === data.name) {
                                    scope.menuData[key].active = true;
                                    scope.menuData[key].show = true;
                                    data.active = true;
                                    break;
                                } else if (scope.menuData[key].nodes[ley].nodes.length > 0) {
                                    for (k in scope.menuData[key].nodes[ley].nodes) {
                                        if (scope.menuData[key].nodes[ley].nodes[k].name === data.name) {
                                            scope.menuData[key].show = true;

                                            scope.menuData[key].nodes[ley].show = true;
                                            data.active = true;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    };

                    menuRefreshIgnored = $rootScope.$on('menuRefresh', function(event, args) {
                        
                        scope.$watch('menuData', function(newValue) {
                            
                            if (newValue) {
                                scope.collapseAll();
                                scope.handleMenu($state.current.name);
                            }
                        });
                    });
                },
                restrict: 'E',
                scope: {
                    menuData: '='
                },
                templateUrl: '/app/modules/menu/views/menu.view.html'
            };
        }
    ]);
})();
