/*CIVICS alpha v3*/
/*Mapa de Iniciativas*/

window.onload = function() {
    data.init();
    ui.bindEvts();
    map.init();
};

//Detecta si en la url se indica la ciudad a visualizar

var ciudad;
var centro = new L.LatLng(40.41075,-3.69366);
var cadVariables = location.search.substring(1,location.search.length);
var cityquery="Madrid";

if (cadVariables.length>0){
  var arrVariables = cadVariables.split("&");
  for (i=0; i<arrVariables.length; i++){

        arrVariableActual = arrVariables[i].split("=");
        if (isNaN(parseFloat(arrVariableActual[1])))
          eval(arrVariableActual[0]+"='"+unescape(arrVariableActual[1])+"';");

        else{
          eval(arrVariableActual[0]+"="+arrVariableActual[1]+";");
        }      
    }

    ciudad = city;
    if (ciudad=="MexicoDF"){
        centro = new L.LatLng(19.434997, -99.132633);
        cityquery = "Mexico DF";
    };
    if(ciudad=="Madrid"){
        centro = new L.LatLng(40.41075,-3.69366);
        cityquery = "Madrid";
    };
    if(ciudad=="Quito"){
        centro = new L.LatLng(-0.2108, -78.4747); 
        cityquery = "Quito";
    };
    $('.hd-menu-mas').find('a').remove();
    $('.hd-menu-mas').append('<a class="hd-main" href="./formulario/?city=' + ciudad +'">Añadir</a>' );
    $('.hd-menu-act').find('a').remove();
    $('.hd-menu-act').append('<a class="hd-main-r" href="../actividades/?city=' + ciudad +'">Actividades</a>' ); 
}

var ui = {
    bindEvts: function() {
        // toggle sidebar display
        $('#show-sidebar').click(function() {
            $('#sidebar').toggleClass('act');
            $('body').toggleClass('sidebarAct');
            setTimeout(function() {
                map.data.map.invalidateSize(true);
            }, 1200);
        });
        $('.hd-menu-tema').delegate('a', 'click', function() {
            var $elm = $(this);

            if ($elm.hasClass('active')) {
                $elm.parents('.hd-menu-tema')
                  .find('.active').removeClass('active').end()
                  .find('.hd-main').removeClass('active');
                data.activateCategory(null);
            } else {
                $elm.parents('.hd-menu-tema')
                  .find('.active').removeClass('active').end()
                  .find('.hd-main').addClass('active');
                $elm.addClass('active');
                data.activateCategory($(this).data('tema'));
            }
            return false;
        });
        $('.hd-menu-space').delegate('a', 'click', function() {
            var $elm = $(this);

            if ($elm.hasClass('active')) {
                $elm.parents('.hd-menu-space')
                  .find('.active').removeClass('active').end()
                  .find('.hd-main').removeClass('active');
                data.activateTipo(null);
            } else {
                $elm.parents('.hd-menu-space')
                  .find('.active').removeClass('active').end()
                  .find('.hd-main').addClass('active');
                $elm.addClass('active');
                data.activateTipo($(this).data('tipo'));
            }
            return false;
        });
        $('.hd-menu-agent').delegate('a', 'click', function() {
            var $elm = $(this);

            if ($elm.hasClass('active')) {
                $elm.parents('.hd-menu-agent')
                  .find('.active').removeClass('active').end()
                  .find('.hd-main').removeClass('active');
                data.activateAgent(null);
            } else {
                $elm.parents('.hd-menu-agent')
                  .find('.active').removeClass('active').end()
                  .find('.hd-main').addClass('active');
                $elm.addClass('active');
                data.activateAgent($(this).data('agente'));
            }
            return false;
        });
        $('.hd-menu-place').delegate('a', 'click', function() {
            var $elm = $(this);
            var ciud = $elm[0];
            var city = ciud.toString();
            city = city.split('=');

            if ($elm.hasClass('active')) {
                $elm.parents('.hd-menu-place')
                  .find('.active').removeClass('active').end()
                  .find('.hd-main').removeClass('active');                
            } else {
                $elm.parents('.hd-menu-place')
                  .find('.active').removeClass('active').end()
                  .find('.hd-main').addClass('active');
                $elm.addClass('active');                
            }

            //alert(city[1]);
            map.cambiociudad(city[1]);
            return false;
        });
        $('.closeForm').click(function() {

            $('.bl-slide-pnl.active').removeClass('active');
        });

        $('.openForm').click(function() {

            var target = $(this).data('target');

            $('.bl-slide-pnl.active').removeClass('active');
            $('.bl-slpnl-' + target).addClass('active');
            console.log('Espacio activo: ' + data.data.filters.tipo);
        });

        $('.hidebtn').click(function() {
            $('#sidebar').removeClass('act');
        });
    }
};

