<?php
	include('functions.php');
	global $debug;
	if(!$debug)header('Location: http://www.viveroiniciativasciudadanas.net/civics/actividades');
?>

<?php 	
 
 /**
  * Get form data
  */
  //INFO ACTIVITIES
  //Activity basic data
  $act_name = strip_tags($_POST['activity']);
  $act_descri = strip_tags($_POST['long_description']);
  $act_web = strip_tags($_POST['web_activity']);
  
  //Act. categories
  $act_topic = strip_tags($_POST['category_topic']);
  	$act_otopic = strip_tags($_POST['cat_topic_others']);
  $act_form = strip_tags($_POST['category_type']);
  	$act_oform = strip_tags($_POST['cat_type_others']);
  $act_atten = strip_tags($_POST['category_attendance']);
  	$act_oatten = strip_tags($_POST['category_attendance_others']);
  
  //Act. schedule
  $act_start = strip_tags($_POST['datetime_start']);

  //Act. GEOinfo
  
  $map_addres = strip_tags($_POST['address']);
  $map_lat = strip_tags($_POST['map_latitude']);
  $map_lon = strip_tags($_POST['map_longitude']);

  $ini_city = strip_tags($_POST['ini_city']);
  $act_city = $ini_city;
  
  $ini_lat = strip_tags($_POST['ini_latitude']);  
  $ini_lon = strip_tags($_POST['ini_longitude']);
  $map_zoom = strip_tags($_POST['map_zoom']);


  //METER DATOS INICIATIVAS EN CARTODB

  $ini_name_registered = strip_tags($_POST['ini_name_registered']);
  $ini_id = "";
  if($ini_name_registered == ini_other){
	  //$ini_name = str_replace(" ", "_", strip_tags($_POST['ini_name']));
	  $ini_name = strip_tags($_POST['ini_name']);
	  $ini_descri = strip_tags($_POST['ini_descri']);
	  $ini_topic = strip_tags($_POST['ini_topic']);
	  $ini_agent = strip_tags($_POST['ini_agent']);
	  $ini_space = strip_tags($_POST['ini_space']);
	  $ini_mail = strip_tags($_POST['ini_mail']);
	  $ini_tef = strip_tags($_POST['ini_tef']); 
	  $ini_web = strip_tags($_POST['ini_web']);
	  $ini_facebook = strip_tags($_POST['ini_facebook']);
	  $ini_twitter = strip_tags($_POST['ini_twitter']);

	  //Ini. GEOinfo
	  $ini_city = strip_tags($_POST['ini_city']);
	  $ini_addres = strip_tags($_POST['ini_addres']);
	  $ini_lat = strip_tags($_POST['ini_latitude']);
	  $ini_lon = strip_tags($_POST['ini_longitude']);
	  $ini_zoom = strip_tags($_POST['ini_zoom']);  
	  
	  $sqlRegisterIni = "INSERT INTO " . $ini_table_name 
		. "(" 
		. $cartodb_ini_field_the_geom 			. ","
		. $cartodb_ini_field_ini_name 		. ","
		. $cartodb_ini_field_ini_descri 	. ","
		. $cartodb_ini_field_ini_topic 	. ","
		. $cartodb_ini_field_ini_agent 	. ","
		. $cartodb_ini_field_ini_space 	. ","
		. $cartodb_ini_field_ini_mail 		. ","
		. $cartodb_ini_field_ini_tef 		. ","
		. $cartodb_ini_field_ini_web 		. ","
		. $cartodb_ini_field_ini_facebook 		. ","
		. $cartodb_ini_field_ini_twitter 		. ","
		. $cartodb_ini_field_ini_city 		. ","
		. $cartodb_ini_field_ini_addres 		. ","
		. $cartodb_ini_field_map_lat 		. ","
		. $cartodb_ini_field_map_lon
	 	. ") VALUES (" 
	 	. "ST_SetSRID(ST_Point(". $ini_lon . "," . $ini_lat . "), 4326)"."," 	//1 - the_geom
	 	. "'" . $ini_name  ."'" . "," 						
	 	. "'" . $ini_descri ."'". "," 						
	 	. "'" . $ini_topic ."'". "," 						
	 	. "'" . $ini_agent ."'". "," 						
	 	. "'" . $ini_space ."'". "," 						
	 	. "'" . $ini_mail  ."'"  . ","
	 	. "'" . $ini_tef  ."'" . ","
	 	. "'" . $ini_web  ."'" . "," 					
	 	. "'" . $ini_facebook  ."'" . "," 					
	 	. "'" . $ini_twitter  ."'" . "," 					
	 	. "'" . $ini_city  ."'" . "," 					
	 	. "'" . $ini_addres  ."'" . "," 					
	 	. "'" . $ini_lat  ."'" . "," 					
	 	. "'" . $ini_lon  . "'" 				
	 	. ")";
	   if($debug)echo("VOY A REGISTRAR UNA NUEVA INICIATIVA:".$ini_name."<br>");
	   $resultIniQuery = executeQueryToCartoDB($sqlRegisterIni);
	   if($debug)echo("Estoy registrando nueva iniciativa: " . $resultIniQuery. "<br>");
	   $ini_id = getIdFromIniciative($ini_name);
	   if($debug)echo("ID de iniciativa que acaba de registrarse: " . $ini_id. "<br>");
  }else {
  	   if($debug)echo("VOY A RECUPERAR EL ID DE UNA NUEVA INICIATIVA REGISTRADA: ".$ini_name_registered."<br>");
   	   $ini_id = getIdFromIniciative($ini_name_registered);
	   if($debug)echo("ID de iniciativa ya registrada (". $ini_name_registered . "): " . $ini_id . "<br>");
  } 
	
  
  //Meta Datos
  $delivery_date_time = time();
  $ev_c_date = date("j/n/Y", $delivery_date_time);
  
  /**
   * Configurar alerta correo electrónico
   */
   $texToMailAlert = "MIME_VERSION: 1.0\r\n";
   $texToMailAlert .= "Content-type: text/html; charset=UTF-8\r\n";
   $texToMailAlert .= "From: Formulario Actividades Civic";
   
   
   $mail_to="yourcheckmail@yourserver.com";
   
   $mail_subject = "Nueva actividad en " . $ini_city;

   $mail_body = "<b> Iniciativa: " . $ini_name_registered . $ini_name .
   "<br> Nueva actividad: " . $act_name . 
   "<br> descripción: <br> " . $act_descri . 
   "<br> desde: " . $act_start . 
   //"<br> hasta: " . $act_end . 
   "<br> en: " . $map_addres .
   "<br> lat: " . $map_lat . ", lon: " . $map_lon . 
   "<br> creada por: ". $ini_name . $ini_name_registered . 
   "<br> con web: " . $act_web . 
   "<br>" . $act_topic .
   "<br>" . $act_form .
   "<br>" . $act_atten .
   "<br>" .
   "<br> Si es una iniciativa nueva: " .
   "<br> nombre iniciativa: " . $ini_name .
   "<br> descripción iniciativa: " . $ini_descri .
   "<br> web iniciativa: " . $ini_web .
   "<br> mail iniciativa: " . $ini_mail .
   "<br> telef iniciativa: " . $ini_tef .
   "<br> dirección iniciativa: " . $ini_addres .
   "<br> lat: " . $ini_lat . ", lon: " . $ini_lon . 
   "</b>";
   
  	//enviar mail (función de php)
  	mail($mail_to, $mail_subject, $mail_body, $texToMailAlert);
	
		
	/*************************************************************************************************
	 * METER ACTIVIDADES EN CARTO DB
	 *************************************************************************************************/
	 
	$sqlRegisterActivity = "INSERT INTO " . $act_table_name 
		. "(" 

		. $cartodb_act_field_the_geom 			. ","

		. $cartodb_act_field_act_name 			. ","
		. $cartodb_act_field_act_descri 		. ","
		. $cartodb_act_field_act_web 			. ","
		. $cartodb_act_field_act_topic 			. ","
		. $cartodb_act_field_act_otopic 		. ","
		. $cartodb_act_field_act_form 			. ","
		. $cartodb_act_field_act_oform 			. ","
		. $cartodb_act_field_act_atten 			. ","
		. $cartodb_act_field_act_oatten 		. ","
		. $cartodb_act_field_act_start 			. ","

		 . $cartodb_act_field_act_city 		. ","
		 . $cartodb_act_field_map_addres 		. ","
		 . $cartodb_act_field_map_lat 			. ","
		 . $cartodb_act_field_map_lon			. ","

		. $cartodb_act_field_ini_id
		
		 
	 	. ") VALUES (" 

	 	. "ST_SetSRID(ST_Point(". $map_lon . "," . $map_lat . "), 4326)"."," 	//1 - the_geom
	 	. "'" . $act_name  ."'" . "," 						
	 	. "'" . $act_descri ."'". "," 						
	 	 . "'" . $act_web  ."'" . "," 					
	 	 . "'" . $act_topic  ."'"  . ","
	 	. "'" . $act_otopic  ."'" . ","
	 	. "'" . $act_form  ."'" . ","
	 	. "'" . $act_oform   ."'" . ","
	 	. "'" . $act_atten ."'" . ","
	 	. "'" . $act_oatten  ."'" . ","
	 	. "'" . $act_start  ."'" . ","

	 	 . "'" . $act_city  ."'" . ","
	 	 . "'" . $map_addres  ."'" . ","
	 	 . "'" . $map_lat  ."'" . ","
	 	 . "'" . $map_lon  ."'" . ","

	     . "'" . $ini_id  ."'" //. ","						
	 	. ")";

	
	$result = executeQueryToCartoDB($sqlRegisterActivity);
	if($debug)echo("Form input result: " . $result . "<br>");
	
?>