<?php
	session_start();
	session_destroy();
	if(isset($_COOKIE['id_utente']) && isset($_COOKIE['token']) && isset($_COOKIE['id'])){
		require_once 'dbconfig.php';
		$conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
		$id=$_COOKIE['id'];
		$id_utente=$_COOKIE['id_utente'];
		$query="select id, hash from cookie where id='".$id."' and id_utente='".$id_utente."';";
		$res=mysqli_query($conn, $query);
		$cookie=mysqli_fetch_assoc($res);
		if($cookie){
			if(password_verify($_COOKIE['token'], $cookie['hash'])){
				$query1="delete from cookie where id='".$id."';";
				mysqli_query($conn, $query1);
				mysqli_close($conn);
				setcookie('id_utente','');
				setcookie('id','');
				setcookie('token','');
			}
		}
		mysqli_free_result($res);
		setcookie('id_utente','');
		setcookie('id','');
		setcookie('token','');
	}
	
	header('Location: index.html');
	exit;
?>