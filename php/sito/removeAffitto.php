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
	$data_inizio=mysqli_real_escape_string($conn, $_GET['inizio_affitto']);
	$data_fine=mysqli_real_escape_string($conn, $_GET['fine_affitto']);
	
	$query1='select id from immobile where nome="'.$codice_immobile.'";';
	$res1=mysqli_query($conn,$query1);
	$id_immobile=mysqli_fetch_assoc($res1);
	
	$query="delete from affitto where id_utente=".$id." and id_immobile=".$id_immobile['id']." and data_inizio='".$data_inizio."' and data_fine='".$data_fine."';";
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