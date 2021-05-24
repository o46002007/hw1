<?php
	require_once 'checkSessione.php';
	$id=checkSessione();
	if(!$id){
		echo json_encode("error");
		exit;
	}
	
    require_once 'dbconfig.php';
	$conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
	$nome=mysqli_real_escape_string($conn, $_GET['index']);
	
	$inizioAffitto=mysqli_real_escape_string($conn, $_GET['inizioAffitto']);
	$fineAffitto=mysqli_real_escape_string($conn, $_GET['fineAffitto']);
	
	$query1='select id from immobile where nome="'.$nome.'";';
	$res1=mysqli_query($conn,$query1);
	$id_immobile=mysqli_fetch_assoc($res1);
	
	$query2="insert into affitto (id_utente, id_immobile, data_inizio, data_fine) values (".$id.", ".$id_immobile['id'].", '".$inizioAffitto."', '".$fineAffitto."');";
	$res2=mysqli_query($conn, $query2);
    
    mysqli_close($conn);
	echo json_encode($res2);
?>
