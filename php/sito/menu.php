<?php
	require_once 'checkSessione.php';
	$id=checkSessione();
	if($id){
		echo json_encode("ok");
		exit;
	}else{
		echo json_encode("nook");
		exit;
	}
?>