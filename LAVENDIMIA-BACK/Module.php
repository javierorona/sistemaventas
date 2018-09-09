<?php

namespace Coppel\RAC\Modules;

use PDO;
use Phalcon\Mvc\Micro\Collection;

class Module implements IModule
{
    public function __construct()
    {
    }

    public function registerLoader($loader)
    {
        $loader->registerNamespaces([
            'Na\LavendimiaBack\Controllers' => __DIR__ . '/controllers/',
            'Na\LavendimiaBack\Models' => __DIR__ . '/models/'
        ], true);
    }

    public function getCollections()
    {
        $collection = new Collection();

        $collection->setPrefix('/api')
            ->setHandler('\Na\LavendimiaBack\Controllers\ApiController')
            ->setLazy(true);

        $collection->get('/ejemplo', 'holaMundo');
        //GET
        $collection->get('/configuracion', 'obtenerConfiguracion');

        $collection->get('/idarticulo', 'obtenerIdArticulo');
        $collection->get('/articulos', 'consultarArticulos');

        $collection->get('/clientes', 'consultarClientes');
        $collection->get('/idcliente', 'consultarIdCliente');

        $collection->get('/ventas', 'consultarVentas');
        $collection->get('/folio', 'consultarFolio');

        $collection->get('/datoscliente', 'consultarDatosCliente');
        $collection->get('/datosarticulo', 'consultarDatosArticulo');

        $collection->get('/existencia/{articulo}', 'validarExistencia');
        //PUT
        $collection->put('/configuracion/{estatus}/{tasa}/{porcent}/{plazo}', 'guardarConfiguracion');

        $collection->put('/articulo/{actualiza}/{descripcion}/{modelo}/{precio}/{existencia}/{id}', 'guardarArticulo');

        $collection->put('/cliente/{actualiza}/{nombre}/{appaterno}/{apmaterno}/{rfc}/{id}', 'guardarCliente');

        $collection->put('/existencia/{articulo}/{cantidad}/{sumar}', 'actualizarExistencia');

        $collection->put('/venta', 'grabarVenta');

        return [
            $collection
        ];
    }

    public function registerServices()
    {
        $di = \Phalcon\DI::getDefault();

        $di->set('conexion', function () use ($di) {
            $config = $di->get('config')->db;

            return new PDO(
                "mysql:host={$config->host};dbname={$config->dbname};",
                //"pgsql:host={$config->host};dbname={$config->dbname};",
                $config->username,
                $config->password, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ
                ]
            );
        });

        $di->set('logger', function () {
            return new \Katzgrau\KLogger\Logger('logs');
        });
    }
}
