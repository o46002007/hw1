<?php
	require_once 'checkSessione.php';
	$id=checkSessione();
	if(!$id){
		echo json_encode("error");
		exit;
	}
	
    require_once 'dbconfig.php';
	$conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
	$codice_immobile=mysqli_real_escape_string($conn, $_GET['index']);
	
	$query1='select id from immobile where nome="'.$codice_immobile.'";';
	$res1=mysqli_query($conn,$query1);
	$id_immobile=mysqli_fetch_assoc($res1);
	
	$query="delete from preferiti where id_immobile='".$id_immobile['id']."';";
    $res = mysqli_query($conn,$query);
    $risultato=null;
	if($res){
		$risultato="ok";
	}
	else{
		$risultato="error";
	}
	echo json_encode($risultato);
	mysqli_close($conn);
?>