var data = {
    init: function() {
        this.data.sql.execute(map.queryer())
            .done(function(response) {
                var $menuAgente = $('.hd-menu-agent ul').html('');
                var $menuTypo = $('.hd-menu-space ul').html('');
                var $menuTema = $('.hd-menu-tema ul').html('');
                data.data.data = response.rows;
                data.data.oms = new OverlappingMarkerSpiderfier(map.data.map, {
                    nearbyDistance: 30,
                    keepSpiderfied: true,
                    legWeight: 0
                });
                // scan data
                for (var i = response.rows.length - 1; i >= 0; i--) {
                    response.rows[i].inicioOK = moment(response.rows[i].inicio);
                    response.rows[i].finalOK = moment(response.rows[i].final);
                    data.drawMarker(response.rows[i]);
                    if (response.rows[i].espacio && data.data.types.indexOf(response.rows[i].espacio) == -1) {
                        data.data.types.push(response.rows[i].espacio);
                        $menuTypo.append('<li><a href="#" class="ic--' + response.rows[i].espacio + '" data-tipo="' + response.rows[i].espacio + '">' + response.rows[i].espacio + '</a></li>');
                    }
                    if (response.rows[i].tematica && data.data.temas.indexOf(response.rows[i].tematica) == -1) {
                        data.data.temas.push(response.rows[i].tematica);
                        $menuTema.append('<li><a href="#" class="ic--' + response.rows[i].tematica + '" data-tema="' + response.rows[i].tematica + '">' + response.rows[i].tematica + '</a></li>');
                    }
                    if (response.rows[i].agente && data.data.agents.indexOf(response.rows[i].agente) == -1) {
                        data.data.agents.push(response.rows[i].agente);
                        $menuAgente.append('<li><a href="#" data-agente="' + response.rows[i].agente + '">'+ response.rows[i].agente + '</a></li>');
                    }
                }
                //list alphabetically
                $(".hd-menu-3 li").sort(asc_sort).appendTo('.hd-menu-3');
                $(".hd-menu-4 li").sort(asc_sort).appendTo('.hd-menu-4');
                $(".hd-menu-5 li").sort(asc_sort).appendTo('.hd-menu-5');                
                // accending sort
                function asc_sort(a, b){
                    return ($(b).text()) < ($(a).text()) ? 1 : -1;    
                }
            })
            .error(function(errors) {
                // errors contains a list of errors
                console.log("errors:" + errors);
            });

    },
    activateAgent: function(age) {     
      data.data.filters.age = age;
      data.processFilters();
      console.log('Agente activo: ' + data.data.filters.age);
    },
    activateCategory: function(cat) {     
      data.data.filters.cat = cat;
      data.processFilters();
      console.log('Categoría activa: ' + data.data.filters.cat);
    },
    activateTipo: function(tipo) {
      data.data.filters.tipo = tipo;
      data.processFilters();
      console.log('Espacio activo: ' + data.data.filters.tipo);
    },
    processFilters: function(){

      for (var i = data.data.markers.length - 1; i >= 0; i--) {
        var marker = data.data.markers[i];
        var markerData = marker.options.data; 
        // comprueba agente
        if(data.data.filters.age && markerData.agente != data.data.filters.age) {
          $(marker._icon).addClass('disabled');
          continue;
        }
        // comprueba categoría
        if(data.data.filters.cat && markerData.tematica != data.data.filters.cat) {
          $(marker._icon).addClass('disabled');
          continue;
        }
        // comprueba tipo
        if(data.data.filters.tipo && markerData.espacio != data.data.filters.tipo) {
          $(marker._icon).addClass('disabled');
          continue;
        }
        $(marker._icon).removeClass('disabled');
      }
    },
    clearFilters: function() {
      data.data.filters = data.data.initialFilters; // reset filters

      for (var i = data.data.markers.length - 1; i >= 0; i--) { // reenable all markers
          $(data.data.markers[i]._icon).removeClass('disabled');
      }
    },
    drawMarker: function(point) {

        var icon = L.divIcon({
            iconSize: [40, 40],
             html: '<div class="mk ic--' + point.tematica + ' ic--' + point.espacio + '">'
        });
    var mark = L.marker([point.lat, point.lon],{ icon: icon, data: point, title: point.title })
      //.addTo(map.data.map)
      .on('click', function(){ data.openPop(point, this) });
    map.data.map.addLayer(mark);
    data.data.oms.addMarker(mark);
    data.data.markers.push(mark);

  },
    openPop: function(popdata, mk) {

        if (data.activePop == popdata) return;

        var timeout = 0;
        var pop = $('#sidebar');
        var icon =$('.ini-categ')

        if (data.activePop) {
            data.closePops();
            timeout = 600;
        }
        data.data.popTimeout = setTimeout(function() {            
            //var address = popdata.place + ": " + popdata.tipovia + " " + popdata.nomvia + "," + popdata.portal;
            var address = popdata.address;
            var web;
            var facebook;
            var twuser = popdata.ini_twitter.slice(1);
            var datoscontacto='';
            if (popdata.ini_tef!==null && popdata.ini_tef!==''){datoscontacto += '<i class="fa fa-phone"></i> '+ popdata.ini_tef + '</br>'}

            if (popdata.ini_mail!==null && popdata.ini_mail!==''){datoscontacto+= '<i class="fa fa-envelope"></i> ' + popdata.ini_mail}
            if (popdata.ini_web!==null && popdata.ini_web!=='' && popdata.ini_web!==' '){
                    datoscontacto +='</br><i class="fa fa-globe"></i> <a href="'+ popdata.ini_web +'" target="_blank" > ' + popdata.ini_web + '</a>';
                }
            if (popdata.ini_twitter!==null && popdata.ini_twitter!==''){datoscontacto+='</br><i class="fa fa-twitter"></i> <a href="https://twitter.com/' + twuser +'" target="_blank" > ' + popdata.ini_twitter +'</a>';}
            if (popdata.ini_facebook!==null && popdata.ini_facebook!==''){datoscontacto+='</br><i class="fa fa-facebook"></i> <a href="'+ popdata.ini_facebook +'" target="_blank" > ' + popdata.ini_facebook +'</a>';}

            pop.find('h2').html(popdata.title);        
            pop.find('.ini-address').html(address);       
            pop.find('h3').html('<p><i class="fa fa-tag"></i>  '+ popdata.tematica + '</br><i class="fa fa-umbrella"></i>  ' + popdata.espacio + '</br><i class="fa fa-users"></i>  ' + popdata.agente + "</p>").removeClass().addClass($(mk._icon).find('div').attr('class'));
            //pop.find('.ini-categ').html(popdata.tematica + "</br>" + popdata.espacio + "</br>" + popdata.agente);
            pop.find('.ini-desc').html(popdata.descr);
            pop.find('.ini-contact').html(datoscontacto);

            data.activePop = popdata;
            pop.addClass('act');

        }, timeout);

    },
    closePops: function() {
        $('#sidebar').removeClass('act');
    },
    data: {
        sql: new cartodb.SQL({
            user: 'mappemad'
        }), // sql object
        data: null, // everything
        agents: [], // agent types
        types: [], // space types
        temas: [], // ini themes
        activePop: null,
        popCloseDelay: 400,
        popTimeout: null,
        markers: [],
        filters: {
          age: null,
          cat: null,
          tipo: null
        },
        initialFilters: {
          age: null,
          cat: null,
          tipo: null
        }
    }
};



