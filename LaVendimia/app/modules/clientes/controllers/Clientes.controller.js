(function() {
    'use strict';
    angular.module('clientes').controller('Clientes', [
        'SweetAlert', 'Servclientes','blockUI',
        function(
            SweetAlert, Servclientes, blockUI
        ) {
            var vm = this;
            var serv = Servclientes;

            vm.seccionNuevo = false;
            vm.claveCliente = null;
            vm.nomBoton = "Guardar"

            vm.nombre = null;
            vm.apPaterno = null;
            vm.apMaterno = null;
            vm.rfc = null;
            vm.clientes = [];
            vm.actualizar = 0;

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
                            displayName: 'Clave Cliente',
                            width: '10%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.clave}}" '+
                            'ng-bind-html="row.entity.clave">{{row.entity.clave}}</div>',
                        },
                        {
                            field: 'nombre',
                            displayName: 'Nombre',
                            width: '30%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.nombre}}" '+
                            'ng-bind-html="row.entity.nombre">{{row.entity.nombre}}</div>',
                        },
                        {
                            field: 'appaterno',
                            displayName: 'Apellido Paterno',
                            width: '25%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.appaterno}}" '+
                            'ng-bind-html="row.entity.appaterno">{{row.entity.appaterno}}</div>',
                        },
                        {
                            field: 'apmaterno',
                            displayName: 'Apellido Materno',
                            width: '15%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.apmaterno}}" '+
                            'ng-bind-html="row.entity.apmaterno">{{row.entity.apmaterno}}</div>',
                        },
                        {
                            field: 'rfc',
                            displayName: 'RFC',
                            width: '15%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.rfc}}" '+
                            'ng-bind-html="row.entity.rfc">{{row.entity.rfc}}</div>',
                        },
                        {
                            field: '0',
                            displayName: ' ',
                            width: '5%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center"> '+
                                                '<div class="hidden-sm hidden-xs action-buttons"> '+
                                                    '<a class="blue" ng-click="grid.appScope.vm.editarCliente(row)"> '+
                                                        '<i class="fa fa-edit" style="font-size:25px;color:green" title = "Editar Cliente"></i> '+
                                                    '</a> '+
                                                '</div> '+
                                            '</div>'
                        }
                ],
                data: vm.clientes
            };

            vm.consultarClientes = function(){
                blockUI.start("Cargando...");
                serv.consultarClientes().then(function(respuesta){
                    if(respuesta.estatus != 1){
                        swal("", respuesta.mensaje, "warning");
                        blockUI.stop();
                    }else{
                        vm.clientes = respuesta.data;
                        vm.gridOptions.data = vm.clientes;
                        blockUI.stop();
                    }
                }, function(error){
                    swal("", "Ocurrió un error al conectar con el servicio [consultarEmpleados]", "error");
                    blockUI.stop();
                });
            };

            vm.consultarClientes();

            vm.consultarId = function(){
                serv.consultarIdCliente().then(function(respuesta){
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
                        vm.claveCliente = respuesta.data.sig_id;
                    }
                }, function(error){
                    swal("", "Ocurrió un error al conectar con el servicio [consultarId]", "error");
                });
            };

            vm.altaNuevo = function(){
                vm.seccionNuevo = true;

                vm.nombre = null;
                vm.apPaterno = null;
                vm.apMaterno = null;
                vm.rfc = null;
                vm.nomBoton = "Guardar"
                vm.consultarId();
            };

            vm.guardar = function(){
                var id = parseInt(vm.claveCliente);

                if(vm.nombre == null || vm.nombre == ""){
                    alert("No es posible continuar, debe ingresar la Nombre, es obligatorio");
                    document.getElementById("txtNombre").focus();
                }else if(vm.apPaterno == null || vm.apPaterno == ""){
                    alert("No es posible continuar, debe ingresar el Apellido Paterno, es obligatorio");
                    document.getElementById("txtApPaterno").focus();
                }else if(vm.rfc == null || vm.rfc == ""){
                    alert("No es posible continuar, debe ingresar el RFC, es obligatorio");
                    document.getElementById("txtRFC").focus();
                }else if(vm.apMaterno == null || vm.apMaterno == ""){
                    document.getElementById("txtApMaterno").focus();
                }else{
                    blockUI.start("Guardando información...");
                    serv.guardarCliente(vm.actualizar, vm.nombre, vm.apPaterno, vm.apMaterno, vm.rfc, id)
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
                                  vm.consultarClientes();
                                }
                              });
                        }
                        
                    }, function(error){
                        blockUI.stop();
                        swal("", "Ocurrió un error al conectar con el servicio [guardar]", "error");
                    })
                }
            };

            vm.editarCliente = function(renglon){
                vm.nomBoton = "Actualizar";
                vm.actualizar = 1;//para editar el cliente
                vm.nombre = renglon.entity.nombre;
                vm.apPaterno = renglon.entity.appaterno;
                vm.apMaterno = renglon.entity.apmaterno;
                vm.rfc = renglon.entity.rfc;
                vm.claveCliente = renglon.entity.clave;

                vm.seccionNuevo = true;
            };

            vm.cancelar = function(){
                vm.nombre = null;
                vm.apPaterno = null;
                vm.apMaterno = null;
                vm.rfc = null;

                vm.seccionNuevo = false;
                vm.claveCliente = null;
                vm.clientes = [];
                vm.actualizar = 0;
                vm.nomBoton = "Guardar";

                vm.consultarClientes();
            };

        }
    ]);
})();
