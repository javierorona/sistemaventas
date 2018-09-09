(function() {
    'use strict';
    angular.module('configuracion').controller('Configuracion', [
        'Servconfig', 'SweetAlert', '$state', 'blockUI',
        function(
            Servconfig, SweetAlert, $state, blockUI
        ) {
            var vm = this;
            var serv = Servconfig;
            //MODELOS
            vm.tasa = null;
            vm.porcentaje = null;
            vm.plazo = null;
            vm.estatus = null;

            serv.cargarConfig().then(function(respuesta){
                blockUI.start("Cargando...")
                if(respuesta.estatus != 1){
                    document.getElementById("txtTasaFinanciamiento").focus();
                    vm.estatus = -1;
                    blockUI.stop();
                }else{
                    vm.tasa = respuesta.data.tasa;
                    vm.porcentaje = respuesta.data.porcentaje;
                    vm.plazo = respuesta.data.plazo;
                    vm.estatus = 1;
                    blockUI.stop();
                }
            }, function(error){
                swal("", "Ocurrió un error al conectar con el servicio [cargarConfig]", "error");
                blockUI.stop();
            });

            vm.guardar = function(){
                if(vm.tasa == null && vm.porcentaje == null && vm.plazo == null){
                    swal("", "No se ha capturado ninguna configuración, favor de revisar", "warning");
                }else{
                    blockUI.start("Guardando información...")
                    if(vm.tasa == null || vm.tasa == ""){
                        vm.tasa = 0.0;
                    }
                    if(vm.porcentaje == null || vm.porcentaje == ""){
                        vm.porcentaje = 0;
                    }
                    if(vm.plazo == null || vm.plazo == ""){
                        vm.plazo = 0;
                    }
                    
                    serv.guardarConfig(vm.estatus, vm.tasa, vm.porcentaje, vm.plazo).then(function(respuesta){
                        if(respuesta.estatus != 1){
                            blockUI.stop();
                            swal("", respuesta.mensaje, "error");
                        }else{
                            blockUI.stop();
                            swal("", respuesta.mensaje, "success");
                        }
                    }, function(error){
                        blockUI.stop();
                        swal("", "Ocurrió un error al conectar con el servicio [guardarConfig]", "error");
                    });
                }
            };

            vm.cancelar = function(){
                $state.go('app.home');
            }

        }
    ]);
})();