//if (place == Madrid){
//  city=mad}

var mex = [19.434997, -99.132633];
var qui =[-0.2108, -78.4747]
var mad = [40.41, -3.7];

var map = {
    init: function() {
        this.data.map = L.map('map', {
            //zoomControl: true,
            //center: mex,
            center: centro,
            zoom: 12,
            minZoom: 11
        });
        // add a nice baselayer from Stamen
        L.tileLayer('http://a.tiles.mapbox.com/v3/madridcivic.n54hlbcl/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '+'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '+'Imagery © <a href="http://mapbox.com">Mapbox</a>'+' Service offered by <a href="http://cartodb.com">CartoDB</a>'
        }).addTo(this.data.map);
        //L.control.zoom('zoom',{position:'topright'});
        setTimeout(function() {
            $('#contact-form').show();
        }, 1000);
    },
    cambiociudad: function(ciudad) {
        //this.data.map.setView([21.115693,-101.6523579], 12);
        var city;
        var scp;

        if (ciudad == 'MexicoDF') {
            city = mex;
            scp = 12;
            cityquery = "Mexico DF";
        } else if (ciudad == 'Quito') {
            city = qui;
            scp = 12;
            cityquery = "Quito";
        } else if (ciudad == 'Madrid') {
            city = mad;
            scp = 12;
            cityquery = "Madrid";
        } else {
            return false;
        }

        $('.hd-menu-mas').find('a').remove();
        $('.hd-menu-mas').append('<a class="hd-main" href="./formulario/?city=' + ciudad +'">Añadir</a>' );
        $('.hd-menu-act').find('a').remove();
        $('.hd-menu-act').append('<a class="hd-main-r" href="../actividades/?city=' + ciudad +'">Actividades</a>' ); 
        
        this.data.map.setView(city, scp);
        mapa.init();

    },
    loadCartoDb: function() {
        if (!this.data.map) this.init();

        //this.data.mapConfig.sublayers.sql = map.queryer();

        cartodb.createLayer(this.data.map, this.data.mapConfig)

        .on('done', function(lyr) {

            map.data.cartoLayer = lyr;

            lyr.getSubLayer(0).on('featureOver', function(e, pos, latlng, data) {
                cartodb.log.log(e, pos, latlng, data);
            });

            lyr.getSubLayer(0).infowindow.set({
                template: $('#infowindow_template').html(),
                width: 350,
                maxHeight: 400
            });

        }).on('error', function() {
            console.log("some error occurred");
        });
    },
    queryer: function(options) {

        var query = "SELECT ini_name as title, lat, lon, ini_addres as address, ini_agent as agente, ini_topic as tematica, ini_space as espacio, cartodb_id, the_geom_webmercator, ini_descri as descr, ini_tef, ini_web, ini_mail, ini_twitter, ini_facebook FROM iniciativas where city like '" + cityquery + "'";
                    //+ 'SELECT ini_name as title, lat, lon, ini_addres as address, ini_agent as agente, ini_topic as tematica, ini_space as espacio, cartodb_id, the_geom_webmercator, ini_descri as descr, ini_tef, ini_web, ini_mail, ini_twitter, ini_facebook FROM iniciativas_df';
        // var query = 'SELECT espacio_table.act_name as title, espacio_table.ini_id, espacio_table.act_topic as tematica, espacio_table.cartodb_id, espacio_table.act_descri as descr, espacio_table.act_inicio as inicio, espacio_table.act_final as final, espacio_table.ini_web, place_form_table.pla_name as place, place_form_table.pla_tipovia as tipovia, place_form_table.pla_nomvia as nomvia, place_form_table.pla_numportal as portal, place_form_table.map_long as lon, place_form_table.map_lat as lat FROM espacio_table, place_form_table WHERE espacio_table.pla_id = place_form_table.pla_id';
        if (options) {
            if (options.type) {
                query += 'where espacio = "' + options.type + '"';
            }
        }
        if (options) {
            
            if (options.agent) {
                query += 'where agente = "' + options.agent + '"';
            }
        }
        return query;
    },    
    getCategory: function(evtType) {
        //select * from actividades_ics where act_type = 'taller'
        map.data.cartoLayer.getSubLayer(0).setSQL(map.queryer({
            type: evtType
        }));
        $('#clearFilters').show();
        return false;
    },
    clearCategory: function() {
        $('#clearFilters').hide();
        map.data.cartoLayer.getSubLayer(0).setSQL(map.queryer());
        return false;
    },
    data: {
        map: null,
        cartoLayer: null,
        mapConfig: {
            user_name: 'mappemad',
            type: 'cartodb',
            sublayers: [{
                //sql: 'SELECT ini_name as title, lat, lon, ini_addres as address, ini_agent as agente, ini_topic as tematica, ini_space as espacio, cartodb_id, the_geom_webmercator, ini_descri as descr, ini_tef, ini_web, ini_mail, ini_twitter, ini_facebook FROM iniciativas_fram;'
                sql: "SELECT ini_name as title, lat, lon, ini_addres as address, ini_agent as agente, ini_topic as tematica, ini_space as espacio, cartodb_id, the_geom_webmercator, ini_descri as descr, ini_tef, ini_web, ini_mail, ini_twitter, ini_facebook FROM iniciativas where city like '" + cityquery + "';"
                //sql: 'SELECT espacio_table.act_name as title, espacio_table.ini_id, espacio_table.act_topic as tematica, espacio_table.cartodb_id, espacio_table.act_descri as descr, espacio_table.act_inicio as inicio, espacio_table.act_final as final, espacio_table.ini_web, place_form_table.pla_name as place, place_form_table.pla_tipovia as tipovia, place_form_table.pla_nomvia as nomvia, place_form_table.pla_numportal as portal, place_form_table.map_long as lon, place_form_table.map_lat as lat FROM espacio_table, place_form_table WHERE espacio_table.pla_id = place_form_table.pla_id',
            }],
        }
    }
};

