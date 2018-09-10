(function() {
    'use strict';
    angular.module('ventas').controller('Ventas', [
        'Servventas', 'SweetAlert', 'Config', '$scope', 'blockUI',
        '$state',
        function(
            Servventas, SweetAlert, Config, $scope, blockUI,
            $state
        ) {
            var vm = this;
            var serv = Servventas;
            
            vm.nombreCliente = null;
            vm.clienteSelecto = null;
            vm.articuloSelecto = null;
            vm.ventas = [];
            vm.plazos = [3, 6, 9, 12];
            vm.tablaAbonos = [];
            vm.configuracion = [];
            vm.registroVentas = [];            

            vm.enganche = 0.00;
            vm.bonifEnganche = 0.00;
            vm.totalPagar = 0.00;
            vm.nombreBoton = "Siguiente";
            vm.totalAdeudo = 0;
            vm.precioContado = 0;
            vm.claveCliente = null;
            vm.nomCliente = null;
            vm.plazoSeleccionado = null;
            vm.abonoSeleccionado = null;
            vm.ahorroSeleccionado = null;
            vm.totalPagarSelecc = null;
            vm.unidades = null;
            vm.claveArticulo = null;
            vm.datosCliente = [];
            vm.datosArticulo = [];
            vm.rfcCliente = null;
            
            vm.verRFC = false;
            vm.verTabla = false;
            vm.seccionNuevo = false;
            vm.guardar = false;
            vm.folioVenta = null;

            vm.deshabilCliente = false;
            vm.deshabilitaArticulo = true;

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
                            field: 'folio',
                            displayName: 'Folio Venta',
                            width: '10%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.folio}}" '+
                            'ng-bind-html="row.entity.folio">{{row.entity.folio}}</div>',
                        },
                        {
                            field: 'clavecliente',
                            displayName: 'Clave Cliente',
                            width: '10%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.clavecliente}}" '+
                            'ng-bind-html="row.entity.clavecliente">{{row.entity.clavecliente}}</div>',
                        },
                        {
                            field: 'nombre',
                            displayName: 'Nombre',
                            width: '35%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.nombre}}" '+
                            'ng-bind-html="row.entity.nombre">{{row.entity.nombre}}</div>',
                        },
                        {
                            field: 'total',
                            displayName: 'Total',
                            width: '20%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.total}}" '+
                            'ng-bind-html="row.entity.total">{{row.entity.total}}</div>',
                        },
                        {
                            field: 'fecha',
                            displayName: 'Fecha',
                            width: '15%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.fecha}}" '+
                            'ng-bind-html="row.entity.fecha">{{row.entity.fecha}}</div>',
                        },
                        {
                            field: '0',
                            displayName: ' ',
                            width: '5%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents"> '+
                                                '<div class="hidden-sm hidden-xs action-buttons"> '+
                                                    '<a class="blue" ng-click="grid.appScope.vm.verDetalle(row)"> '+
                                                        '<i class="fa fa-list-alt" style="font-size:25px;color:green" title = "Ver Detalle"></i> '+
                                                    '</a> '+
                                                '</div> '+
                                            '</div>'
                        },
                        {
                            field: '0',
                            displayName: ' ',
                            width: '5%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents"> '+
                                                '<div class="hidden-sm hidden-xs action-buttons"> '+
                                                    '<a class="blue" ng-click="grid.appScope.vm.eliminarRenglonVenta(row)"> '+
                                                        '<i class="fa fa-remove" style="font-size:25px;color:red" title = "Eliminar Venta"></i> '+
                                                    '</a> '+
                                                '</div> '+
                                            '</div>'
                        }
                ],
                data: vm.ventas
            };

            vm.gridOptionsVenta = {
                onRegisterApi: function(gridApiVenta){
                    vm.gridApiVenta = gridApiVenta;
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
                            field: 'id',
                            displayName: 'Clave',
                            width: '8%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.id}}" '+
                            'ng-bind-html="row.entity.id">{{row.entity.id}}</div>',
                        },
                        {
                            field: 'descripcion',
                            displayName: 'Descripción del Artículo',
                            width: '25%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-left',
                            cellTemplate: '<div class="ui-grid-cell-contents left" '+
                            'title="{{row.entity.descripcion}}" '+
                            'ng-bind-html="row.entity.descripcion">{{row.entity.descripcion}}</div>',
                        },
                        {
                            field: 'modelo',
                            displayName: 'Modelo',
                            width: '25%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-left',
                            cellTemplate: '<div class="ui-grid-cell-contents left" '+
                            'title="{{row.entity.modelo}}" '+
                            'ng-bind-html="row.entity.modelo">{{row.entity.modelo}}</div>',
                        },
                        {
                            field: 'cantidad',
                            displayName: 'Cantidad',
                            width: '10%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center"> '+
                                                '<input type="text" id="txtCantidad" '+
                                                    'ng-model="row.entity.cantidad" '+
                                                    'ng-change="grid.appScope.vm.calcularImporte(row)" '+
                                                    'solo-numeros '+
                                                    'maxlength="3"> '+
                                            '</div>'
                        },
                        {
                            field: 'precio',
                            displayName: 'Precio',
                            width: '13%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.precio}}" '+
                            'ng-bind-html="row.entity.precio">{{row.entity.precio}}</div>',
                        },
                        {
                            field: 'importe',
                            displayName: 'Importe',
                            width: '14%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents center" '+
                            'title="{{row.entity.importe}}" '+
                            'ng-bind-html="row.entity.importe">{{row.entity.importe}}</div>',
                            
                        },
                        {
                            field: '0',
                            displayName: ' ',
                            width: '5%',
                            headerCellClass: 'text-center',
                            cellClass: 'text-center',
                            cellTemplate: '<div class="ui-grid-cell-contents"> '+
                                                '<div class="hidden-sm hidden-xs action-buttons"> '+
                                                    '<a class="blue" ng-click="grid.appScope.vm.eliminarRenglon(row)"> '+
                                                        '<i class="fa fa-remove" style="font-size:25px;color:red" title = "Eliminar Art&iacute;culo"></i> '+
                                                    '</a> '+
                                                '</div> '+
                                            '</div>'
                        }
                ],
                data: vm.registroVentas
            };

            vm.eliminarRenglonVenta = function(row){
                var idEliminar = parseInt(row.entity.folio);
                var indice = vm.gridApi.grid.renderContainers.body.visibleRowCache.indexOf(row);

                swal({
                    title: "",
                    text: "¿Está seguro de eliminar la venta del registro del catálogo?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-primary",
                    confirmButtonText: "OK",
                    cancelButtonText: "Cancelar",
                    closeOnConfirm: true,
                    closeOnCancel: true
                  },
                  function(isConfirm) {
                    blockUI.start("Cargando...");                      
                    if (isConfirm) {
                        serv.eliminarVenta(idEliminar).then(function(respuesta){
                            if(respuesta.estatus != 1){
                                swal("", respuesta.mensaje, "warning");
                                blockUI.stop();
                            }else{
                                swal("", respuesta.mensaje, "success");
                                vm.ventas.splice(indice, 1);
                                vm.gridOptionsVenta.data = vm.ventas;
                                blockUI.stop();
                            }
                        }, function(error){
                            blockUI.stop();
                            swal("", "Ocurrió un error al conectar con el servicio [eliminarRenglon]", "error");
                        });
                    }
                  });
            };

            vm.cambiaSelectCliente = function(){
                vm.deshabilCliente = true;
                var indice = document.getElementById("cmbClientes").selectedIndex;
                vm.rfcCliente = vm.datosCliente[indice].rfc;
                vm.nomCliente = vm.datosCliente[indice].nombre;
                vm.verRFC = true;
                vm.deshabilitaArticulo = false;
                document.getElementById("cmbArticulos").focus();
            };

            vm.cambiaSelectArticulo = function(){
                
            };

            vm.agregarArticulo = function(){
                if(vm.articuloSelecto.length > 0 && vm.deshabilitaArticulo == false)
                {
                    blockUI.start("Cargando...");
                    for (var index = 0; index < vm.articuloSelecto.length; index++) {
                        var articulo = vm.articuloSelecto[index];
                        vm.validarExistencia(articulo);

                    }
                    vm.deshabilitaArticulo = true;
                }
            };

            vm.verDetalle = function(row){
                vm.modalFolio = row.entity.folio;
                vm.modalCliente = row.entity.clavecliente;
                vm.modalNombre = row.entity.nombre;
                vm.modalTotal = row.entity.total;
                vm.modalFecha = row.entity.fecha;
                vm.modalPlazo = row.entity.plazo;
                vm.modalAbono = row.entity.abono;
                vm.modalTotalPagar = row.entity.totalpagar;
                vm.modalAhorro = row.entity.ahorro;
                $(document).ready(function(){
                    $("#modalDetalle").modal({show: true});
                });
            };

            
            vm.obtenerDatosCliente = function(){
                serv.obtenerDatosCliente().then(function(respuesta){
                    if(respuesta.estatus != 1){
                        swal("", respuesta.mensaje, "warning");
                    }else{
                        vm.datosCliente = respuesta.data;
                    }
                }, function(error){
                    swal("", "Ocurrió un error al conectar con el servicio [obtenerDatosCliente]", "error");
                })
            };


            vm.obtenerDatosArticulo = function(){
                serv.obtenerDatosArticulo().then(function(respuesta){
                    if(respuesta.estatus != 1){
                        swal("", respuesta.mensaje, "warning");
                    }else{
                        vm.datosArticulo = respuesta.data;
                    }
                }, function(error){
                    swal("", "Ocurrió un error al conectar con el servicio [obtenerDatosArticulo]", "error");
                })
            };

            vm.obtenerConfirugacion = function(){
                blockUI.start("Cargando...");
                serv.obtenerConfirugacion().then(function(respuesta){
                    if(respuesta.estatus != 1){
                        swal("", "No se han configurado los datos para el cálculo del monto, favor de verificar");
                        blockUI.stop();
                    }else{
                        vm.configuracion = respuesta.data;
                        blockUI.stop();
                    }
                }, function(error){
                    blockUI.stop();
                    swal({
                        title: "",
                        text: "Ocurrió un error al conectar con el servicio [obtenerConfigucacion]",
                        type: "error",
                        showCancelButton: false,
                        confirmButtonClass: "btn-primary",
                        confirmButtonText: "OK",
                        closeOnConfirm: true
                      },
                      function(isConfirm) {
                        if (isConfirm) {
                          $state.go('app.home');
                        }
                      });
                })
            };

            vm.consultarVentas = function(){
                blockUI.start("Cargando...");
                serv.consultarVentas().then(function(respuesta){
                    if(respuesta.estatus != 1){
                        swal("", respuesta.mensaje, "warning");
                        blockUI.stop();
                    }else{
                        vm.ventas = respuesta.data;
                        vm.gridOptions.data = vm.ventas;
                        blockUI.stop();
                    }
                }, function(error){
                    blockUI.stop();
                    swal("", "Ocurrió un error al conectar con el servicio [consultarVentas]", "error");
                });
            };
            vm.consultarVentas();

            vm.consultarFolio = function(){
                serv.consultarFolio().then(function(respuesta){
                    if(respuesta.estatus != 1){
                        swal("", respuesta.mensaje, "warning");
                    }else{
                        vm.folioVenta = respuesta.data.sig_folio;
                    }
                }, function(error){
                    swal({
                        title: "",
                        text: "Ocurrió un error al conectar con el servicio [consultarFolio]",
                        type: "error",
                        showCancelButton: false,
                        confirmButtonClass: "btn-primary",
                        confirmButtonText: "OK",
                        closeOnConfirm: true
                      },
                      function(isConfirm) {
                        if (isConfirm) {
                          $state.go('app.home');
                        }
                      });
                })
            };

            vm.nuevaVenta = function(){
                vm.seccionNuevo = true;
                vm.deshabilCliente = false;
                vm.deshabilitaArticulo = true;
                vm.consultarFolio();
                vm.obtenerConfirugacion();
                vm.obtenerDatosCliente();
                vm.obtenerDatosArticulo();
            };

            vm.calcularImporte = function(row){
                var datosGrid = vm.gridApiVenta.core.getVisibleRows(vm.gridApiVenta.grid);
                var unidadesAnt = null;
                var unidadesRestar = null;
                var unidadesSumar = null;
                vm.verTabla = false;
                vm.guardar = false;
                vm.nombreBoton = "Siguiente";
                vm.tablaAbonos = [];

                if(parseInt(row.entity.cantidad) > parseInt(row.entity.existencia)){
                    row.entity.cantidad = "";
                    row.entity.importe = 0.00;
                    swal({
                        title: "",
                        text: "No puede capturar mas unidades de las que hay en existencia ("+row.entity.existencia+")",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonClass: "btn-primary",
                        confirmButtonText: "OK",
                        closeOnConfirm: true
                      },
                      function(isConfirm) {
                        if (isConfirm) {
                            vm.actualizarExistencia(row.entity.id, row.entity.unidadesAnterior, 1);
                            row.entity.unidadesAnterior = 0;
                        }
                      });
                }else if (parseInt(row.entity.cantidad) != 0 && row.entity.cantidad.length > 0){
                    vm.unidades = parseInt(row.entity.cantidad);
                    vm.unidadesAnt =parseInt(row.entity.unidadesAnterior);

                    row.entity.importe = (row.entity.cantidad * row.entity.precio).toFixed(2);
                    
                    if(vm.unidades > unidadesAnt){
                        unidadesRestar = vm.unidades - vm.unidadesAnt;
                        vm.actualizarExistencia(row.entity.id, unidadesRestar, 0);
                        row.entity.unidadesAnterior = vm.unidades;
                    }else if(vm.unidades < unidadesAnt){
                        unidadesSumar = unidadesAnt - vm.unidades;
                        vm.actualizarExistencia(row.entity.id, unidadesSumar, 1);
                        row.entity.unidadesAnterior = vm.unidades;
                    }
                }else if(datosGrid.length > 1){
                    row.entity.importe = 0.00
                    vm.calcularTotales();
                    vm.actualizarExistencia(row.entity.id, row.entity.unidadesAnterior, 1);
                    row.entity.unidadesAnterior = 0;
                }else{
                    vm.enganche = 0.00;
                    vm.bonifEnganche = 0.00;
                    vm.totalPagar = 0.00;
                    row.entity.importe = 0.00
                }
            };

            vm.calcularTotales = function(){
                var importe = 0;
                var datosGrid = vm.gridApiVenta.core.getVisibleRows(vm.gridApiVenta.grid);
                
                for (var index = 0; index < datosGrid.length; index++) {
                    importe = importe + parseFloat(datosGrid[index].entity.importe);  
                }
                
                vm.enganche = (vm.configuracion.porcentaje/100) * importe;
                
                vm.bonifEnganche = vm.enganche * ((vm.configuracion.tasa * vm.configuracion.plazo)/ 100);
                
                vm.totalPagar = importe - vm.enganche - vm.bonifEnganche;
                vm.totalAdeudo = vm.totalPagar.toFixed(2);

                vm.bonifEnganche = vm.bonifEnganche.toLocaleString('us', {minimumFractionDigits: 2,maximumFractionDigits: 2});

                vm.enganche = vm.enganche.toLocaleString('us', {minimumFractionDigits: 2, maximumFractionDigits: 2});

                vm.totalPagar = vm.totalPagar.toLocaleString('us', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            };

            vm.validarExistencia = function(articulo){
                serv.validarExistencia(articulo).then(function(respuesta){
                    if(respuesta.estatus != 1){
                        swal("", respuesta.mensaje, "warning");
                        blockUI.stop();
                    }else{
                        vm.registroVentas.push(respuesta.data[0]);
                        vm.gridOptionsVenta.data = vm.registroVentas;
                        blockUI.stop();
                    }
                }, function(error){
                    blockUI.stop();
                    swal("", "Ocurrió un error al conectar con el servicio [validarExistencia]", "error");
                    vm.cancelar();
                })
            };

            vm.eliminarRenglon = function(row){
                var indice = vm.gridApiVenta.grid.renderContainers.body.visibleRowCache.indexOf(row);
                vm.registroVentas.splice(indice, 1);
                vm.gridOptionsVenta.data = vm.registroVentas;
                vm.actualizarExistencia(row.entity.id, row.entity.unidadesAnterior, 1);
                vm.calcularTotales();
            };

            vm.siguienteGuardar = function(){
                var datosGrid = vm.gridApiVenta.core.getVisibleRows(vm.gridApiVenta.grid);
                var cantidadRen = null;
                var continua = true;
                if(vm.nombreBoton == "Siguiente"){
                    for (var index = 0; index < datosGrid.length; index++) {
                        cantidadRen = datosGrid[index].entity.cantidad;
                        if(parseInt(cantidadRen) == 0 || cantidadRen.length == 0){
                            continua = false;
                        }
                    }
                    if(!continua){
                        swal("", "Los datos ingresados no son correctos, favor de verificar", "warning");
                    }else{
                        vm.formarObjetoTabla();
                        vm.verTabla = true;
                        vm.nombreBoton = "Guardar";
                    }
                }else{
                    if(!vm.guardar){
                        swal("", "Debe seleccionar un plazo para realizar el pago de su compra", "warning");
                    }else{
                        blockUI.start("Guardando información...");
                        var objGuardar = {};
                        objGuardar.claveCliente = parseInt(vm.clienteSelecto[0]);
                        objGuardar.nombre = vm.nomCliente;
                        objGuardar.totalAdeudo = vm.totalAdeudo;
                        objGuardar.plazo = vm.plazoSeleccionado;
                        objGuardar.abono = vm.abonoSeleccionado;
                        objGuardar.totalPagar = vm.totalPagarSelecc;
                        objGuardar.ahorrro = vm.ahorroSeleccionado;
                        
                        serv.grabarVenta(objGuardar).then(function(respuesta){
                            if(respuesta.estatus != 1){
                                blockUI.stop();
                                swal("", respuesta.mensaje, "warning");
                            }else{
                                swal({
                                    title: "",
                                    text: "Bien hecho, Tu venta ha sido registrada correctamente",
                                    type: "success",
                                    showCancelButton: false,
                                    confirmButtonClass: "btn-primary",
                                    confirmButtonText: "OK",
                                    closeOnConfirm: true
                                  },
                                  function(isConfirm) {
                                    if (isConfirm) {
                                        vm.inicializar();
                                    }
                                  });
                                blockUI.stop();
                                
                            }
                        }, function(error){
                            blockUI.stop();
                            swal("", "Ocurrió un error al conectar con el servicio [siguienteGrabar]", "error");
                        });
                    }
                }
            };

            vm.actualizarExistencia = function(articulo, unidades, sumar){
                blockUI.start("Cargando...");
                serv.actualizarExistencia(articulo, unidades, sumar).then(function(respuesta){
                    if(respuesta.estatus != 1){
                        swal("", respuesta.mensaje, "warning");
                        blockUI.stop();
                    }else{
                        vm.calcularTotales();
                        blockUI.stop();
                    }
                }, function(error){
                    blockUI.stop();
                    swal("", "Ocurrió un error al conectar con el servicio [actualizarExistencia]")
                });
            };

            vm.formarObjetoTabla = function(){                
                var totalPagar = 0;
                
                vm.precioContado = (vm.totalAdeudo / (1 + (vm.configuracion.tasa * vm.configuracion.plazo)/ 100)).toFixed(2);
                
                for (var index = 0; index < vm.plazos.length; index++) {
                    var plazo = vm.plazos[index];
                    var objeto = {};
                    totalPagar = (vm.precioContado * (1 + (vm.configuracion.tasa * plazo)/100)).toFixed(2);

                    objeto.plazo = plazo;
                    objeto.abono = (totalPagar / plazo).toFixed(2);
                    objeto.totalPagar = totalPagar;
                    objeto.ahorra = (vm.totalAdeudo - totalPagar).toFixed(2);

                    vm.tablaAbonos.push(objeto);
                }
                
            };

            vm.validarPlazo = function(indice){
                vm.guardar = true;
                vm.plazoSeleccionado = vm.tablaAbonos[indice].plazo;
                vm.abonoSeleccionado = vm.tablaAbonos[indice].abono;
                vm.ahorroSeleccionado = vm.tablaAbonos[indice].ahorra;
                vm.totalPagarSelecc = vm.tablaAbonos[indice].totalPagar;
            };

            vm.cancelar = function(){
                var datosGrid = vm.gridApiVenta.core.getVisibleRows(vm.gridApiVenta.grid);
                var unidadesAnte = 0;

                vm.nombreBoton = "Siguiente";
                vm.verTabla = false;
                
                vm.seccionNuevo = false;
                vm.verRFC = false;
                vm.clienteSelecto = null;
                vm.articuloSelecto = null;

                if(datosGrid.length > 0){
                    for (var index = 0; index < datosGrid.length; index++) {
                        unidadesAnte =parseInt(datosGrid[index].entity.unidadesAnterior);
                        if(datosGrid[index].entity.unidadesAnterior > 0){
                            vm.actualizarExistencia(datosGrid[index].entity.id, unidadesAnte, 1);
                        }
                        
                        if(index == datosGrid.length -1){
                            vm.registroVentas = [];
                            vm.gridOptionsVenta.data = vm.registroVentas;
                            vm.consultarVentas();
                        }
                    }
                }
                vm.bonifEnganche = 0.00;
                vm.enganche = 0.00;
                vm.totalPagar = 0.00;
            };

            vm.inicializar = function(){
                vm.nombreBoton = "Siguiente";
                vm.verTabla = false;                
                vm.seccionNuevo = false;
                vm.verRFC = false;
                vm.clienteSelecto = null;
                vm.articuloSelecto = null;
                vm.bonifEnganche = 0.00;
                vm.enganche = 0.00;
                vm.totalPagar = 0.00;
                vm.registroVentas = [];
                vm.gridOptionsVenta.data = vm.registroVentas;
                vm.consultarVentas();
            };
        }
    ]);
})();
