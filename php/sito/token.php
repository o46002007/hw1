<?php
	require_once 'checkSessione.php';
	$id=checkSessione();
	if(!$id){
		echo json_encode("error");
		exit;
	}
	
	
	$client_id="sEopByNfs1zJaAWNH59uoA5nAMhCGXZi";
	$client_secret="fPW5dAVC323PROA2";
	//$client_id="WcoA3EPYVPOxXptWsXj79Q3Mkaku1oNq";
	//$client_secret="BffGHSlaqQS5OkQI";
	$endpoint="https://test.api.amadeus.com";
	$real_endpoint=$endpoint."/v1/security/oauth2/token";
	
	$curl=curl_init();
	curl_setopt($curl, CURLOPT_URL, $real_endpoint);
	curl_setopt($curl, CURLOPT_POST, 1);
	curl_setopt($curl, CURLOPT_POSTFIELDS, "grant_type=client_credentials&client_id=".$client_id."&client_secret=".$client_secret);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
	$header=array("Content-Type:application/x-www-form-urlencoded");
	curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	$result=curl_exec($curl);
	echo $result;
	curl_close($curl);
?>