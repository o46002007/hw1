<?php
	session_start();
	require_once 'dbconfig.php';
	
	function checkSessione(){
		GLOBAL $dbconfig;
		
		if(!isset($_SESSION['id'])){
			if(isset($_COOKIE['id_utente']) && isset($_COOKIE['id']) && isset($_COOKIE['token'])){
				$conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
				$id_utente=$_COOKIE['id_utente'];
				$id=$_COOKIE['id'];
				$query="select * from cookie where id_utente='".$id_utente."' and id='".$id."';";
				$res=mysqli_query($conn, $query);
				$cookie=mysqli_fetch_assoc($res);
				if($cookie){
					if(time()>$cookie['tempo']){
						$query1="delete from cookie where id='".$id."';";
						$res1=mysqli_query($conn, $query1);
						echo $res1;
						header('Location: logout.html');
						exit;
					}else if(password_verify($_COOKIE['token'], $cookie['hash'])){
						return $_COOKIE['id_utente'];
						mysql_close($conn);
						mysqli_free_result($res);
					}
				}
			}
		}else{
			return $_SESSION['id'];
		}
	}
?>