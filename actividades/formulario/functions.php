<?php

	$useMappeCartoDBCount = 1;
	$debug = 0;
	
	/*************************************************************************************************
	 * Campos cartoDB
	 *************************************************************************************************/
	 
	 //COMMON DATA
	 $act_table_name = 'actividades';
	 $ini_table_name = 'iniciativas';
	 
	 //ALTERNATIVE CARTODB DATA
	 $cartodb_user_ch = '';
	 $cartodb_api_key_ch = '';
	 
	 
	 //VIC CARTODB DATA
	 $cartodb_user_vic = 'mappemad';
	 $cartodb_api_key_vic = 'xxx';
	 
	 
	 //ACTIVIDADES

	 	//nombre de variable = nombre de campo en la tabla de cartodb

		$cartodb_act_field_cartodb_id= 'cartodb_id';
		$cartodb_act_field_the_geom= 'the_geom';
		$cartodb_act_field_created_at= 'created_at';
		$cartodb_act_field_updated_at= 'updated_at';
		$cartodb_act_field_act_name= 'act_name';
		$cartodb_act_field_act_descri= 'act_descri';
		$cartodb_act_field_act_web= 'act_web';
		$cartodb_act_field_act_topic= 'act_topic';
		$cartodb_act_field_act_otopic= 'act_otopic';
		$cartodb_act_field_act_form= 'act_form';
		$cartodb_act_field_act_oform= 'act_oform';
		$cartodb_act_field_act_atten= 'act_atten';
		$cartodb_act_field_act_oatten= 'act_oatten';
		//$cartodb_act_field_act_start= 'act_start'; //modificado CS
		//$cartodb_act_field_act_end= 'act_end';   //modificado CS
        $cartodb_act_field_act_start= 'act_inicio';   //modificado CS
		//$cartodb_act_field_act_end= 'act_final';    //modificado CS //modificado AZ
		//$cartodb_act_field_act_recurre= 'act_recurre';
		$cartodb_act_field_map_addres= 'map_addres';
		$cartodb_act_field_map_lat= 'map_lat';
		$cartodb_act_field_map_lon= 'map_lon';
		$cartodb_act_field_ini_id= 'ini_id';
		$cartodb_act_field_ev_timezon= 'ev_timezon';
		$cartodb_act_field_ev_c_date= 'ev_c_date';
		$cartodb_act_field_ev_status= 'ev_status';
		$cartodb_act_field_act_city= 'city';
		
		//INICIATIVAS
		$cartodb_ini_field_cartodb_id= 'cartodb_id';
		$cartodb_ini_field_ini_id= 'ini_id';
		$cartodb_ini_field_the_geom= 'the_geom';
		$cartodb_ini_field_created_at= 'created_at';
		$cartodb_ini_field_updated_at= 'updated_at';
		$cartodb_ini_field_ini_name= 'ini_name';
		$cartodb_ini_field_ini_descri= 'ini_descri';
		$cartodb_ini_field_ini_topic= 'ini_topic';
		$cartodb_ini_field_ini_agent= 'ini_agent';
		$cartodb_ini_field_ini_space= 'ini_space';
		$cartodb_ini_field_ini_mail= 'ini_mail';
		$cartodb_ini_field_ini_tef= 'ini_tef';
		$cartodb_ini_field_ini_web= 'ini_web';
		$cartodb_ini_field_ini_facebook= 'ini_facebook';
		$cartodb_ini_field_ini_twitter= 'ini_twitter';
		$cartodb_ini_field_ini_addres= 'ini_addres';
		$cartodb_ini_field_ini_city= 'city';
		$cartodb_ini_field_map_lat= 'lat';
		$cartodb_ini_field_map_lon= 'lon';
		
	/*************************************************************************************************
	 * FUNCTIONS
	 *************************************************************************************************/
	
	function executeQueryToCartoDB($sql_query){
		global $useMappeCartoDBCount;
		global $debug;		
		global $cartodb_user;
		global $cartodb_api_key;
		
		//Access data
		global $cartodb_user_vic;
		global $cartodb_api_key_vic;
		global $cartodb_user_ch;
		global $cartodb_api_key_ch;
		
		$cartodb_user="";
		$cartodb_api_key="";
		if($useMappeCartoDBCount){			
			$cartodb_user = $cartodb_user_vic;
			$cartodb_api_key = $cartodb_api_key_vic;
		}else{		
			$cartodb_user = $cartodb_user_ch;
			$cartodb_api_key = $cartodb_api_key_ch;
		}
		
		//---------------
		// Initializing curl
		$ch = curl_init( "https://".$cartodb_user.".cartodb.com/api/v2/sql" );
		$query = http_build_query(array('q'=>$sql_query,'api_key'=>$cartodb_api_key));
		// Configuring curl options
		curl_setopt($ch, CURLOPT_POST, TRUE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $query);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		$result_not_parsed = curl_exec($ch);
		// //----------------
		
		$result = json_decode($result_not_parsed, true);
		
		// echo("<br>executeQueryToCartoDB: json_decode:  " );
		
		if($debug){
			echo("<br>- Debugiing executeQueryToCartoDB:: ");
			echo("<br>- Us: ". $cartodb_user . "");
			echo("<br>- Key: ". $cartodb_api_key . "");
			echo("<br>- QUERY: ". $sql_query . "");
			echo("<br>- RESULT QUERY NOT PARSED: ". $result_not_parsed . "");
		 	echo("<br>- RESULT QUERY PARSED: ". $result . "<br>");			
			// echo("<br>- RESULT QUERY PARSED_2: ". $result['cartodb_id'] . "<br><br>");
		}
		 

		
		return $result;
	}

	function getIdFromIniciative($ini_name){
		global $debug;
		global $cartodb_ini_field_cartodb_id;
		global $cartodb_ini_field_ini_name;
		global $ini_table_name;
		
		$sqlToGetIdInitiative = "SELECT " . $cartodb_ini_field_cartodb_id . " FROM " . $ini_table_name . " WHERE " . $cartodb_ini_field_ini_name . " = '" . $ini_name . "'";
		$result = executeQueryToCartoDB($sqlToGetIdInitiative);
		
		$id = -1;
		
		foreach($result['rows'] as $row_complete){
			$id = $row_complete[$cartodb_ini_field_cartodb_id];
		} 
		
		 if($debug)echo("getIdFromIniciative(): Name: " . $ini_name . "=> ID devuelta: ". $id . "<br>");
		 
		return $id;
	}
	
	function getIniciatives(){
			global $debug;
			global $cartodb_ini_field_ini_name;
			global $ini_table_name;
			global $ciudad_activa;
			
			$sql= "SELECT * FROM " . $ini_table_name . " WHERE city like '" . $ciudad_activa . "' ORDER BY " . $cartodb_ini_field_ini_name . " ASC";
			$result = executeQueryToCartoDB($sql);
			if($debug)echo("<br>getNameIniciatives() query RESULT: " . $result . "<br>");
			
			return $result;
	}


	function getNameIniciatives(){
			global $debug;
			global $cartodb_ini_field_ini_name;
			
			$result = getIniciatives();
			//echo("<br>getNameIniciatives() query RESULT: " . $result . "<br>");
				
			$num=0;
			$iniciativasArray[]=array();
			foreach($result['rows'] as $row_complete){
				$ini_name = $row_complete['ini_name'];
				//echo("<br>Iniciativa (".$num."): " . $ini_name);
				$iniciativasArray[$num] = $ini_name;
				$num = $num+1;
			}

			// foreach($iniciativasArray as $valor){
				// echo("<br> IniciativasArray : " . $valor);
			// }
			return $iniciativasArray;
	}

	function getListIniciativesForHtmlForm(){
		
		$stringWithIniciatives= "";
		foreach(getNameIniciatives() as $ini){
			if(count($ini) > 0){
				$ini_noSpaces = str_replace(" ", "_", $ini);
				$ini_spaces = str_replace("_", " ", $ini);
				$fila = "<option value=" . $ini_noSpaces . ">" . $ini_spaces . "</option>" ;
				$stringWithIniciatives = $stringWithIniciatives .  $fila;
			}
		}
		return $stringWithIniciatives;
		
	}
	function listIniciativesRegistered(){
				
		global $cartodb_ini_field_cartodb_id;
		global $cartodb_ini_field_the_geom;
		global $cartodb_ini_field_created_at;
		global $cartodb_ini_field_updated_at;
		global $cartodb_ini_field_ini_name;
		global $cartodb_ini_field_ini_descri;
		global $cartodb_ini_field_ini_topic;
		global $cartodb_ini_field_ini_agent;
		global $cartodb_ini_field_ini_space;
		global $cartodb_ini_field_ini_mail;
		global $cartodb_ini_field_ini_tef;
		global $cartodb_ini_field_ini_web;
		global $cartodb_ini_field_ini_facebook;
		global $cartodb_ini_field_ini_twitter;
		global $cartodb_ini_field_ini_addres;
			
		
		$result = getIniciatives();
		$stringResult="<ul>";
		
		foreach($result['rows'] as $row_complete){
			$ini_field_cartodb_id = $row_complete[$cartodb_ini_field_cartodb_id];
			$ini_field_the_geom  = $row_complete[$cartodb_ini_field_the_geom];
			$ini_field_created_at  = $row_complete[$cartodb_ini_field_created_at];
			$ini_field_updated_at  = $row_complete[$cartodb_ini_field_updated_at];
			$ini_field_ini_name  = $row_complete[$cartodb_ini_field_ini_name];
			$ini_field_ini_descri  = $row_complete[$cartodb_ini_field_ini_descri];
			$ini_field_ini_topic  = $row_complete[$cartodb_ini_field_ini_topic];
			$ini_field_ini_agent  = $row_complete[$cartodb_ini_field_ini_agent];
			$ini_field_ini_space  = $row_complete[$cartodb_ini_field_ini_space];
			$ini_field_ini_mail = $row_complete[$cartodb_ini_field_ini_mail];
			$ini_field_ini_tef = $row_complete[$cartodb_ini_field_ini_tef];
			$ini_field_ini_web  = $row_complete[$cartodb_ini_field_ini_web];
			$ini_field_ini_facebook  = $row_complete[$cartodb_ini_field_ini_facebook];
			$ini_field_ini_twitter  = $row_complete[$cartodb_ini_field_ini_twitter];
			$ini_field_ini_addres = $row_complete[$cartodb_ini_field_ini_addres];
			$stringFila = "Id: " . $ini_field_cartodb_id . ";<ul><li>Name: " . $ini_field_ini_name . ";</li><li>Web: " . $ini_field_ini_web . "</li></ul>";
			$stringResult = $stringResult .  $stringFila ;
		}
		$stringResult = $stringResult . "</ul>";
		
	
		return $stringResult;
		
	}

?>