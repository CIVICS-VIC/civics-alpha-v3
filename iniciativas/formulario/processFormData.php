<?php
	include('functions.php');
	global $debug;
	global $ciudadURL;
    $urlvuelta = 'Location: http://www.viveroiniciativasciudadanas.net/civics/iniciativas/';
	if(!$debug)header($urlvuelta);
?>

<?php 
 
  $ini_city = strip_tags($_POST['ini_city']);

  
  $ini_lat = strip_tags($_POST['ini_latitude']);  
  $ini_lon = strip_tags($_POST['ini_longitude']);
  $map_zoom = strip_tags($_POST['map_zoom']);

  //METER DATOS INICIATIVAS EN CARTODB

  $ini_name_registered = strip_tags($_POST['ini_name_registered']);
  $ini_id = "";
  if($ini_name_registered == ini_other){
	 
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
   * Alerta correo electrónico
   */
   $texToMailAlert = "MIME_VERSION: 1.0\r\n";
   $texToMailAlert .= "Content-type: text/html; charset=UTF-8\r\n";
   $texToMailAlert .= "From: Formulario Actividades Civic";
   
   $mail_to="yourmail@yourdomain.com";
  
  
   
   $mail_subject = "Nueva iniciativa en: " . $ini_city;

   $mail_body = "<b> Iniciativa: " . $ini_name .
   
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

	
	$result = executeQueryToCartoDB($sqlRegisterActivity);
	if($debug)echo("Form input result: " . $result . "<br>");	
	
?>