(function() {
    /*
 OverlappingMarkerSpiderfier
https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet
Copyright (c) 2011 - 2012 George MacKerron
Released under the MIT licence: http://opensource.org/licenses/mit-license
Note: The Leaflet maps API must be included *before* this code
*/
    (function() {
        var q = {}.hasOwnProperty,
            r = [].slice;
        null != this.L && (this.OverlappingMarkerSpiderfier = function() {
            function n(c, b) {
                var a, e, g, f, d = this;
                this.map = c;
                null == b && (b = {});
                for (a in b) q.call(b, a) && (e = b[a], this[a] = e);
                this.initMarkerArrays();
                this.listeners = {};
                f = ["click", "zoomend"];
                e = 0;
                for (g = f.length; e < g; e++) a = f[e], this.map.addEventListener(a, function() {
                    return d.unspiderfy()
                })
            }
            var d, k;
            d = n.prototype;
            d.VERSION = "0.2.6";
            k = 2 * Math.PI;
            d.keepSpiderfied = !1;
            d.nearbyDistance = 5;
            d.circleSpiralSwitchover = 9;
            d.circleFootSeparation =
                25;
            d.circleStartAngle = k / 12;
            d.spiralFootSeparation = 28;
            d.spiralLengthStart = 5;
            d.spiralLengthFactor = 5;
            d.legWeight = 1.5;
            d.legColors = {
                usual: "#222",
                highlighted: "#f00"
            };
            d.initMarkerArrays = function() {
                this.markers = [];
                return this.markerListeners = []
            };
            d.addMarker = function(c) {
                var b, a = this;
                if (null != c._oms) return this;
                c._oms = !0;
                b = function() {
                    return a.spiderListener(c)
                };
                c.addEventListener("click", b);
                this.markerListeners.push(b);
                this.markers.push(c);
                return this
            };
            d.getMarkers = function() {
                return this.markers.slice(0)
            };
            d.removeMarker = function(c) {
                var b, a;
                null != c._omsData && this.unspiderfy();
                b = this.arrIndexOf(this.markers, c);
                if (0 > b) return this;
                a = this.markerListeners.splice(b, 1)[0];
                c.removeEventListener("click", a);
                delete c._oms;
                this.markers.splice(b, 1);
                return this
            };
            d.clearMarkers = function() {
                var c, b, a, e, g;
                this.unspiderfy();
                g = this.markers;
                c = a = 0;
                for (e = g.length; a < e; c = ++a) b = g[c], c = this.markerListeners[c], b.removeEventListener("click", c), delete b._oms;
                this.initMarkerArrays();
                return this
            };
            d.addListener = function(c, b) {
                var a,
                    e;
                (null != (e = (a = this.listeners)[c]) ? e : a[c] = []).push(b);
                return this
            };
            d.removeListener = function(c, b) {
                var a;
                a = this.arrIndexOf(this.listeners[c], b);
                0 > a || this.listeners[c].splice(a, 1);
                return this
            };
            d.clearListeners = function(c) {
                this.listeners[c] = [];
                return this
            };
            d.trigger = function() {
                var c, b, a, e, g, f;
                b = arguments[0];
                c = 2 <= arguments.length ? r.call(arguments, 1) : [];
                b = null != (a = this.listeners[b]) ? a : [];
                f = [];
                e = 0;
                for (g = b.length; e < g; e++) a = b[e], f.push(a.apply(null, c));
                return f
            };
            d.generatePtsCircle = function(c, b) {
                var a, e,
                    g, f, d;
                g = this.circleFootSeparation * (2 + c) / k;
                e = k / c;
                d = [];
                for (a = f = 0; 0 <= c ? f < c : f > c; a = 0 <= c ? ++f : --f) a = this.circleStartAngle + a * e, d.push(new L.Point(b.x + g * Math.cos(a), b.y + g * Math.sin(a)));
                return d
            };
            d.generatePtsSpiral = function(c, b) {
                var a, e, g, f, d;
                g = this.spiralLengthStart;
                a = 0;
                d = [];
                for (e = f = 0; 0 <= c ? f < c : f > c; e = 0 <= c ? ++f : --f) a += this.spiralFootSeparation / g + 5E-4 * e, e = new L.Point(b.x + g * Math.cos(a), b.y + g * Math.sin(a)), g += k * this.spiralLengthFactor / a, d.push(e);
                return d
            };
            d.spiderListener = function(c) {
                var b, a, e, g, f, d, h, k, l;
                (b = null !=
                    c._omsData) && this.keepSpiderfied || this.unspiderfy();
                if (b) return this.trigger("click", c);
                g = [];
                f = [];
                d = this.nearbyDistance * this.nearbyDistance;
                e = this.map.latLngToLayerPoint(c.getLatLng());
                l = this.markers;
                h = 0;
                for (k = l.length; h < k; h++) b = l[h], this.map.hasLayer(b) && (a = this.map.latLngToLayerPoint(b.getLatLng()), this.ptDistanceSq(a, e) < d ? g.push({
                    marker: b,
                    markerPt: a
                }) : f.push(b));
                return 1 === g.length ? this.trigger("click", c) : this.spiderfy(g, f)
            };
            d.makeHighlightListeners = function(c) {
                var b = this;
                return {
                    highlight: function() {
                        return c._omsData.leg.setStyle({
                            color: b.legColors.highlighted
                        })
                    },
                    unhighlight: function() {
                        return c._omsData.leg.setStyle({
                            color: b.legColors.usual
                        })
                    }
                }
            };
            d.spiderfy = function(c, b) {
                var a, e, g, d, p, h, k, l, n, m;
                this.spiderfying = !0;
                m = c.length;
                a = this.ptAverage(function() {
                    var a, b, e;
                    e = [];
                    a = 0;
                    for (b = c.length; a < b; a++) k = c[a], e.push(k.markerPt);
                    return e
                }());
                d = m >= this.circleSpiralSwitchover ? this.generatePtsSpiral(m, a).reverse() : this.generatePtsCircle(m, a);
                a = function() {
                    var a, b, k, m = this;
                    k = [];
                    a = 0;
                    for (b = d.length; a < b; a++) g = d[a], e = this.map.layerPointToLatLng(g), n = this.minExtract(c, function(a) {
                        return m.ptDistanceSq(a.markerPt,
                            g)
                    }), h = n.marker, p = new L.Polyline([h.getLatLng(), e], {
                        color: this.legColors.usual,
                        weight: this.legWeight,
                        clickable: !1
                    }), this.map.addLayer(p), h._omsData = {
                        usualPosition: h.getLatLng(),
                        leg: p
                    }, this.legColors.highlighted !== this.legColors.usual && (l = this.makeHighlightListeners(h), h._omsData.highlightListeners = l, h.addEventListener("mouseover", l.highlight), h.addEventListener("mouseout", l.unhighlight)), h.setLatLng(e), h.setZIndexOffset(1E6), k.push(h);
                    return k
                }.call(this);
                delete this.spiderfying;
                this.spiderfied = !0;
                return this.trigger("spiderfy", a, b)
            };
            d.unspiderfy = function(c) {
                var b, a, e, d, f, k, h;
                null == c && (c = null);
                if (null == this.spiderfied) return this;
                this.unspiderfying = !0;
                d = [];
                e = [];
                h = this.markers;
                f = 0;
                for (k = h.length; f < k; f++) b = h[f], null != b._omsData ? (this.map.removeLayer(b._omsData.leg), b !== c && b.setLatLng(b._omsData.usualPosition), b.setZIndexOffset(0), a = b._omsData.highlightListeners, null != a && (b.removeEventListener("mouseover", a.highlight), b.removeEventListener("mouseout", a.unhighlight)), delete b._omsData, d.push(b)) :
                    e.push(b);
                delete this.unspiderfying;
                delete this.spiderfied;
                this.trigger("unspiderfy", d, e);
                return this
            };
            d.ptDistanceSq = function(c, b) {
                var a, e;
                a = c.x - b.x;
                e = c.y - b.y;
                return a * a + e * e
            };
            d.ptAverage = function(c) {
                var b, a, e, d, f;
                d = a = e = 0;
                for (f = c.length; d < f; d++) b = c[d], a += b.x, e += b.y;
                c = c.length;
                return new L.Point(a / c, e / c)
            };
            d.minExtract = function(c, b) {
                var a, d, g, f, k, h;
                g = k = 0;
                for (h = c.length; k < h; g = ++k)
                    if (f = c[g], f = b(f), "undefined" === typeof a || null === a || f < d) d = f, a = g;
                return c.splice(a, 1)[0]
            };
            d.arrIndexOf = function(c, b) {
                var a,
                    d, g, f;
                if (null != c.indexOf) return c.indexOf(b);
                a = g = 0;
                for (f = c.length; g < f; a = ++g)
                    if (d = c[a], d === b) return a;
                return -1
            };
            return n
        }())
    }).call(this);
}).call(this);
/* Mon 14 Oct 2013 10:54:59 BST */