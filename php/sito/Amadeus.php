<?php
	require_once 'checkSessione.php';
	$id=checkSessione();
	if(!$id){
		echo json_encode("error");
		exit;
	}
	
	$token=$_GET['token'];
	$città=$_GET['città'];
	$object=array();
	
	$endpoint="https://test.api.amadeus.com";
	$curl=curl_init();
	$dati=array("cityCode"=>$città);
	$dati=http_build_query($dati);
	$real_endpoint=$endpoint."/v2/shopping/hotel-offers?".$dati;
	curl_setopt($curl, CURLOPT_URL, $real_endpoint);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
	$header=array('Authorization:Bearer '.$token);
	curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
	curl_setopt($curl, CURLOPT_CERTINFO, true);
	curl_setopt($curl, CURLOPT_VERBOSE, 1);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	$object[0]=$città;
	$object[1]=json_decode(curl_exec($curl));
	echo json_encode($object);
	curl_close($curl);
?>