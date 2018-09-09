<?php

namespace Na\LavendimiaBack\Controllers;

use Coppel\RAC\Controllers\RESTController;
use Coppel\RAC\Exceptions\HTTPException;
use Na\LavendimiaBack\Models as Modelos;

class ApiController extends RESTController
{
    private $logger;
    private $modelo;

    public function onConstruct()
    {
        $this->logger = \Phalcon\DI::getDefault()->get('logger');
        $this->modelo = new Modelos\ApiModel();
    }

    public function holaMundo()
    {
        $response = null;

        try {
            $response = $this->modelo->holaMundo();
        } catch (\Exception $ex) {
            $mensaje = $ex->getMessage();
            $this->logger->error('['. __METHOD__ ."] Se lanzó la excepción > $mensaje");

            throw new HTTPException(
                'No fue posible completar su solicitud, intente de nuevo por favor.',
                500, [
                    'dev' => $mensaje,
                    'internalCode' => 'SIE1000',
                    'more' => 'Verificar conexión con la base de datos.'
                ]
            );
        }

        return $this->respond(['response' => $response]);
    }

    public function obtenerConfiguracion()
    {
        $response = null;
        $resultSet = new \stdClass();
        try {
            $response = $this->modelo->obtenerConfiguracion();
            if($response == null){
                $estatus = -1;
                $mensaje = "No existe guardada una configuración, favor de realizarla por primera vez";
            }else{
                $estatus = 1;
                $mensaje = "";
            }
        } catch (\Exception $ex) {
            $mensaje = $ex->getMessage();
            $this->logger->error('['. __METHOD__ ."] Se lanzó la excepción > $mensaje");

            throw new HTTPException(
                'No fue posible completar su solicitud, intente de nuevo por favor.',
                500, [
                    'dev' => $mensaje,
                    'internalCode' => 'SIE1000',
                    'more' => 'Verificar conexión con la base de datos.'
                ]
            );
        }
        $resultSet->estatus = $estatus;
        $resultSet->mensaje = $mensaje;
        $resultSet->data = $response;

        return $this->respond(['response' => $resultSet]);
    }
    public function guardarConfiguracion($estatus, $tasa, $porcentaje, $plazo)
    {
        $response = null;
        $resultSet = new \stdClass();
        try {
            $response = $this->modelo->guardarConfiguracion($estatus, $tasa, $porcentaje, $plazo);
            if($response != 1){
                $status = -1;
                $mensaje = "No se ha podido realizar esta operación, favor de verificar";
            }else{
                $status = 1;
                $mensaje = "Bien Hecho. La configuración ha sido registrada";
            }
        } catch (\Exception $ex) {
            $mensaje = $ex->getMessage();
            $this->logger->error('['. __METHOD__ ."] Se lanzó la excepción > $mensaje");

            throw new HTTPException(
                'No fue posible completar su solicitud, intente de nuevo por favor.',
                500, [
                    'dev' => $mensaje,
                    'internalCode' => 'SIE1000',
                    'more' => 'Verificar conexión con la base de datos.'
                ]
            );
        }
        $resultSet->estatus = $status;
        $resultSet->mensaje = $mensaje;
        $resultSet->data = $response;

        return $this->respond(['response' => $resultSet]);
    }

    public function consultarArticulos()
    {
        $response = null;
        $resultSet = new \stdClass();
        try {
            $response = $this->modelo->consultarArticulos();
            if(count($response) == 0){
                $status = -1;
                $mensaje = "No existen artículos registrados en el catálogo";
            }else{
                $status = 1;
                $mensaje = "";
            }
        } catch (\Exception $ex) {
            $mensaje = $ex->getMessage();
            $this->logger->error('['. __METHOD__ ."] Se lanzó la excepción > $mensaje");

            throw new HTTPException(
                'No fue posible completar su solicitud, intente de nuevo por favor.',
                500, [
                    'dev' => $mensaje,
                    'internalCode' => 'SIE1000',
                    'more' => 'Verificar conexión con la base de datos.'
                ]
            );
        }
        $resultSet->estatus = $status;
        $resultSet->mensaje = $mensaje;
        $resultSet->data = $response;

        return $this->respond(['response' => $resultSet]);
    }
    public function obtenerIdArticulo()
    {
        $response = null;
        $resultSet = new \stdClass();
        try {
            $response = $this->modelo->obtenerIdArticulo();
            if($response->sig_id == ""){
                $status = -1;
                $mensaje = "Ocurrió un error al obtener la clave del artículo, favor de verificar";
            }else{
                $status = 1;
                $mensaje = "";
                $response->sig_id = str_pad($response->sig_id, 5, "0", STR_PAD_LEFT);
            }
        } catch (\Exception $ex) {
            $mensaje = $ex->getMessage();
            $this->logger->error('['. __METHOD__ ."] Se lanzó la excepción > $mensaje");

            throw new HTTPException(
                'No fue posible completar su solicitud, intente de nuevo por favor.',
                500, [
                    'dev' => $mensaje,
                    'internalCode' => 'SIE1000',
                    'more' => 'Verificar conexión con la base de datos.'
                ]
            );
        }
        $resultSet->estatus = $status;
        $resultSet->mensaje = $mensaje;
        $resultSet->data = $response;

        return $this->respond(['response' => $resultSet]);
    }

