**v2.0.3[mu]-(Marzo 2018)**
** Correcciones **
Se detecto una inconsistencia al momento de querer utilizar para algun proposito
los $stateChangeStart, de la aplicacion, por tal motivo se modificaron
los archivos user.run.js y Authentication.service.js.

**Contribuciones**
- Yaxaira Sarahí Melendres López (Sudamérica)

**v2.0.2[mu]-(septiembre 2017)**
===================
**Novedades**
Se Corrigio un bug presente en menu cuando se cambia entre opciones, la flecha que indica
el estado se comportaba de manera erronea.

Se agrega directiva coppelDelayEnter que permite agregar un retrazo temporal a un submit o a una ejecucion
con la tecla enter, muy util si la aplicacion, implementara lectura de codigos de barra mediante scaners o pistolas.

Se agrega directiva coppelSoloLetras, la cual nos permite en un textbox solo disponer de los caracteres de la expresion
regular (/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/g).

Se corrige issue con el focus en los elementos select con la directiva chosen.

**Contribuciones**
- Mitzia Sepulveda (menu)
- Jessan Castro (coppelDelayEnter)
- Ignacio Lopez (coppelSoloLetras)
- Jose David García López (chosen)

**v2.0.1[mu]-(julio 2017)**
===================
**Novedades**
Se Corrigio un bug que se presentaba en el datepicker, cuando se utiliza en modo popup.
debido a que el template faltaba parametros a anexarse.

**Contribuciones**
- Julio Cesar Acosta Lopez

**v2.0.0[mu]-(junio 2017)**
===================

**Novedades**
-------------
- **Gen:**

 - Apps para intranet (generacion de apps que seran accesadas mediente intranet).
 - Apps in-House (generacion de apps que seran accesadas con un login interno).

- **App:**

 - Se actualizo a la version mas reciente de angularjs, asi como de sus plugins.
 - Se incorporaron las reglas eslint tanto de angularjs como de javascript para la auditoria de código con sonarQube.

- **Estructura de Directorios:**
Se modifico la estructura para separar cada uno de los componentes de la vista principal. Quedando de la siguiente manera:
 - App (Contenido de la aplicación)
	 - <i class="icon-folder"></i> assets (contenido estatico [imagenes, documentos]
	 - <i class="icon-folder"></i> lib (librerias javascript)
	 - <i class="icon-folder-open"></i> modules (modulos de la aplicación)
		 - <i class="icon-folder"></i> core (modulo principal de la aplicacion)
		 - <i class="icon-folder"></i> home (modulo ejemplo [dashboard])
		 - <i class="icon-folder"></i> menu (modulo que controla el menu)
		 - <i class="icon-folder"></i> navbar (modulo que controla el navbar)
		 - <i class="icon-folder"></i> users (modulo que controla los distintos tipos de inicio de sesion)
	 - <i class="icon-folder"></i> src (Contiene Template de Index.html)
	 - <i class="icon-file"></i> application.js (configuracion aplicacion)
	 - <i class="icon-file"></i> config.js (inyeccion de modulos).
	 - <i class="icon-file"></i> constantConfig.module.js (Constantes)
