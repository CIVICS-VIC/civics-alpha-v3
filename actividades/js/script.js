/*CIVICS alpha v3*/
/*Mapa de Actividades*/

window.onload = function() {
    data.init();
    ui.bindEvts();
    map.init();
};

//Detecta si en la url se indica la ciudad a visualizar

var ciudad='Madrid';
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
    $('.hd-menu-mas').find('a').remove();
    $('.hd-menu-mas').append('<a class="hd-main" href="./formulario/?city=' + ciudad +'">Añadir</a>' );
    $('.hd-menu-ini').find('a').remove();
    $('.hd-menu-ini').append('<a class="hd-main-r" href="../iniciativas/?city=' + ciudad +'">Iniciativas</a>' );
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
        $('.hd-menu-org').delegate('a', 'click', function() {
            var $elm = $(this);

            if ($elm.hasClass('active')) {
                $elm.parents('.hd-menu-org')
                  .find('.active').removeClass('active').end()
                  .find('.hd-main').removeClass('active');
                data.activateCategory(null);
            } else {
                $elm.parents('.hd-menu-org')
                  .find('.active').removeClass('active').end()
                  .find('.hd-main').addClass('active');
                $elm.addClass('active');
                data.activateCategory($(this).data('tema'));
            }
            return false;
        });
        $('.hd-menu-typo').delegate('a', 'click', function() {
            var $elm = $(this);

            if ($elm.hasClass('active')) {
                $elm.parents('.hd-menu-typo')
                  .find('.active').removeClass('active').end()
                  .find('.hd-main').removeClass('active');
                data.activateTipo(null);
            } else {
                $elm.parents('.hd-menu-typo')
                  .find('.active').removeClass('active').end()
                  .find('.hd-main').addClass('active');
                $elm.addClass('active');
                data.activateTipo($(this).data('tipo'));
            }
            return false;
        });
        $('.hd-menu-date ul').delegate('a', 'click', function() {
            var $elm = $(this);

            if ($elm.hasClass('active')) {
                $elm.parents('.hd-menu-date')
                  .find('.active').removeClass('active').end()
                  .find('.hd-main').removeClass('active');
                data.activateDate(null);
            } else {
                $elm.parents('.hd-menu-date')
                  .find('.active').removeClass('active').end()
                  .find('.hd-main').addClass('active');
                $elm.addClass('active');
                data.activateDate($elm.data('date'));
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
                var $menuTypo = $('.hd-menu-typo ul').html('');
                var $menuTema = $('.hd-menu-org ul').html('');
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
                    if (response.rows[i].act_form && data.data.types.indexOf(response.rows[i].act_form) == -1) {
                        data.data.types.push(response.rows[i].act_form);
                        $menuTypo.append('<li><a href="#" class="ic--' + response.rows[i].act_form + '" data-tipo="' + response.rows[i].act_form + '">' + response.rows[i].act_form + '</a></li>');
                    }
                    if (response.rows[i].act_theme && data.data.temas.indexOf(response.rows[i].act_theme) == -1) {
                        data.data.temas.push(response.rows[i].act_theme);
                        $menuTema.append('<li><a href="#" class="ic--' + response.rows[i].act_theme + '" data-tema="' + response.rows[i].act_theme + '">' + response.rows[i].act_theme + '</a></li>');
                    }
                }

  //list alphabetically
                $(".hd-menu-3 li").sort(asc_sort).appendTo('.hd-menu-3');
                $(".hd-menu-4 li").sort(asc_sort).appendTo('.hd-menu-4');                
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
    activateCategory: function(cat) {     
      data.data.filters.cat = cat;
      data.processFilters();
      console.log('Categoría activa: ' + data.data.filters.cat);
    },
    activateTipo: function(tipo) {
      data.data.filters.tipo = tipo;
      data.processFilters();
      console.log('tipo activo: ' + data.data.filters.tipo);
    },
    activateDate: function(date) {
      switch(date) {        
        case 'future':
          data.data.filters.date.ini = moment().startOf('day');
          data.data.filters.date.end = moment().add(100, 'years');
        break;
        case 'hoy':
          data.data.filters.date.ini = moment().startOf('day');
          data.data.filters.date.end = moment().endOf('day');
        break;
        case 'manana':
          data.data.filters.date.ini = moment().add(1, 'days').startOf('day');
          data.data.filters.date.end = moment().add(1, 'days').endOf('day');
        break;
        case 'weekend':
          data.data.filters.date.ini = moment().day(6).startOf('day');
          data.data.filters.date.end = moment().day(7).endOf('day');
        break;
        case 'nextweek':
          data.data.filters.date.ini = moment().day('monday').day(7).startOf('day');
          data.data.filters.date.end = moment().day('Sunday').day(14).endOf('day');
        break;
        case 'nextmonth':
          data.data.filters.date.ini = moment().startOf('day');
          data.data.filters.date.end = moment().add(1, 'month').endOf('day');
        break;
        case 'previous':
          data.data.filters.date.ini = moment().subtract(100, 'years');
          data.data.filters.date.end = moment().endOf('day');
        break;
        default:
          data.data.filters.date.ini = moment().startOf('day');
          data.data.filters.date.end = moment().add(100, 'years');
        break;        
      }

      data.processFilters();
      console.log('Fecha activa: ', data.data.filters.date.ini, data.data.filters.date.end);
    },
    processFilters: function(){
      for (var i = data.data.markers.length - 1; i >= 0; i--) {
        var marker = data.data.markers[i];
        var markerData = marker.options.data;
        console.log(markerData.inicioOK, markerData.inicioOK.isBefore(data.data.filters.date.ini) ||
            markerData.inicioOK.isAfter(data.data.filters.date.end))
          // comprueba fechas
        if (markerData.inicioOK.isBefore(data.data.filters.date.ini) ||
            markerData.inicioOK.isAfter(data.data.filters.date.end)) {
          $(marker._icon).addClass('disabled');
          continue;
        }
          // comprueba categoría
        if(data.data.filters.cat && markerData.act_theme != data.data.filters.cat) {
          $(marker._icon).addClass('disabled');
          continue;
        }
          // comprueba categoría
        if(data.data.filters.tipo && markerData.act_form != data.data.filters.tipo) {
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
             html: '<div class="mk ic--' + point.act_theme + ' ic--' + point.act_form + '">'
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

        if (data.activePop) {
            data.closePops();
            timeout = 600;
        }

        data.data.popTimeout = setTimeout(function() {

            var fech = popdata.inicio;
            var anio = fech.slice(0, 4);
            var dia = fech.slice(8, 10);
            var mes = fech.slice(5, 7);
            var hora = fech.slice(11, -4);
            var meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            var fecha = '<span style="font-size: 1.7em">' + hora + "h</span><br/>" + dia + " de " + meses[parseInt(mes - 1)] + " de " + anio;
            //var address = popdata.place + ": " + popdata.tipovia + " " + popdata.nomvia + "," + popdata.portal;
            var address = popdata.map_addres;
            pop.find('h2').html(popdata.title).removeClass().addClass($(mk._icon).find('div').attr('class'));
            pop.find('.evt-desc').html(fecha + "</br>" +
                address + "</br>" + "</br>" +
                popdata.descr + "</br>" + "</br>" +
                '<a target="_blank" style="display: block;" href="https://twitter.com/intent/tweet?button_hashtag=civics&amp;via=civicses&amp;text=' + popdata.title.trim() + ' (' + dia + '/' + mes + '/' + anio + ') ' + popdata.act_web + '" data-lang="es" data-related="#urban #city #' + popdata.act_theme + '" data-url="http://viveroiniciativasciudadanas.net/" via="civicses"><i class="fa fa-twitter"></i>  Twitealo</a>' +
                '<a target="_blank" href=' + popdata.act_web + "> <i class='fa fa-globe'></i>  Consultar en la web de los organizadores</a>");

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
        types: [], // event types
        temas: [], // event types
        activePop: null,
        popCloseDelay: 400,
        popTimeout: null,
        markers: [],
        filters: {
          date: { ini: moment().subtract(100, 'years'), end: moment().add(100, 'years') },
          cat: null,
          tipo: null
        },
        initialFilters: {
          date: { ini: moment().subtract(100, 'years'), end: moment().add(100, 'years') },
          cat: null,
          tipo: null
        }
    }
};

//if (place == Madrid){
//  city=mad}

var mex = [19.434997, -99.132633];
var gua = [21.115693, -101.6523579];
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
        } else if (ciudad == 'Guanajuato') {
            city = gua;
            scp = 12;
        } else if (ciudad == 'Madrid') {
            city = mad;
            scp = 12;
            cityquery = "Madrid";
        } else {
            return false;
        }

        $('.hd-menu-mas').find('a').remove();
        $('.hd-menu-mas').append('<a class="hd-main" href="./formulario/?city=' + ciudad +'">Añadir</a>' );

        $('.hd-menu-ini').find('a').remove();
        $('.hd-menu-ini').append('<a class="hd-main-r" href="../iniciativas/?city=' + ciudad +'">Iniciativas</a>' );

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
        //var query = "SELECT act_name as title, ini_id, map_lat as lat, map_lon as lon, map_addres, act_topic as act_theme, act_form, cartodb_id, the_geom_webmercator, act_descri as descr, act_inicio as inicio, act_final as final, act_web FROM actividades";
        var query = "SELECT act_name as title, ini_id, map_lat as lat, map_lon as lon, map_addres, act_topic as act_theme, act_form, cartodb_id, the_geom_webmercator, act_descri as descr, act_inicio as inicio, act_final as final, act_web FROM actividades where city like '" + cityquery + "'";
        // var query = 'SELECT act_form_table.act_name as title, act_form_table.ini_id, act_form_table.act_topic as act_theme, act_form_table.cartodb_id, act_form_table.act_descri as descr, act_form_table.act_inicio as inicio, act_form_table.act_final as final, act_form_table.act_web, place_form_table.pla_name as place, place_form_table.pla_tipovia as tipovia, place_form_table.pla_nomvia as nomvia, place_form_table.pla_numportal as portal, place_form_table.map_long as lon, place_form_table.map_lat as lat FROM act_form_table, place_form_table WHERE act_form_table.pla_id = place_form_table.pla_id';
        if (options) {
            if (options.type) {
                query += 'where act_form = "' + options.type + '"';
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
                sql: "SELECT act_name as title, ini_id, map_lat as lat, map_lon as lon, map_addres, act_topic as act_theme, cartodb_id, the_geom_webmercator, act_descri as descr, act_form FROM actividades where city like '" + cityquery + "'"
                //sql: 'SELECT act_form_table.act_name as title, act_form_table.ini_id, act_form_table.act_topic as act_theme, act_form_table.cartodb_id, act_form_table.act_descri as descr, act_form_table.act_inicio as inicio, act_form_table.act_final as final, act_form_table.act_web, place_form_table.pla_name as place, place_form_table.pla_tipovia as tipovia, place_form_table.pla_nomvia as nomvia, place_form_table.pla_numportal as portal, place_form_table.map_long as lon, place_form_table.map_lat as lat FROM act_form_table, place_form_table WHERE act_form_table.pla_id = place_form_table.pla_id',
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