    public function guardarArticulo($actualiza, $descripcion, $modelo, $precio, $existencia, $id)
    {
        $response = null;
        $resultSet = new \stdClass();
        try {
            $response = $this->modelo->guardarArticulo($actualiza, $descripcion, $modelo, $precio, $existencia, $id);
            if($response != 1){
                $status = -1;
                $mensaje = "No se ha podido realizar esta operación, favor de verificar";
            }else{
                $status = 1;
                $mensaje = "Bien Hecho. El artículo ha sido registrado correctamente";
            }
        } catch (\Exception $ex) {
            $mensaje = $ex->getMessage();
            $this->logger->error('['. __METHOD__ ."] Se lanzó la excepción > $mensaje");

            throw new HTTPException(
                'No fue posible completar su solicitud, intente de nuevo por favor.',
                500, [
                    'dev' => $mensaje,
                    'internalCode' => 'SIE1000',
                    'more' => 'Verificar conexión con la base de datos.'
                ]
            );
        }
        $resultSet->estatus = $status;
        $resultSet->mensaje = $mensaje;
        $resultSet->data = $response;

        return $this->respond(['response' => $resultSet]);
    }

    public function consultarClientes()
    {
        $response = null;
        $resultSet = new \stdClass();
        try {
            $response = $this->modelo->consultarClientes();
            if(count($response) == 0){
                $status = -1;
                $mensaje = "No existen clientes registrados en el catálogo";
            }else{
                $status = 1;
                $mensaje = "";
            }
        } catch (\Exception $ex) {
            $mensaje = $ex->getMessage();
            $this->logger->error('['. __METHOD__ ."] Se lanzó la excepción > $mensaje");

            throw new HTTPException(
                'No fue posible completar su solicitud, intente de nuevo por favor.',
                500, [
                    'dev' => $mensaje,
                    'internalCode' => 'SIE1000',
                    'more' => 'Verificar conexión con la base de datos.'
                ]
            );
        }
        $resultSet->estatus = $status;
        $resultSet->mensaje = $mensaje;
        $resultSet->data = $response;

        return $this->respond(['response' => $resultSet]);
    }

    public function consultarIdCliente()
    {
        $response = null;
        $resultSet = new \stdClass();
        try {
            $response = $this->modelo->consultarIdCliente();
            if($response->sig_id == ""){
                $status = -1;
                $mensaje = "Ocurrió un error al obtener la clave del cliente, favor de verificar";
            }else{
                $status = 1;
                $mensaje = "";
                $response->sig_id = str_pad($response->sig_id, 5, "0", STR_PAD_LEFT);
            }
        } catch (\Exception $ex) {
            $mensaje = $ex->getMessage();
            $this->logger->error('['. __METHOD__ ."] Se lanzó la excepción > $mensaje");

            throw new HTTPException(
                'No fue posible completar su solicitud, intente de nuevo por favor.',
                500, [
                    'dev' => $mensaje,
                    'internalCode' => 'SIE1000',
                    'more' => 'Verificar conexión con la base de datos.'
                ]
            );
        }
        $resultSet->estatus = $status;
        $resultSet->mensaje = $mensaje;
        $resultSet->data = $response;

        return $this->respond(['response' => $resultSet]);
    }

