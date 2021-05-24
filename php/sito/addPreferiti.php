<?php
	require_once 'checkSessione.php';
	$id=checkSessione();
	if(!$id){
		echo json_encode("error");
		exit;
	}
	
    require_once 'dbconfig.php';
	$conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
	$nome_immobile=mysqli_real_escape_string($conn, $_GET['index']);
	$risultato=null;
	
	$query1='select id from immobile where nome="'.$nome_immobile.'";';
	$res1=mysqli_query($conn,$query1);
	$id_immobile=mysqli_fetch_assoc($res1);
	
	$query2='select * from preferiti where id_utente="'.$id.'" and id_immobile="'.$id_immobile['id'].'";';
	$res2=mysqli_query($conn,$query2);
	if(mysqli_num_rows($res2)==0){
		$query='insert into preferiti(id_utente, id_immobile) VALUES ("'.$id.'","'.$id_immobile['id'].'");';
		$res = mysqli_query($conn,$query);
		$risultato="ok";
	}else{
		$risultato="error";
	}
	echo json_encode($risultato);
	mysqli_close($conn);
?>