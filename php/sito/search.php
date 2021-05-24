<?php	
    require_once 'dbconfig.php';
	$conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));$object = array();
	$testo=mysqli_real_escape_string($conn, $_GET["testo"]);
	$pagina=$_GET["pagina"];
	$query="select nome, immagine from immobile where nome like '%".$testo."%' and tipo='".$pagina."';";
    $res = mysqli_query($conn,$query);
    while($row = mysqli_fetch_assoc($res)){
        $object[] = $row;
    }
    mysqli_free_result($res);
    mysqli_close($conn);
    echo json_encode($object);
?>