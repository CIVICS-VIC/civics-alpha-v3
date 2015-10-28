![Logo CIVICS](http://www.viveroiniciativasciudadanas.net/civics/img/civics_logo_medio.png "Imagen del Logo CIVICS")

# CIVICS alpha v3

CIVICS es una plataforma donde encontrarás información geolocalizada de las iniciativas de tu ciudad, así como de las actividades que organizan.

Este proyecto consta de dos mapas interconectados entre sí, uno de iniciativas y otro de actividades. Además, desde cada mapa puedes acceder a un formulario de entrada de datos, para dar de alta nuevas iniciativas o actividades.

Se encuentra disponible en: [www.civics.es](http://civics.es)

# Mapa de iniciativas

## Funcionalidades del mapa de iniciativas

* Visualizar puntos en un mapa, correspondientes a la localización de iniciativas ciudadanas
* Filtrado de datos según Ciudad, Temática, Tipo de Espacio y Tipo de Agente impulsor de las iniciativas, mediante menús desplegables
* Consultar información completa de la iniciativa seleccionada
* Compartir los datos de una actividad seleccionada, mediante redes sociales como Facebook o Twitter
* Introducir nuevos datos mediante formulario
* Consultar leyenda del mapa

## Descripción de los documentos del mapa de iniciativas

Los documentos correspondientes se encuentran en la carpeta **./iniciativas/**

### ./iniciativas/index.html
Documento HTML con los menús, canvás del mapa y desplegables con información

### ./iniciativas/favicon.png
Archivo de imagen en formato PNG correspondiente al icono a representar en el navegador

### ./css/mapa_general.css
Documento CSS con estilos comunes en los dos mapas

### ./iniciativas/css/mapa_ini.css
Documento CSS con estilos del mapa de iniciativas

### ./iniciativas/js/script.js
Documento JavaScript para tomar datos de la base de datos y organizarlos para su visualización

### Dependencias

* [CartoDB.js:](http://docs.cartodb.com/cartodb-platform/cartodb-js.html) Librería JavaScript para interactuar con el servicio de datos CartoDB. Se trata de una librería descendiente de Leaflet
* [Overlapping Marker Spiderfier  for Leaflet:](https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet) Librería JavaScript
Copyright (c) 2011 - 2012 George MacKerron. El código se encuentra incluido en ./iniciativas/js/script.js
Released under the [MIT licence](http://opensource.org/licenses/mit-license)
* [Font Awesome 4.4.0:](http://fortawesome.github.io/Font-Awesome/) Biblioteca de iconos abierta
* [Moment.js](http://momentjs.com/) Librería JavaScript para parsear, validar, manipular y representar datos en forma de fecha.
* [Google Fonts API](https://developers.google.com/fonts/) Servicio para añadir fuentes de texto

## Descripción de los documentos del formulario de entrada de nueva iniciativa

### ./iniciativas/formulario/index.php
Documento con el formulario de entrada de nuevas iniciativas. Mediante scipt en JavaScript, los datos previos se ajustan a la ciudad que se visualiza en el mapa desde el que se ha convocado al formulario añadiendo a la URL: ?city=NombreCiudad. En esta versión alpha v3, se encuentran disponibles dos valores para Nombreciudad: Madrid y MexicoDF

### ./iniciativas/formulario/css/form_styles.css
Documento CSS con estilos de visualización del formulario

### ./iniciativas/formulario/functions.php
Documento PHP que se conecta a la base de datos para mostrar en el formulario valores existentes, correspondientes a la ciudad desde donde se ha llamado al formulario

### ./iniciativas/formulario/processFormData.php
Documento PHP que toma los datos introducidos en el formulario por el usuario y crea entradas nuevas en la base datos

### ./actividades/formulario/cartodb.class.php
Script para manipular información obtenida de la base de datos alojada en la cuenta del servicio www.cartodb.com asociada al proyecto

### ./actividades/formulario/oauth.php
Script para la conexión a la base de datos mediante servicio de oauth

### ./actividades/formulario/cartodb.config.php
Documento PHP con las credenciales para obtener permiso para editar la base de datos de la cuenta del servicio www.cartodb.com asociada al proyecto

### Dependencias

* [JQUERY v1.72](http://jquery.com/)
Biblioteca JavaScript para la simplificación de código
* [jquery-latitude-longitude-picker-gmaps](https://github.com/wimagguc/jquery-latitude-longitude-picker-gmaps)
Biblioteca JavaScript  construida sobre JQuery para la ventana de mapa de geocodificación (obtención de coordenadas geográficas a partir de direcciones postales mediante la API de Google)

---
# Mapa de actividades

## Funcionalidades del mapa de actividades

* Visualizar puntos en un mapa, correspondientes a las localizaciones de las actividades que organizan las iniciativas.
* Filtrado de datos según Ciudad, Fecha, Temática y Tipo de actividad, mediante menús desplegables
* Consultar información completa de la actividad seleccionada
* Compartir los datos de una iniciativa seleccionada, mediante redes sociales como Facebook o Twitter
* Introducir nuevos datos mediante formulario
* Consultar leyenda del mapa

## Descripción de los documentos del mapa de actividades

Los ficheros correspondientes se encuentran en la carpeta **./actividades/**

### ./actividades/index.html
Documento HTML con los menús, canvás del mapa y desplegables con información

### ./actividades/favicon.png
Archivo de imagen en formato PNG correspondiente al icono a representar en el navegador

### ./css/mapa_general.css
Documento CSS con estilos comunes en los dos mapas

### ./actividades/css/mapa_ini.css
Documento CSS con estilos del mapa de actividades

### ./actividades/js/script.js
Documento JavaScript para tomar datos de la base de datos y organizarlos para su visualización

### Dependencias

* [CartoDB.js:](http://docs.cartodb.com/cartodb-platform/cartodb-js.html) Librería JavaScript para interactuar con el servicio de datos CartoDB. Se trata de una librería descendiente de Leaflet
* [Overlapping Marker Spiderfier  for Leaflet:](https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet) Librería JavaScript
Copyright (c) 2011 - 2012 George MacKerron. El código se encuentra incluido en ./actividades/js/script.js
Released under the [MIT licence](http://opensource.org/licenses/mit-license)
* [Font Awesome 4.4.0:](http://fortawesome.github.io/Font-Awesome/) Biblioteca de iconos abierta
* [Moment.js](http://momentjs.com/) Librería JavaScript para parsear, validar, manipular y representar datos en forma de fecha
* [Google Fonts API](https://developers.google.com/fonts/) API para añadir fuentes de texto

## Descripción de los documentos del formulario de entrada de nueva actividad

### ./actividades/formulario/index.php

Documento HTML con el formulario de entrada de nuevas actividades. Mediante scipt en JavaScript, los datos previos se ajustan a la ciudad que se visualiza en el mapa desde el que se ha convocado al formulario añadiendo a la URL: ?city=NombreCiudad. En esta versión alpha v3, se encuentran disponibles dos valores para Nombreciudad: Madrid y MexicoDF

### ./actividades/formulario/functions.php
Documento PHP que se conecta a la base de datos para mostrar en el formulario valores existentes

### ./actividades/formulario/processFormData.php
Documento PHP que toma los datos introducidos en el formulario por el usuario y crea entradas nuevas en la base datos

### ./actividades/formulario/cartodb.class.php
Script para manipular información obtenida de la base de datos alojada en la cuenta del servicio www.cartodb.com asociada al proyecto

### ./actividades/formulario/oauth.php
Script para la conexión a la base de datos mediante servicio de oauth

### ./actividades/formulario/cartodb.config.php
Documento PHP con las credenciales para obtener permiso para editar la base de datos de la cuenta del servicio www.cartodb.com asociada al proyecto

### ./actividades/formulario/css/form_styles.css
Documento CSS con estilos de visualización del formulario

### ./actividades/formulario/selector_fecha.js
Documento JavaScript para manipular datos de fecha

### Dependencias

* [JQUERY v1.72](http://jquery.com/)
Biblioteca JavaScript para la simplificación de código
* [jquery-latitude-longitude-picker-gmaps](https://github.com/wimagguc/jquery-latitude-longitude-picker-gmaps)
Biblioteca JavaScript  construida sobre JQuery para la ventana de mapa de geocodificación (obtención de coordenadas geográficas a partir de direcciones postales mediante la API de Google)
* [jquery-ui-timepicker-addon.js](https://github.com/trentrichardson/jQuery-Timepicker-Addon) Biblioteca JavaScript construida sobre JQuery para manipular fechas
* [JQuery-ui](http://jqueryui.com/) Biblioteca JavaScript construida sobre JQuery para la interacción con la interfaz de usuario

## Fuente de los datos

Los datos corresponden a la información facilitada por las propias iniciativas mediante formulario web

## Acceso a los datos

Los datos se encuentran alojados en una cuenta del servicio [cartodb.com](https://mappemad.cartodb.com) en forma de base de datos PostGIS

## Descripción de los datos

Se distribuyen en dos tablas: 

* **iniciativas:** Tabla de datos correspondientes a las iniciativas ciudadanas. Una iniciativa es una entidad ciudadana que realiza actividades.
* **actividades:** Tabla de datos correspondientes a las actividades. Una actividad es un evento organizado por una iniciativa, que tiene lugar en un momento del tiempo (evento) en un determinado lugar.

Para una descripción detallada de las tablas de datos y de sus atributos consulta el documento [DatasetDescription.md](https://github.com/CIVICS-VIC/civics-alpha-v3/blob/master/DatasetDescription.md)

## Equipo de desarrollo de la versión alpha v3

* **Julián Pérez:** Diseño gráfico e IU
* **David Ruíz:** Desarrollo front-end de vistas de mapa
* **Chema Blanco:** Desarrollo PHP de Formularios
* **Carlos Salgado:** Desarrollo front-end de Formularios
* **Alejandro Zappala:** (Gestión de Proyecto y desarrollo)