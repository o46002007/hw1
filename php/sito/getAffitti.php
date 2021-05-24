<?php
	require_once 'checkSessione.php';
	$id=checkSessione();
	if(!$id){
		echo json_encode("error");
		exit;
	}
	
    require_once 'dbconfig.php';
	$conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
	$object = array();	
	$query='select i.nome, i.immagine, a.data_inizio, a.data_fine from immobile i, affitto a where a.id_immobile=i.id and a.id_utente='.$id.';';
	$res=mysqli_query($conn, $query);
	while($row = mysqli_fetch_assoc($res)){
        $object[] = $row;
    }
    mysqli_free_result($res);
    mysqli_close($conn);
    echo json_encode($object);
?>