<?php
	require_once 'checkSessione.php';
	$id=checkSessione();
	if(!$id){
		echo json_encode("error");
		exit;
	}
	
    require_once 'dbconfig.php';
	$conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
	$pagina=mysqli_real_escape_string($conn, $_GET['pagina']);
    $object=array();
	$query='select i.città from immobile i, utente u, preferiti p where p.id_immobile=i.id and p.id_utente=u.id and p.id_utente ="'.$id.'" and i.tipo="'.$pagina.'";';
	
	$res = mysqli_query($conn, $query);
	while($row = mysqli_fetch_assoc($res)){
        $object[]=$row;
    }
	
    mysqli_free_result($res);
    mysqli_close($conn);
	echo json_encode($object);
?>
