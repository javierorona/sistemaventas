(function() {
    'use strict';
    angular.module('articulos').controller('Articulos', [
        'Servarticulos', '$state', 'blockUI',
        function(
            Servarticulos, $state, blockUI
        ) {
            var vm = this;
            var serv = Servarticulos;

            vm.claveArticulo = null;
            vm.descripcion = null;
            vm.modelo = null;
            vm.precio = null;
            vm.existencia = null;

            vm.actualizar = 0;
            vm.articulos = [];
            vm.seccionNuevo = false;
            vm.nomBoton = "Guardar";

            var descripcion = document.getElementById("txtDescripcion");
            var modelo = document.getElementById("txtModelo");
            var precio = document.getElementById("txtPrecio");
            var existencia = document.getElementById("txtExistencia");

            vm.gridOptions = {
                onRegisterApi: function(gridApi){
                    vm.gridApi = gridApi;
                },
                enablePaginationControls: false,
                enableFullRowSelection: false,
                enableRowSelection: false,
                enableSelectAll: true,
                selectionRowHeaderWidth: 35,
                enableRowHeaderSelection: true,
                enableColumnMenus: false,
                enableSorting: true,
                enableFiltering: false,
                showColumnFooter: false,
                columnDefs: [
                     {
                            field: 'clave',
                            displayName: 'Clave Artículo',
                            width: '10%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.clave}}" '+
                            'ng-bind-html="row.entity.clave">{{row.entity.clave}}</div>',
                        },
                        {
                            field: 'descripcion',
                            displayName: 'Descripcion',
                            width: '30%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.descripcion}}" '+
                            'ng-bind-html="row.entity.descripcion">{{row.entity.descripcion}}</div>',
                        },
                        {
                            field: 'modelo',
                            displayName: 'Modelo',
                            width: '25%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.modelo}}" '+
                            'ng-bind-html="row.entity.modelo">{{row.entity.modelo}}</div>',
                        },
                        {
                            field: 'precio',
                            displayName: 'Precio',
                            width: '15%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.precio}}" '+
                            'ng-bind-html="row.entity.precio">{{row.entity.precio}}</div>',
                        },
                        {
                            field: 'existencia',
                            displayName: 'Existencia',
                            width: '15%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.existencia}}" '+
                            'ng-bind-html="row.entity.existencia">{{row.entity.existencia}}</div>',
                        },
                        {
                            field: '0',
                            displayName: ' ',
                            width: '5%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center"> '+
                                                '<div class="hidden-sm hidden-xs action-buttons"> '+
                                                    '<a class="blue" ng-click="grid.appScope.vm.editarArticulo(row)"> '+
                                                        '<i class="fa fa-edit" style="font-size:25px;color:green" title = "Editar Art&iacute;culo"></i> '+
                                                    '</a> '+
                                                '</div> '+
                                            '</div>'
                        }
                ],
                data: vm.articulos
            };

            vm.consultarArticulos = function(){
                blockUI.start("Cargando...");
                serv.consultarArticulos().then(function(respuesta){
                    if(respuesta.estatus != 1){
                        swal("", respuesta.mensaje, "warning");
                        blockUI.stop();
                    }else{
                        vm.articulos = respuesta.data;
                        vm.gridOptions.data = vm.articulos;
                        blockUI.stop();
                    }
                }, function(error){
                    swal("", "Ocurrió un error al conectar con el servicio [consultarArticulos]", "error");
                    blockUI.stop();
                })
            };
            vm.consultarArticulos();

            vm.editarArticulo = function(renglon){
                vm.nomBoton = "Actualizar";
                vm.actualizar = 1;//para editar el articulo
                vm.descripcion = renglon.entity.descripcion;
                vm.modelo = renglon.entity.modelo;
                vm.precio = renglon.entity.precio;
                vm.existencia = renglon.entity.existencia;
                vm.claveArticulo = renglon.entity.clave;

                vm.seccionNuevo = true;
            };

            vm.altaNuevo = function(){
                vm.seccionNuevo = true;
                vm.descripcion = null;
                vm.modelo = null;
                vm.precio = null;
                vm.existencia = null;
                vm.claveArticulo = null;
                vm.obtenerSiguiente();
            };

            vm.obtenerSiguiente = function(){
                serv.obtenerSiguiente().then(function(respuesta){
                    if(respuesta.estatus != 1){
                        swal({
                            title: "",
                            text: respuesta.mensaje,
                            type: "error",
                            showCancelButton: false,
                            confirmButtonClass: "btn-primary",
                            confirmButtonText: "OK",
                            closeOnConfirm: true
                          },
                          function(isConfirm) {
                            if (isConfirm) {
                              vm.cancelar();
                            }
                          });
                    }else{
                        vm.claveArticulo = respuesta.data.sig_id;
                        document.getElementById("txtDescripcion").focus();
                    }
                }, function(error){
                    swal("", "Ocurrió un error al conectar con el servicio [obtenerSiguiente]", "error");
                });
            };            

            vm.validarPrecio = function(){
                var longitud = vm.precio.length;
                var indice = 0;
                var lastIndice = 0;
                if(vm.precio.length > 1){
                    indice = vm.precio.indexOf(".");
                    lastIndice = vm.precio.lastIndexOf(".");

                    if(indice != lastIndice){
                        alert("No puede teclear dos puntos en este control");
                        vm.precio = vm.precio.substr(0, longitud-1);
                    }
                }
            };

            vm.guardar = function(){
                var id = parseInt(vm.claveArticulo);
                var mod = null;
                if(vm.modelo == null){
                    mod = "' '";
                }else{
                    mod = vm.modelo;
                }

                if(vm.descripcion == null || vm.descripcion == ""){
                    alert("No es posible continuar, debe ingresar la Descripción, es obligatorio");
                    descripcion.focus();
                }else if(vm.precio == null || vm.precio == ""){
                    alert("No es posible continuar, debe ingresar el Precio, es obligatorio");
                    precio.focus();
                }else if(vm.existencia == null || vm.existencia == ""){
                    alert("No es posible continuar, debe ingresar la Existencia, es obligatorio");
                    existencia.focus();
                }else{
                    blockUI.start("Guardando información...");
                    serv.guardarArticulo(vm.actualizar, vm.descripcion, mod, vm.precio, vm.existencia, id)
                    .then(function(respuesta){
                        if(respuesta.estatus != 1){
                            swal("", respuesta.mensaje, "warning");
                            blockUI.stop();
                        }else{
                            blockUI.stop();
                            swal({
                                title: "",
                                text: respuesta.mensaje,
                                type: "success",
                                showCancelButton: false,
                                confirmButtonClass: "btn-primary",
                                confirmButtonText: "OK",
                                closeOnConfirm: true
                              },
                              function(isConfirm) {
                                if (isConfirm) {
                                  vm.seccionNuevo = false;
                                  vm.consultarArticulos();
                                }
                              });
                        }
                        
                    }, function(error){
                        blockUI.stop();
                        swal("", "Ocurrió un error al conectar con el servicio [guardar]", "error");
                    })
                }
            };

            vm.cancelar = function(){
                vm.descripcion = null;
                vm.modelo = null;
                vm.precio = null;
                vm.existencia = null;
                vm.seccionNuevo = false;
                vm.claveArticulo = null;
                vm.articulos = [];
                vm.actualizar = 0;
                vm.nomBoton = "Guardar";

                vm.consultarArticulos();
            }
        }
    ]);
})();
