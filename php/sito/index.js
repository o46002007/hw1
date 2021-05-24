function chiudiMenu(){
	const div=document.querySelector("#open-menu");
	div.remove();
	const div3=document.querySelector("#menu");
	div3.classList.remove("hidden");
	menu.addEventListener("click", menù);
}

function onJSONMenu(json){
	const div3=document.querySelector("#menu");
	div3.classList.add("hidden");
	
	const div=document.createElement("div");
	div.setAttribute("id","open-menu");
	const header=document.querySelector("header");
	header.appendChild(div);
	
	const home=document.createElement("a");
	const chiudi=document.createElement("a");
	home.textContent="Home";
	home.setAttribute("href","index.php");
	home.classList.add("link");
	div.appendChild(home);
	
	if(json==="ok"){
		const logout=document.createElement("a");
		const preferiti=document.createElement("a");
		logout.textContent="Logout";
		preferiti.textContent="Preferiti";
		logout.setAttribute("href","logout.php");
		preferiti.setAttribute("href","preferiti.php");
		logout.classList.add("link");
		preferiti.classList.add("link");
		div.appendChild(logout);
		div.appendChild(preferiti);
	}else{
		const login=document.createElement("a");
		const registrati=document.createElement("a");
		login.textContent="Login";
		registrati.textContent="Registrati";
		login.setAttribute("href","login.php");
		registrati.setAttribute("href","registrazione.php");
		login.classList.add("link");
		registrati.classList.add("link");
		div.appendChild(login);
		div.appendChild(registrati);
	}
	chiudi.textContent="Chiudi";
	chiudi.addEventListener("click", chiudiMenu);
	div.appendChild(chiudi);
}
function onResponseMenu(response){
	return response.json();
}
function menù(){
	fetch("http://localhost/php/sito/menu.php").then(onResponseMenu).then(onJSONMenu);
}

const menu=document.querySelector("#menu");
menu.addEventListener("click", menù);