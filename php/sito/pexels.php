<?php
	$key_img="563492ad6f9170000100000170d0c687a38046c6bcbf0edaae6d419d";
	$img_endpoint="https://api.pexels.com/v1";
	$testo=$_GET['testo'];

	$curl=curl_init();
	$dati=array("query"=>$testo);
	$dati=http_build_query($dati);
	$img_request=$img_endpoint."/search?query=".$dati;
	
	curl_setopt($curl, CURLOPT_URL, $img_request);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
	$header=array('Authorization: '.$key_img);
	curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	$result=curl_exec($curl);
	echo $result;
	curl_close($curl);
?>