    public function guardarCliente($actualiza, $nombre, $apPaterno, $apMaterno, $rfc, $id)
    {
        $response = null;
        $resultSet = new \stdClass();
        try {
            $response = $this->modelo->guardarCliente($actualiza, $nombre, $apPaterno, $apMaterno, $rfc, $id);
            if($response != 1){
                $status = -1;
                $mensaje = "No se ha podido realizar esta operación, favor de verificar";
            }else{
                $status = 1;
                $mensaje = "Bien Hecho. El cliente ha sido registrado correctamente";
            }
        } catch (\Exception $ex) {
            $mensaje = $ex->getMessage();
            $this->logger->error('['. __METHOD__ ."] Se lanzó la excepción > $mensaje");

            throw new HTTPException(
                'No fue posible completar su solicitud, intente de nuevo por favor.',
                500, [
                    'dev' => $mensaje,
                    'internalCode' => 'SIE1000',
                    'more' => 'Verificar conexión con la base de datos.'
                ]
            );
        }
        $resultSet->estatus = $status;
        $resultSet->mensaje = $mensaje;
        $resultSet->data = $response;

        return $this->respond(['response' => $resultSet]);
    }

    public function consultarVentas()
    {
        $response = null;
        $resultSet = new \stdClass();
        try {
            $response = $this->modelo->consultarVentas();
            if(count($response) == 0){
                $status = -1;
                $mensaje = "No existen ventas registradas en el catálogo";
            }else{
                $status = 1;
                $mensaje = "";
            }
        } catch (\Exception $ex) {
            $mensaje = $ex->getMessage();
            $this->logger->error('['. __METHOD__ ."] Se lanzó la excepción > $mensaje");

            throw new HTTPException(
                'No fue posible completar su solicitud, intente de nuevo por favor.',
                500, [
                    'dev' => $mensaje,
                    'internalCode' => 'SIE1000',
                    'more' => 'Verificar conexión con la base de datos.'
                ]
            );
        }
        $resultSet->estatus = $status;
        $resultSet->mensaje = $mensaje;
        $resultSet->data = $response;

        return $this->respond(['response' => $resultSet]);
    }

    public function consultarFolio()
    {
        $response = null;
        $resultSet = new \stdClass();
        try {
            $response = $this->modelo->consultarFolio();
            if($response->sig_folio == ""){
                $status = -1;
                $mensaje = "Ocurrió un error al obtener el folio de la venta, favor de verificar";
            }else{
                $status = 1;
                $mensaje = "";
                $response->sig_folio = str_pad($response->sig_folio, 5, "0", STR_PAD_LEFT);
            }
        } catch (\Exception $ex) {
            $mensaje = $ex->getMessage();
            $this->logger->error('['. __METHOD__ ."] Se lanzó la excepción > $mensaje");

            throw new HTTPException(
                'No fue posible completar su solicitud, intente de nuevo por favor.',
                500, [
                    'dev' => $mensaje,
                    'internalCode' => 'SIE1000',
                    'more' => 'Verificar conexión con la base de datos.'
                ]
            );
        }
        $resultSet->estatus = $status;
        $resultSet->mensaje = $mensaje;
        $resultSet->data = $response;

        return $this->respond(['response' => $resultSet]);
    }

    public function consultarDatosCliente()
    {
        $response = null;
        $resultSet = new \stdClass();
        try {
            $response = $this->modelo->consultarDatosCliente();
            if(count($response) == 0){
                $status = -1;
                $mensaje = "No se encontraron coincidencias para el cliente ingresado";
            }else{
                $status = 1;
                $mensaje = "";
            }
        } catch (\Exception $ex) {
            $mensaje = $ex->getMessage();
            $this->logger->error('['. __METHOD__ ."] Se lanzó la excepción > $mensaje");

            throw new HTTPException(
                'No fue posible completar su solicitud, intente de nuevo por favor.',
                500, [
                    'dev' => $mensaje,
                    'internalCode' => 'SIE1000',
                    'more' => 'Verificar conexión con la base de datos.'
                ]
            );
        }
        $resultSet->estatus = $status;
        $resultSet->mensaje = $mensaje;
        $resultSet->data = $response;

        return $this->respond(['response' => $resultSet]);
    }

