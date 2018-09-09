<?php

namespace Na\LavendimiaBack\Models;

use Phalcon\Mvc\Model as Modelo;

class ApiModel extends Modelo
{
    public function holaMundo()
    {
        $di = \Phalcon\DI::getDefault();
        $response = null;

        $db = $di->get('conexion');

        $statement = $db->prepare("SELECT 'hola mundo!' AS saludo, NOW() AS fecha;");
        $statement->execute();

        $response = $statement->fetch();

        return $response;
    }

    public function obtenerConfiguracion()
    {
        $di = \Phalcon\DI::getDefault();
        $response = null;

        $db = $di->get('conexion');

        $statement = $db->prepare(
            "SELECT tasa_financiamiento, porc_enganche, plazo_maximo FROM cat_configuracion;");
        $statement->execute();

        while ($entry = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $resultSet = new \stdClass();
            $resultSet->tasa = $entry["tasa_financiamiento"];
            $resultSet->porcentaje = $entry["porc_enganche"];
            $resultSet->plazo = $entry["plazo_maximo"];
            $response = $resultSet;
            $resultSet = null;
        }

        return $response;
    }

    public function guardarConfiguracion($estatus, $tasa, $porcentaje, $plazo)
    {
        $di = \Phalcon\DI::getDefault();
        $response = null;

        $db = $di->get('conexion');

        if($estatus == -1){//INSERTAR PRIMER REGISTRO
            $statement = $db->prepare(
                "INSERT INTO cat_configuracion(tasa_financiamiento, porc_enganche, plazo_maximo) 
                VALUES($tasa, $porcentaje, $plazo);");
        }else{//ACTUALIZAR EL REGISTRO EXISTENTE
            $statement = $db->prepare(
                "UPDATE cat_configuracion SET 
                    tasa_financiamiento = $tasa, porc_enganche = $porcentaje, plazo_maximo = $plazo;");
        }
        $statement->execute();

        $response = 1;

        return $response;
    }

    public function consultarArticulos()
    {
        $di = \Phalcon\DI::getDefault();
        $response = [];

        $config = $di->get('config')->db;
        $db = $di->get('conexion');
        
        $statement = $db->prepare(
            "SELECT id, descripcion, modelo, precio, existencia FROM cat_articulos ORDER BY id;");
        $statement->execute();

        while ($entry = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $resultSet = new \stdClass();
            $resultSet->clave    = str_pad($entry["id"], 5, "0", STR_PAD_LEFT);
            $resultSet->descripcion    = utf8_encode(trim($entry["descripcion"]));
            $resultSet->modelo    = utf8_encode(trim($entry["modelo"]));
            $resultSet->precio    = $entry["precio"];
            $resultSet->existencia    = $entry["existencia"];
            $response[] = $resultSet;
            $resultSet = null;
      
          }

        return $response;
    }

    public function obtenerIdArticulo()
    {
        $di = \Phalcon\DI::getDefault();
        $response = null;

        $config = $di->get('config')->db;
        $db = $di->get('conexion');
        
        $statement = $db->prepare(
            "SELECT AUTO_INCREMENT AS sig_id FROM information_schema.TABLES
                WHERE TABLE_SCHEMA = '$config->dbname'
                    AND TABLE_NAME = 'cat_articulos';");
        $statement->execute();

        $response = $statement->fetch();

        return $response;
    }

    public function guardarArticulo($actualiza, $descripcion, $modelo, $precio, $existencia, $id)
    {
        $di = \Phalcon\DI::getDefault();
        $response = null;

        $config = $di->get('config')->db;
        $db = $di->get('conexion');

        if($actualiza == 1){
            $statement = $db->prepare(
                "UPDATE cat_articulos SET descripcion = '$descripcion', modelo = '$modelo', precio = $precio, existencia = $existencia WHERE id = $id;");
        }else{
            $statement = $db->prepare(
                "INSERT INTO cat_articulos(descripcion, modelo, precio, existencia)
                VALUES('$descripcion', '$modelo', $precio, $existencia);");
        }
        
        $statement->execute();

        $response = 1;

        return $response;
    }

    public function consultarClientes()
    {
        $di = \Phalcon\DI::getDefault();
        $response = [];

        $config = $di->get('config')->db;
        $db = $di->get('conexion');

         $statement = $db->prepare(
                "SELECT id, nombre, appaterno, apmaterno, rfc FROM cat_clientes ORDER BY id;");
        $statement->execute();

        while ($entry = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $resultSet = new \stdClass();
            $resultSet->clave    = str_pad($entry["id"], 5, "0", STR_PAD_LEFT);
            $resultSet->nombre    = utf8_encode(trim($entry["nombre"]));
            $resultSet->appaterno    = utf8_encode(trim($entry["appaterno"]));
            $resultSet->apmaterno    = utf8_encode(trim($entry["apmaterno"]));
            $resultSet->rfc    = utf8_encode(trim($entry["rfc"]));
            $response[] = $resultSet;
            $resultSet = null;
      
          }

        return $response;
    }

    public function consultarIdCliente()
    {
        $di = \Phalcon\DI::getDefault();
        $response = null;

        $config = $di->get('config')->db;
        $db = $di->get('conexion');

         $statement = $db->prepare(
                "SELECT AUTO_INCREMENT AS sig_id FROM information_schema.TABLES
                WHERE TABLE_SCHEMA = '$config->dbname'
                    AND TABLE_NAME = 'cat_clientes';");
        $statement->execute();

        $response = $statement->fetch();

        return $response;
    }

    public function guardarCliente($actualiza, $nombre, $apPaterno, $apMaterno, $rfc, $id)
    {
        $di = \Phalcon\DI::getDefault();
        $response = null;

        $config = $di->get('config')->db;
        $db = $di->get('conexion');

        if($actualiza == 1){
            $statement = $db->prepare(
                "UPDATE cat_clientes SET nombre = '$nombre', appaterno = '$apPaterno', apmaterno = '$apMaterno', rfc = '$rfc' WHERE id = $id;");
        }else{
            $statement = $db->prepare(
                "INSERT INTO cat_clientes(nombre, appaterno, apmaterno, rfc)
                VALUES('$nombre', '$apPaterno', '$apMaterno', '$rfc');");
        }
        
        $statement->execute();

        $response = 1;

        return $response;
    }

    public function consultarVentas()
    {
        $di = \Phalcon\DI::getDefault();
        $response = [];

        $config = $di->get('config')->db;
        $db = $di->get('conexion');

         $statement = $db->prepare(
                "SELECT folio, clavecliente, nombre, total, fecha, plazo, abono, totalpagar, ahorro
                FROM cat_ventas ORDER BY folio;");
        $statement->execute();

        while ($entry = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $resultSet = new \stdClass();
            $resultSet->folio    = str_pad($entry["folio"], 5, "0", STR_PAD_LEFT);
            $resultSet->clavecliente    = str_pad($entry["clavecliente"], 5, "0", STR_PAD_LEFT);
            $resultSet->nombre    = utf8_encode(trim($entry["nombre"]));
            $resultSet->total    = $entry["total"];
            $newDate = date("d/m/Y H:i:s", strtotime($entry["fecha"]));
            $resultSet->fecha    = $newDate;
            $resultSet->plazo    = $entry["plazo"];
            $resultSet->abono    = $entry["abono"];
            $resultSet->totalpagar    = $entry["totalpagar"];
            $resultSet->ahorro    = $entry["ahorro"];
            $response[] = $resultSet;
            $resultSet = null;      
          }

        return $response;
    }

    public function consultarFolio()
    {
        $di = \Phalcon\DI::getDefault();
        $response = null;

        $config = $di->get('config')->db;
        $db = $di->get('conexion');

         $statement = $db->prepare(
                "SELECT AUTO_INCREMENT AS sig_folio FROM information_schema.TABLES
                WHERE TABLE_SCHEMA = '$config->dbname'
                    AND TABLE_NAME = 'cat_ventas';");
        $statement->execute();

        $response = $statement->fetch();

        return $response;
    }

    public function consultarDatosCliente()
    {
        $di = \Phalcon\DI::getDefault();
        $response = [];

        $config = $di->get('config')->db;
        $db = $di->get('conexion');

         $statement = $db->prepare(
                "SELECT id, nombre, appaterno, apmaterno, rfc FROM cat_clientes ORDER BY id;");
        $statement->execute();

        while ($entry = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $resultSet = new \stdClass();
            $resultSet->id    = str_pad($entry["id"], 5, "0", STR_PAD_LEFT);
            $resultSet->nombre    = utf8_encode(trim($entry["nombre"])).' '.utf8_encode(trim($entry["appaterno"])).' '.utf8_encode(trim($entry["apmaterno"]));
            $resultSet->rfc    = utf8_encode(trim($entry["rfc"]));
            $response[] = $resultSet;
            $resultSet = null;      
          }

        return $response;
    }

    public function consultarDatosArticulo()
    {
        $di = \Phalcon\DI::getDefault();
        $response = [];

        $config = $di->get('config')->db;
        $db = $di->get('conexion');

         $statement = $db->prepare(
                "SELECT id, descripcion FROM cat_articulos WHERE existencia > 0 ORDER BY id;");
        $statement->execute();

        while ($entry = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $resultSet = new \stdClass();
            $resultSet->id    = str_pad($entry["id"], 5, "0", STR_PAD_LEFT);
            $resultSet->descripcion    = utf8_encode(trim($entry["descripcion"]));
            $response[] = $resultSet;
            $resultSet = null;      
          }

        return $response;
    }

    public function validarExistencia($articulo)
    {
        $di = \Phalcon\DI::getDefault();
        $response = null;
        $precio = null;
        $importe = null;

        $configuracion = $this->obtenerConfiguracion();

        $config = $di->get('config')->db;
        $db = $di->get('conexion');

         $statement = $db->prepare(
                "SELECT descripcion, modelo, existencia, precio FROM cat_articulos WHERE id = $articulo;");
        $statement->execute();

        while ($entry = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $resultSet = new \stdClass();
            $resultSet->id  = str_pad($articulo, 5, "0", STR_PAD_LEFT);
            $resultSet->descripcion  = utf8_encode(trim($entry["descripcion"]));
            $resultSet->modelo  = utf8_encode(trim($entry["modelo"]));
            $resultSet->cantidad  = "";
            $precio = $entry["precio"] * (1 + ($configuracion->tasa * $configuracion->plazo)/100);
            $resultSet->precio  = round($precio, 2);
            $importe = $precio * $resultSet->cantidad;
            $resultSet->importe  = round($importe, 2);
            $resultSet->existencia  = $entry["existencia"];
            $resultSet->unidadesAnterior  = 0;
            $response[] = $resultSet;
            $resultSet = null;
            //$this->actualizarExistencia($articulo, 1, 0);
        }
        return $response;
    }

    public function actualizarExistencia($articulo, $cantidad, $sumar)
    {
        $di = \Phalcon\DI::getDefault();
        $response = null;        

        $config = $di->get('config')->db;
        $db = $di->get('conexion');

        if($sumar == 1){
            $statement = $db->prepare(
                "UPDATE cat_articulos SET existencia = existencia + $cantidad WHERE id = $articulo;");
        }else{
            $statement = $db->prepare(
                "UPDATE cat_articulos SET existencia = existencia - $cantidad WHERE id = $articulo;");
        }
        
        $statement->execute();

        $response = 1;        

        return $response;
    }

    public function grabarVenta($claveCliente, $nombre, $totalAdeudo, $plazo, $abono, $totalPagar, $ahorrro)
    {
        $di = \Phalcon\DI::getDefault();
        $response = null;
        $operador = null;

        $config = $di->get('config')->db;
        $db = $di->get('conexion');
        
        $statement = $db->prepare(
            "INSERT INTO cat_ventas(clavecliente, nombre, total, plazo, abono, totalpagar, ahorro)
            VALUES($claveCliente, '$nombre', $totalAdeudo, $plazo, $abono, $totalPagar, $ahorrro);");
        $statement->execute();
        
        $response = 1;

        return $response;
    }
}
