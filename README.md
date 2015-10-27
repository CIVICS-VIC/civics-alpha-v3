![Logo CIVICS](http://www.viveroiniciativasciudadanas.net/civics/img/civics_logo_medio.png "Imagen del Logo CIVICS")

# CIVICS alpha v3

Se trata de dos mapas interconectados entre sí y dos formularios de entrada de datos, uno para cada mapa.
Se encuentra disponible en: [www.civics.es](http://civics.es)

# Mapa de iniciativas

## Funcionalidades del mapa de iniciativas

* Visualizar puntos en un mapa, correspondientes a las localizaciones de iniciativas ciudadanas
* Filtrado de datos mediante menús desplegables, según Ciudad, Temática, Tipo de Espacio y Tipo de Agente impulsor de las iniciativas
* Consultar información completa de cada elemento mediante popup lateral.
* Compartir los datos de una actividad seleccionada, mediante redes sociales como Facebook o Twitter
* Introducir nuevos datos mediante formulario.
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

### ./iniciativas/js/moment.js
Librería JavaScript para parsear, validar, manipular y representar datos en forma de fecha.
[Moment.js](http://momentjs.com/) 

### Dependencias

* [CartoDB.js:](http://docs.cartodb.com/cartodb-platform/cartodb-js.html) Librería JavaScript para interactuar con el servicio de datos CartoDB. Se trata de una librería descendiente de Leaflet
* [Overlapping Marker Spiderfier  for Leaflet:](https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet) Librería JavaScript
Copyright (c) 2011 - 2012 George MacKerron. El código se encuentra en ./iniciativas/js/script.js
Released under the [MIT licence](http://opensource.org/licenses/mit-license)
* [Font Awesome:](http://fortawesome.github.io/Font-Awesome/) Biblioteca de iconos abierta

## Descripción de los documentos del formulario de entrada de nueva iniciativa

### ./iniciativas/formulario/index.php
Documento HTML con el formulario de entrada de nuevas iniciativas. Los datos previos se ajustan a la ciudad que se visualiza en el mapa desde el que se ha convocado al formulario añadiendo a la URL: ?city=NombreCiudad. En esta versión alpha v3, se encuentran disponibles dos valores para Nombreciudad: Madrid y MexicoDF

### ./iniciativas/formulario/functions.php
Documento PHP que se conecta a la base de datos para mostrar en el formulario valores existentes, correspondientes a la ciudad desde donde se ha llamado al formulario

### ./iniciativas/formulario/processFormData.php
Documento PHP que toma los datos introducidos en el formulario por el usuario y crea entradas nuevas en la base datos

### ./iniciativas/formulario/css/form_styles.css
Documento CSS con estilos de visualización del formulario

### Dependencias

* ./iniciativas/formulario/js/jquery-1.72.min.js
Biblioteca JavaScript para la simplificación de código
* ./iniciativas/formulario/js/jquery-gmaps-latlon-picker.js
Biblioteca JavaScript para la geocodificación (obtención de coordenadas geográficas a partir de direcciones postales o de marca en un mapa mediante la API de Google)

---
# Mapa de actividades

## Funcionalidades del mapa de actividades

* Visualizar puntos en un mapa, correspondientes a las localizaciones de las actividades que organizan las iniciativas.
* Filtrado de datos mediante menús desplegables, según Ciudad, Fecha, Temática y Tipo de actividad
* Consultar información completa de cada elemento mediante popup lateral.
* Compartir los datos de una iniciativa seleccionada, mediante redes sociales como Facebook o Twitter
* Introducir nuevos datos mediante formulario.
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

### ./actividades/js/moment.js
Librería JavaScript para parsear, validar, manipular y representar datos en forma de fecha.
[Moment.js:](http://momentjs.com/) 

### Dependencias

* [CartoDB.js:](http://docs.cartodb.com/cartodb-platform/cartodb-js.html) Librería JavaScript para interactuar con el servicio de datos CartoDB. Se trata de una librería descendiente de Leaflet
* [Overlapping Marker Spiderfier  for Leaflet:](https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet) Librería JavaScript
Copyright (c) 2011 - 2012 George MacKerron. El código se encuentra en ./actividades/js/script.js
Released under the [MIT licence](http://opensource.org/licenses/mit-license)
* [Font Awesome:](http://fortawesome.github.io/Font-Awesome/) Biblioteca de iconos abierta

## Descripción de los documentos del formulario de entrada de nueva actividad

### ./actividades/formulario/index.php
Documento HTML con el formulario de entrada de nuevas actividades. Los datos previos se ajustan a la ciudad que se visualiza en el mapa desde el que se ha convocado al formulario añadiendo a la URL: ?city=NombreCiudad. En esta versión alpha v3, se encuentran disponibles dos valores para Nombreciudad: Madrid y MexicoDF

### ./actividades/formulario/functions.php
Documento PHP que se conecta a la base de datos para mostrar en el formulario valores existentes

### ./actividades/formulario/processFormData.php
Documento PHP que toma los datos introducidos en el formulario por el usuario y crea entradas nuevas en la base datos

### ./actividades/formulario/css/form_styles.css
Documento CSS con estilos de visualización del formulario

### ./actividades/formulario/selector_fecha.js
Documento JavaScript para manipular datos de fecha

### Dependencias

* **./actividades/formulario/js/jquery-1.72.min.js**
Biblioteca JavaScript para la simplificación de código

* **jquery-gmaps-latlon-picker.js**
Biblioteca JavaScript para la ventana de mapa de geocodificación (obtención de coordenadas geográficas a partir de direcciones postales mediante la API de Google)
* **jquery-ui-timepicker-addon.js**
Biblioteca JavaScript para manipular fechas
* **jquery-ui.custom.js**


## Fuente de los datos

Los datos corresponden a la información facilitada por las propias iniciativas mediante formulario web

## Acceso a los datos

Los datos se encuentran alojados en una cuenta del servicio [cartodb.com](https://mappemad.cartodb.com) en forma de base de datos PostGIS

## Descripción de los datos

Se distribuyen en dos tablas: 

* **iniciativas:** Tabla de datos correspondientes a las iniciativas ciudadanas. Una iniciativa es una entidad ciudadana que realiza actividades.
* **actividades:** Tabla de datos correspondientes a las actividades. Una actividad es un evento organizado por una iniciativa, que tiene lugar en un momento del tiempo (evento) en un determinado lugar.

Para una descripción detallada de las tablas de datos y de sus atributos consulta el documento **DatasetDescription.md**

## Equipo de desarrollo de la versión alpha v3

* **Julián Pérez:** Diseño gráfico e IU
* **David Ruíz:** Desarrollo front-end de vistas de mapa
* **Chema Blanco:** Desarrollo PHP de Formularios
* **Carlos Salgado:** Desarrollo front-end de Formularios
* **Alejandro Zappala:** (Gestión de Proyecto y desarrollo)