    public function consultarDatosArticulo()
    {
        $response = null;
        $resultSet = new \stdClass();
        try {
            $response = $this->modelo->consultarDatosArticulo();
            if(count($response) == 0){
                $status = -1;
                $mensaje = "No se encontraron coincidencias para el artículo ingresado";
            }else{
                $status = 1;
                $mensaje = "";
            }
        } catch (\Exception $ex) {
            $mensaje = $ex->getMessage();
            $this->logger->error('['. __METHOD__ ."] Se lanzó la excepción > $mensaje");

            throw new HTTPException(
                'No fue posible completar su solicitud, intente de nuevo por favor.',
                500, [
                    'dev' => $mensaje,
                    'internalCode' => 'SIE1000',
                    'more' => 'Verificar conexión con la base de datos.'
                ]
            );
        }
        $resultSet->estatus = $status;
        $resultSet->mensaje = $mensaje;
        $resultSet->data = $response;

        return $this->respond(['response' => $resultSet]);
    }

    public function validarExistencia($articulo)
    {
        $response = null;
        $resultSet = new \stdClass();
        try {
            $response = $this->modelo->validarExistencia($articulo);
            if($response[0]->existencia == 0 || count($response) == 0){
                $status = -1;
                $mensaje = "El artículo $articulo no cuenta con existencia, favor de verificar";
            }else{
                $status = 1;
                $mensaje = "";
            }
        } catch (\Exception $ex) {
            $mensaje = $ex->getMessage();
            $this->logger->error('['. __METHOD__ ."] Se lanzó la excepción > $mensaje");

            throw new HTTPException(
                'No fue posible completar su solicitud, intente de nuevo por favor.',
                500, [
                    'dev' => $mensaje,
                    'internalCode' => 'SIE1000',
                    'more' => 'Verificar conexión con la base de datos.'
                ]
            );
        }
        $resultSet->estatus = $status;
        $resultSet->mensaje = $mensaje;
        $resultSet->data = $response;

        return $this->respond(['response' => $resultSet]);
    }

    public function actualizarExistencia($articulo, $cantidad, $sumar)
    {
        $response = null;
        $resultSet = new \stdClass();
        try {
            $response = $this->modelo->actualizarExistencia($articulo, $cantidad, $sumar);
            if($response != 1){
                $status = -1;
                $mensaje = "No se ha podido actualizar la existencia del artículo, favor de verificar";
            }else{
                $status = 1;
                $mensaje = "";
            }
        } catch (\Exception $ex) {
            $mensaje = $ex->getMessage();
            $this->logger->error('['. __METHOD__ ."] Se lanzó la excepción > $mensaje");

            throw new HTTPException(
                'No fue posible completar su solicitud, intente de nuevo por favor.',
                500, [
                    'dev' => $mensaje,
                    'internalCode' => 'SIE1000',
                    'more' => 'Verificar conexión con la base de datos.'
                ]
            );
        }
        $resultSet->estatus = $status;
        $resultSet->mensaje = $mensaje;
        $resultSet->data = $response;

        return $this->respond(['response' => $resultSet]);
    }

    public function grabarVenta()
    {
        $response = null;
        $resultSet = new \stdClass();
        try {
            $datos = $this->request->getJsonRawBody();

            $claveCliente = $datos->claveCliente;
            $nombre = $datos->nombre;
            $totalAdeudo = $datos->totalAdeudo;
            $plazo = $datos->plazo;
            $abono = $datos->abono;
            $totalPagar = $datos->totalPagar;
            $ahorrro = $datos->ahorrro;

            $response = $this->modelo->grabarVenta($claveCliente, $nombre, $totalAdeudo, $plazo, $abono, $totalPagar, $ahorrro);
            
            if($response != 1){
                $status = -1;
                $mensaje = "Ocurrió un error al grabar la venta, favor de verificar";
            }else{
                $status = 1;
                $mensaje = "";
            }
        } catch (\Exception $ex) {
            $mensaje = $ex->getMessage();
            $this->logger->error('['. __METHOD__ ."] Se lanzó la excepción > $mensaje");

            throw new HTTPException(
                'No fue posible completar su solicitud, intente de nuevo por favor.',
                500, [
                    'dev' => $mensaje,
                    'internalCode' => 'SIE1000',
                    'more' => 'Verificar conexión con la base de datos.'
                ]
            );
        }
        $resultSet->estatus = $status;
        $resultSet->mensaje = $mensaje;
        $resultSet->data = $response;

        return $this->respond(['response' => $resultSet]);
    }
}
