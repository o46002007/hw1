<?php
	require_once 'checkSessione.php';
	$id=checkSessione();
	if($id){
		header('Location: logout.php');
		exit;
	}
	
	$errore=false;
	if(isset($_POST['nome'])&&isset($_POST['cognome'])&&isset($_POST['password'])&&isset($_POST['password'])){
		require_once 'dbconfig.php';
		$conn=mysqli_connect($dbconfig['host'],$dbconfig['user'],$dbconfig['password'],$dbconfig['name'])or die(mysqli_error($conn));
		$nome=mysqli_real_escape_string($conn, $_POST['nome']);
		$cognome=mysqli_real_escape_string($conn, $_POST['cognome']);
		$username=mysqli_real_escape_string($conn, $_POST['username']);
		$password=mysqli_real_escape_string($conn, $_POST['password']);
		$confermapassword=mysqli_real_escape_string($conn, $_POST['confermapassword']);
		
		if($password!==$confermapassword){
			$errore=true;
		}
		if(strlen($password)<8){
			$errore=true;
		}
		$passwordCriptata = password_hash($password, PASSWORD_BCRYPT);
		$query='select * from utente where username="'.$username.'";';
		$res=mysqli_query($conn, $query);
		if(mysqli_num_rows($res)===0){
			$query='insert into utente(nome, cognome, username, password) VALUES ("'.$nome.'","'.$cognome.'","'.$username.'","'.$passwordCriptata.'");';
			$res1=mysqli_query($conn, $query);
			if($res1){
				header('Location: login.php');
				exit;
			}
			else{
				$errore=true;
			}
		}else{
			$errore=true;
		}
		mysqli_free_result($res);
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
		<link rel="stylesheet" href="registrazione.css">
		<script src="menu.js" defer></script>
		<script src="registrazione.js" defer></script>
		<link rel="shortcut icon" href="immagini/shortcuticon.jpg" />
	</head>
	<body>
		<div id="pagina" class="hidden">registrazione</div>
		<header>
			<nav>
				<div class="logo">
					<a>Your Property</a>
				</div>
				<div id="links">
					<a class="link" href="index.html">Home</a>
					<a class="link" href="login.php">Login</a>
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
						echo "<h4 class='errore'>Errore in fase di esecuzione</h4>";
					}
				?>
				<h4 class='errore' id="errore"></h4>
				<main>
					<form name="form" method="post">
						<label>Nome<input id="nome" type="text" name="nome"></label>
						<label>Cognome<input id="cognome" type="text" name="cognome"></label>
						<label>Username<input id="username" type="text" name="username"></label>
						<span id="spanUsername"></span>
						<label>Password<input id="password" type="password" name="password"></label>
						<label>Conferma password<input id="confermaPassword" type="password" name="confermapassword"></label>
						<input id="invio" type="submit" name="invio" value="Registrati"><br>
					</form>
				</main>
			</div>
		</section>
	</body> 
</html>