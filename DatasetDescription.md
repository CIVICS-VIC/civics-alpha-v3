# Descripción de los datos de CIVICS alpha v3

---
## Índice para este documento

1. [Descripción general](#descripción-general)
2. [Modelo de datos expresado en UML](#modelo-de-datos-expresado-en-uml)
3. [Descripción de las tablas](#descripción-de-las-tablas)
	* [Tabla iniciativas](#tabla-iniciativas)
	* [Tabla actividades](#tabla-actividades)
4. [Listas de valores](#listas-de-valores)
	* [ActivityTopic](#activitytopic)
	* [IniciativeSpace](#iniciativespace)
	* [IniciativeAgent](#iniciativeagent)
	* [ActivityForm](#activityform)
	* [ActivityAttend](#activityattend)
5. [Condiciones y Licencias de los datos](#condiciones-y-licencias-de-los datos)

---
# Descripción general

Los datos se encuentran alojados en una cuenta del servicio [cartodb.com](https://mappemad.cartodb.com) en forma de base de datos postGIS

Se distribuyen en dos tablas:

* [iniciativas](#tabla-iniciativas): Tabla de datos correspondientes a las iniciativas ciudadanas. [tabla de iniciativas en cartodb](https://mappemad.cartodb.com/tables/iniciativas/public). Una iniciativa es una entidad ciudadana que realiza actividades.
* [actividades](#tabla-actividades) Tabla de datos correspondientes a las actividades. [tabla de actividades en cartodb](https://mappemad.cartodb.com/tables/iniciativas/public) Una actividad es un evento organizado por una iniciativa, que tiene lugar en un momento del tiempo (evento) en un determinado lugar.

Además, se han tipificado los posibles valores de algunos atributos en varias listas, descritas al final de este documento:

* [ActivityTopic](#activitytopic): Lista de posibles valores que puede tener la Temática de una Actividad o la temática general de las actividades que organiza una Iniciativa (atributo *ini_topic* de la tabla *iniciativas* y atributo *act_topic* de la tabla *actividades*). Esta lista de valores ha sido confeccionada mediante diversos talleres y dinámicas realizados con las propias Iniciativas
* [IniciativeSpace](#iniciativespace): Lista de posibles valores que puede tener el tipo de espacio donde se desarrolla u organiza la iniciativa (atributo *ini_space* de la tabla *iniciativas*)
* [IniciativeAgent](#iniciativeagent): Lista de posibles valores que puede tener el tipo de agente impulsor de la iniciativa (atributo *ini_agent* de la tabla *iniciativas*)
* [ActivityForm](#activityform): Lista de posibles valores que puede tener la Forma de una Actividad (atributo *act_form* de la tabla *actividades*)
* [ActivityAttend](#activityattend) Lista de posibles valores que puede tener la inscripción en la actividad (atributo *act_atten* de la tabla *actividades*)

---
# Modelo de datos expresado en UML

![Modelo de datos expresado en UML](http://www.viveroiniciativasciudadanas.net/civics/img/ModeloDatos_alpha_v3.png "Imagen del Modelo de datos expresado en UML")

---
# Descripción de las tablas

---
## Tabla *iniciativas*

Descripción de los atributos correspondientes a las iniciativas ciudadanas. Una iniciativa es una entidad ciudadana que realiza actividades

### cartodb_id
* **Tipo de dato:** *number*
* **Descripción:** Identificador numérico único de la iniciativa

### the_geom
* **Tipo de dato:** *geometry*
* **Descripción:** Geometría de punto definida por las coordenadas geográficas, en el sistema de referencia WGS84, del lugar donde se desarrollan u organizan las actividades de la iniciativa. Este valor se actualiza automáticamente mediante la composición de los atributos *lat* y *lon*, que se introducen mediante formulario de entrada de datos.

### ini_name
* **Tipo de dato:** *string*
* **Descripción:** Nombre literal de la iniciativa

### ini_descri
* **Tipo de dato:** *string*
* **Descripción:** Descripción de la iniciativa

### ini_topic
* **Tipo de dato:** *string* (ActivityTopic)
* **Descripción:** Tema general de las actividades que organiza la iniciativa, con los valores posibles enumerados de *ActivityTopic*

### ini_space
* **Tipo de dato:** *string* (IniciativeSpace)
* **Descripción:** Tipo de espacio donde se desarrollan u organizan las actividades de la iniciativa, según los valores enumerados en *IniciativeSpace*

### ini_agent
* **Tipo de dato:** *string* (IniciativeAgent)
* **Descripción:** Tipo de agente responsable de la iniciativa, según los valores enumerados en *IniciativeAgent*

### city
* **Tipo de dato:** *string*
* **Descripción:** Municipio donde se desarrollan las actividades de la iniciativa, o desde donde se organizan.

### distrito
* **Tipo de dato:** *string*
* **Descripción:** Zona geográfica que divide un municipio

### state
* **Tipo de dato:** *string*
* **Descripción:** Nombre del País o Estado donde se ubique la dirección postal correspondiente a la iniciativa.

### ini_addres
* **Tipo de dato:** *string*
* **Descripción:** Dirección postal donde se desarrollan las actividades de la iniciativa o desde donde se organizan. Ejemplo: Calle Fuenteovejuna, 15, Madrid

### lat
* **Tipo de dato:** *number*
* **Descripción:** Latitud geográfica, expresada en grados con decimales, en el sistema de referencia WGS84

### lon
* **Tipo de dato:** *number*
* **Descripción:** Longitud geográfica, expresada en grados con decimales, en el sistema de referencia WGS84

### ini_mail
* **Tipo de dato:** *string*
* **Descripción:** Dirección de correo electrónico para contactar con la iniciativa

### ini_facebook
* **Tipo de dato:** *string*
* **Descripción:** Dirección web del perfil de la red social Facebook correspondiente a la iniciativa

###ini_twitter
* **Tipo de dato:** *string*
* **Descripción:** Nombre del perfil de twitter asociado con la iniciativa

###ini_web
* **Tipo de dato:** *string*
* **Descripción:** Dirección web de la iniciativa donde pueda encontrarse más información de ésta.

### created_at
* **Tipo de dato:** *date*. En formato según norma ISO 8601. Ejemplo: 2014-09-01T18:46:48Z
* **Descripción:** Fecha de incorporación de la información de la iniciativa a la base de datos

### up*date*d_at
* **Tipo de dato:** *date*. En formato según norma ISO 8601. Ejemplo: 2014-09-01T18:46:48Z
* **Descripción:** Fecha del último cambio en la información de la iniciativa en la base de datos

---
## Tabla *actividades*

Descripción de los atributos correspondientes a la tabla actividades. Una actividad es un evento organizado por una iniciativa, que tiene lugar en un momento del tiempo (evento) en un determinado lugar

### cartodb_id
* **Tipo de dato:** *number*
* **Descripción:** Identificador numérico único de la actividad

### the_geom
* **Tipo de dato:** *geometry*
* **Descripción:** Geometría de punto definida por las coordenadas geográficas, en el sistema de referencia WGS84, del lugar donde se celebra la actividad. Este valor se actualiza automáticamente mediante la composición de los atributos *map_lat* y *map_lon*, que se introducen mediante formulario de entrada de datos.

### act_name
* **Tipo de dato:** *string*
* **Descripción:** Nombre de la actividad

### act_descri
* **Tipo de dato:** *string*
* **Descripción:** Descripción de la actividad, redactada por un responsable de la actividad

### act_inicio
* **Tipo de dato:** *date*. En formato según norma ISO 8601. Ejemplo: 2014-09-01T18:46:48Z
* **Descripción:** Fecha y hora del inicio de la actividad

### ini_id
* **Tipo de dato:** *number*
* **Descripción:**  Identificador numérico de la iniciativa que organiza la actividad

### act_topic
* **Tipo de dato:** *string*
* **Descripción:** Temática de la actividad, entre los valores posibles enumerados de la lista *ActivityTopic*

### act_otopic
* **Tipo de dato:** *string*
* **Descripción:** Temática de la actividad, cuando no se ajusta entre los tipificados en la lista *ActivityTopic*

### act_form
* **Tipo de dato:** *string*
* **Descripción:** Forma de la actividad, con los valores posibles enumerados en la lista *ActivityForm*

### act_oform
* **Tipo de dato:** *string*
* **Descripción:** Forma de la actividad, cuando no se ajusta entre los tipificados en la lista *ActivityForm*

### act_atten
* **Tipo de dato:** *string*
* **Descripción:** Tipo de inscripción, con los valores posibles enumerados en la lista *ActivityAttend*

### act_oattend
* **Tipo de dato:** *string*
* **Descripción:** Tipo de inscripción, cuando no se ajusta entre los tipificados en la lista *ActivityAttend*

### act_web
* **Tipo de dato:** *string*
* **Descripción:** Dirección URL donde se encuentre una descripción de la actividad, proporcionada por responsable de iniciativa

### city
* **Tipo de dato:** *string*
* **Descripción:** Ciudad donde se desarrolla la actividad

### map_addres
* **Tipo de dato:** *string*
* **Descripción:** Dirección postal donde se desarrolla la actividad. Ejemplo: Calle Fuenteovejuna, 15, Madrid

### map_lat
* **Tipo de dato:** *number*
* **Descripción:** Latitud geográfica, expresada en grados con decimales, en el sistema de referencia WGS84

### map_lon
* **Tipo de dato:** *number*
* **Descripción:** Longitud geográfica, expresada en grados con decimales, en el sistema de referencia WGS84

### created_at
* **Tipo de dato:** *date*. En formato según norma ISO 8601. Ejemplo: 2014-09-01T18:46:48Z
* **Descripción:** Fecha de incorporación de la información de la actividad a la base de datos

### updated_at
* **Tipo de dato:** *date*. En formato según norma ISO 8601. Ejemplo: 2014-09-01T18:46:48Z
* **Descripción:** Fecha del último cambio en la información de la actividad en la base de datos

---
# Listas de valores
---
## ActivityTopic

Lista de posibles valores que puede tener la Temática de una Actividad o la temática general de las actividades que organiza una Iniciativa (atributo *ini_topic* de la tabla *iniciativas* y atributo *act_topic* de la tabla *actividades*).

Esta lista de valores ha sido confeccionada mediante diversos talleres y dinámicas realizados con las propias iniciativas

* **Apoyo Mutuo y Cuidados**
Crianza, Salud, Soberanía Alimentaria, Banco de Alimentos, Gastronomía, Nutrición, Comida y Excedentes, Bienestar Animal...
* **Arte Urbano**
Graffitti, Intervenciones artísticas....
* **Cultura libre**
Ciencia, Tecnología, Software Libre, Cultura Hacker, Identidad Digital, Datos, Sociedad, Gestión cultural, Edición, Musica, Cine, Artes Visuales...
* **Deporte**
* **Derechos e Igualdad**
Género, Feminismo, Derechos Humanos, Decolonialismo, Comunidades Indígenas...
* **Ecología Urbana y Consumo**
Permacultura, Agricultura Urbana, Producción Ecológica, Banco de Semillas, Ruralización, Huertos Urbanos, Ecología, Sostenibilidad, Contaminación, Ecoturismo, Reciclaje
* **Economía Colaborativa**
Economía Social, Autogestión, Decrecimiento, Banca Ética, Banco de Tiempo, Moneda Social, Microfinanciación, Propiedad Compartida, Trueque, Cadena de Servicios, Trabajo Compartido, Consumo Colaborativo, Producción Colaborativa, DIY...
* **Educación Expandida**
Educación, Emprendizaje, Intercambio de Conocimientos, Conocimiento Compartido, Inteligencia P2P
* **Mediación y Facilitación**
Intermediación, Facilitación, Desarrollo social y comunitario, Visibilización, Cartografías y Mapeos, Redes...
* **Movilidad Sostenible**
Calles tranquilas, Carsharing, Carpooling, Bicicletas
* **Política y Gobernanza**
Gobernanza, Políticas Públicas, Energía, Datos Abiertos, Justicia, Transparencia, Participación, Periodismo P2P, Comunes, Presupuestos Participativos...
* **Urbanismo y Patrimonio**
Urbanismo, Arquitectura, Geografía, Vivienda Compartida, Solares Vacíos, Muros, Mobiliario y Dispositivos, Diseño, Autoconstrucción, Derivas...
* **Otra**

---
## IniciativeSpace
Lista de posibles valores que puede tener el tipo de espacio donde se desarrolla u organiza la iniciativa (atributo *ini_space* de la tabla *iniciativas*)

* **Centro Social**
* **Derivas y Rutas Urbanas**
* **Despensas Solidarias y Bancos de Intercambio**
* **Digital**
* **Espacio de Encuentro Diálogo y Corresponsabilidad**
* **Escuela Popular**
* **Huerto Urbano**
* **Infraestructuras y/o Intervenciones Urbanas**
* **Medios de Comunicación Vecinales**
* **Mercado Social**
* **Solares y Espacios Recuperados**
* **Espacio de Trabajo Colaborativo**
* **Otros**

---
## IniciativeAgent
Lista de posibles valores que puede tener el tipo de agente impulsor de la iniciativa (atributo *ini_agent* de la tabla *iniciativas*)

* **Administración Pública**
* **Asambleas Populares, Mareas, Plataformas y Grupos de Trabajo**
* **Conquistas Ciudadanas del Pasado**
* **Empresa Social/Startup**
* **Iniciativa Ciudadana**
* **Organizaciones y Asociaciones de Vecinos**

---
## ActivityForm

Lista de posibles valores que puede tener la Forma de una Actividad (atributo *act_form* de la tabla *actividades*)

* **Audiovisual:** Media, Documental, Película, Música, Concierto...
* **Curso:** Curso, Convocatoria, Concurso, Beca, Residencia, Práctica...
* **Digital:** Proyecto tecnológico, Software, Aplicación, Web, Blog, Podcast, Cartografía, Repositorio, Archivo Digital, Librería Digital
* **Encuentro:** Encuentro, Foro, Asamblea...
* **Evento:** Evento, Performance, Acción, Función, Festival, Teatro, Fiesta, Feria...
* **Exposición:** Exposición
* **Presentación:** Presentación, Conferencia, Charla, Debate, Conversatorio...
* **Publicación:** Publicación, Revista, Fanzine, Libro, Prensa, Editorial, Entrevista, Artículo...
* **Taller:** Taller, Autoconstrucción, Intervención Urbana, Trabajo Comunitario, Derivas, Rutas, Rodadas, Estudio de Campo...

---
## ActivityAttend
Lista de posibles valores que puede tener la inscripción en la actividad (atributo *act_atten* de la tabla *actividades*)

* **category-attendance-free:** Libre / Gratuita
* **category-attendance-register:** Inscripción previa /gratuita
* **category-attendance-paid-inplace:** De pago en el mismo lugar de la actividad
* **category-attendance-paid-register:** De pago en la inscripción previa

# Condiciones y Licencias de los datos

Esta base de datos no recopila ningún tipo de información personal de las personas que dan de alta nuevas iniciativas o actividades. Solo se recogen los datos que se refieren a las actividades y a las iniciativas que las organizan.

![CC](https://i.creativecommons.org/l/by-sa/4.0/88x31.png "Imagen del Logo Creative Commons")

Todos los datos recopilados están disponibles bajo [Licencia Creative Commons Atribución-CompartirIgual 4.0 Internacional](http://creativecommons.org/licenses/by-sa/4.0/)

Puedes consultar, descargar o utilizar el API que los proporciona desde el servicio de www.cartodb.com:

* [Datos de las iniciativas recopiladas]()
* [Datos de las actividades recopiladas]()
