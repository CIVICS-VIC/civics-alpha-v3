<?php
	include('functions.php');
	global $debug;
	global $ciudadURL;
    $urlvuelta = 'Location: http://www.viveroiniciativasciudadanas.net/civics/iniciativas/?city=' + $ciudadURL;
	if(!$debug)header($urlvuelta);
?>
<!-- 
<!doctype html>

<html lang="en">
<head>
  <link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v2/themes/css/cartodb.css" />
	<script src="http://libs.cartocdn.com/cartodb.js/v2/cartodb.js"></script>
	<script src="js/sqlDataQueries.js"></script>
	<style>
    html, body {padding: 0; margin: 0;}
    #cartodb-map { width: 100%; height:100%; background: black;}
	</style>
</head>
<body>
</body>
</html> 
-->
<?php 
 
  $ini_city = strip_tags($_POST['ini_city']);

  
  $ini_lat = strip_tags($_POST['ini_latitude']);  
  $ini_lon = strip_tags($_POST['ini_longitude']);
  $map_zoom = strip_tags($_POST['map_zoom']);
  //echo "Activity: " . $act_name. "--  Lat: " . $map_lat . ", Long: " . $map_long ;
  //echo "<br/><br/>";

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
		//. $cartodb_ini_field_ini_id 			. ","
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
	 	//. "'" . $ini_id  ."'" . "," 						
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
   
   $mail_to="yourcheckmail@yourserver";
  
   
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
	
		
	/*************************************************************************************************
	 * METER ACTIVIDADES EN CARTO DB
	 *************************************************************************************************/
	 
	 /** TEST CURL **/
	 
	 //Example query. This inserts a point into a table: Longitude -120.23, Latitude: 10.66
	//$sql = "INSERT INTO untitled_table_2(the_geom,name) VALUES(ST_SetSRID(ST_MakePoint(-120.23,10.66),4326),'test')";
//	$sql = "SELECT * FROM ". $table_name;
	
	/**
	 * SQL QUE FUNCIONAN
	 * INSERT INTO chem_table (cartodb_id) values (4)
	 * INSERT INTO chem_table (cartodb_id, act_name) values (5, 'tralaro')
	 * INSERT INTO chem_table (act_type, act_name) values ('jar jar', 'tralarero')
	 * INSERT INTO chem_table (act_type) values ('holoita')
	 * INSERT INTO chem_table (act_name) values ('holoita')
	 * DELETE from chem_table where cartodb_id > 1
	 */
	//$sql = "INSERT INTO chem_table (act_name) values ('holoita')";
	//$sql = "INSERT INTO ". $table_name ."(" . $cartodb_field_2 . ") values (' ". $activity . " ')";
	
	$result = executeQueryToCartoDB($sqlRegisterActivity);
	if($debug)echo("Form input result: " . $result . "<br>");
	
	 
	 /** 2 test secret **/
	 
	 
	 // $cartodb_secret = '';
// 	 
// 	 
	 // require_once 'cartodb.class.php';
// 
	// # Create the client using the API key and Secret.
	// $cartodb =  new CartoDBClient($cartodb_api_key, $cartodb_secret);
// 	
	// # Check if the key and secret work fine and you are authorized
	// if(!$cartodb->authorized) {
	    // echo("There is a problem authenticating, check the key and secret");
	    // die();
	// }
// 	
	// # Now we can perform queries straigh away. The second param indicates if you want
	// # the result to be json_decode (true) or just return the raw json string
// 	
	// $result = $cartodb->runSql("SELECT *,geojson(the_geom) FROM my_table",false);
	// echo($result);
	
	
?>