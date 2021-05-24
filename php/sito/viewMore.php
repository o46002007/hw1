<?php
	require_once 'checkSessione.php';
	$id=checkSessione();
	
    require_once 'dbconfig.php';
	$object=array();
	$conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
	$index=mysqli_real_escape_string($conn, $_GET['index']);
	$query="select nome, descrizione, mq, prezzo, città from immobile where nome='".$index."';";
    $res = mysqli_query($conn,$query);
    $object[0] = mysqli_fetch_assoc($res);
	if($id){
		$object[1]=$id;
	}
    mysqli_free_result($res);
    mysqli_close($conn);
    echo json_encode($object);
?>