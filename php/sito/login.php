<?php
	require_once 'checkSessione.php';
	$id=checkSessione();
	if($id){
		header('Location: index.html');
		exit;
	}
	
	$errore=false;
	if(isset($_POST['username'])&&isset($_POST['password'])){
		require_once 'dbconfig.php';
		$conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
		
		$username=mysqli_real_escape_string($conn, $_POST['username']);
		$password=mysqli_real_escape_string($conn, $_POST['password']);
		
		$query='select * from utente where username="'.$username.'";';
		$res=mysqli_query($conn, $query);
		if(mysqli_num_rows($res)>0){
			$row=mysqli_fetch_assoc($res);
			$passwordCriptata=$row['password'];
			if(password_verify($password, $passwordCriptata)){
				$query1="select id from utente where username='".$username."';";
				$res1=mysqli_query($conn,$query1);
				$row=mysqli_fetch_assoc($res1);
				$id_utente=$row['id'];
				if(!isset($_POST['checkbox'])){
					$object=array();
					$_SESSION['id']=$id_utente;
				}else{
					$token=random_bytes(12);
					$hash=password_hash($token, PASSWORD_BCRYPT);
					$tempo=strtotime("+365 day");
					$query2="insert into cookie(hash, id_utente, tempo) values ('".$hash."','".$id_utente."','".$tempo."');";
					$res2=mysqli_query($conn, $query2);
					if($res2){
						setcookie("id_utente", $id_utente, $tempo);
						setcookie("id", mysqli_insert_id($conn), $tempo);
						setcookie("token", $token, $tempo);
					}
				}
				header('Location: index.html');
				mysqli_close($conn);
				exit;
			}else{
				$errore=true;
			}
		}else{
			$errore=true;
		}
	}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Your Property</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="preconnect" href="https://fonts.gstatic.com">
		<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet"> <!-- logo -->
		<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet"> <!-- article -->
		<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,300&display=swap" rel="stylesheet"> <!-- header -->
		<link rel="stylesheet" href="login.css">
		<script src="menu.js" defer></script>
		<script src="login.js" defer></script>
		<link rel="shortcut icon" href="immagini/shortcuticon.jpg" />
	</head>
	<body>
		<div id="pagina" class="hidden">login</div>
		<header>
			<nav>
				<div class="logo">
					<a>Your Property</a>
				</div>
				<div id="links">
					<a class="link" href="index.html">Home</a>
					<a class="link" href="registrazione.php">Registrati</a>
				</div>
				<div id="menu">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</nav>
		</header>
		<section>
			<div id="contenitore">
				<?php
					if($errore){
						echo "<h4 id='errorephp'>Credenziali errate</h4>";
					}
				?>
				<h4 class='errore' id="errore"></h4>
				<main>
					<form name="form" method="post">
						<label>Username<input type="text" name="username"<?php
							if(isset($_POST['username'])){
								echo "value=".$_POST['username'];
							}
						?>
						>
						</label>
						<label>Password<input type="password" name="password"></label>
						<label>Rimani collegato<input type="checkbox" id="checkbox" name="checkbox" value="checkbox"></label>
						<input id="invio" type="submit" name="invio" value="Accedi">
					</form>
				</main>
			</div>
		</section>
	</body> 
</html>