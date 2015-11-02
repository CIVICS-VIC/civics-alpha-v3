            $(function() {
                
                $.datepicker.regional['es'] = {
                closeText: 'Cerrar',
                prevText: '&#x3c;Ant',
                nextText: 'Sig&#x3e;',
                currentText: 'Hoy',
                monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
                'Jul','Ago','Sep','Oct','Nov','Dic'],
                dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
                dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
                dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
                weekHeader: 'Sm',
                dateFormat: 'yy-mm-dd',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                
                yearSuffix: ''};
                
                $.timepicker.regional['es'] = {
                    timeOnlyTitle: 'Titulo',
                    timeText: 'Hora',
                    hourText: 'Horas',
                    minuteText: 'Minutos',
                    timezoneText: 'Zona horaria',
                    currentText: 'Ahora',
                    closeText: 'Cerrar',
                    timeFormat: 'HH:mm',
                    //amNames: ['AM', 'A'],
                    //pmNames: ['PM', 'P'],
                    isRTL: false
                };
                $.timepicker.setDefaults($.timepicker.regional['es']);
                
                
            $.datepicker.setDefaults($.datepicker.regional['es']);
                $( "#datetime_start" ).datetimepicker({
                     
                    minDate: 0,
                  //  maxDate: 30,
                    numberOfMonths: 1,
                    showButtonPanel: true,
                    changeMonth:true,
                    changeYear:true,
                    onClose: function( selectedDate ) {
                        $( "#datetime_end" ).datepicker( "option", "minDate", selectedDate );
                    }
                    
                });
                
                
                $( "#datetime_end" ).datetimepicker({
                    minDate: 0,
                  //  maxDate: 30,
                    numberOfMonths: 1,
                    showButtonPanel: true,
                    changeMonth:true,
                    changeYear:true,
                    onClose: function( selectedDate ) {
                        $( "#datetime_start" ).datepicker( "option", "maxDate", selectedDate );
                    }
                });
                
                
            });