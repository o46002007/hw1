function onJSONCaricaLink(json){
	const link=document.querySelector("#links");
	
	if(page==="HOME"){
		if(json==="ok"){
			link.appendChild(preferiti);
			link.appendChild(gestioneAffitti);
			link.appendChild(logout);
		}else{
			link.appendChild(login);
			link.appendChild(registrati);
		}
	}
	
	else if(page==="CASE"){
		link.appendChild(home);
		link.appendChild(appartamento);
		link.appendChild(cottage);
		if(json==="ok"){
			link.appendChild(preferiti);
			link.appendChild(gestioneAffitti);
			link.appendChild(logout);
		}else{
			link.appendChild(login);
			link.appendChild(registrati);
		}
	}
	
	else if(page==="APPARTAMENTI"){
		link.appendChild(home);
		link.appendChild(casa);
		link.appendChild(cottage);
		if(json==="ok"){
			link.appendChild(preferiti);
			link.appendChild(gestioneAffitti);
			link.appendChild(logout);
		}else{
			link.appendChild(login);
			link.appendChild(registrati);
		}
	}
	
	else if(page==="COTTAGES"){
		link.appendChild(home);
		link.appendChild(casa);
		link.appendChild(appartamento);
		if(json==="ok"){
			link.appendChild(preferiti);
			link.appendChild(gestioneAffitti);
			link.appendChild(logout);
		}else{
			link.appendChild(login);
			link.appendChild(registrati);
		}
	}
	
	else if(page==="PREFERITI"){
		link.appendChild(home);
		link.appendChild(casa);
		link.appendChild(appartamento);
		link.appendChild(cottage);
		link.appendChild(gestioneAffitti);
		link.appendChild(logout);
	}
	
	else if(page==="AFFITTI"){
		link.appendChild(home);
		link.appendChild(casa);
		link.appendChild(appartamento);
		link.appendChild(cottage);
		link.appendChild(preferiti);
		link.appendChild(logout);
	}
}
function onResponseCaricaLink(response){
	return response.json();
}
function caricaLink(){
	fetch("http://localhost/php/sito/menu.php").then(onResponseCaricaLink).then(onJSONCaricaLink);
}

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
		
	if(page==="HOME"){
		if(json==="ok"){
			div.appendChild(preferiti);
			div.appendChild(gestioneAffitti);
			div.appendChild(logout);
		}else{
			div.appendChild(login);
			div.appendChild(registrati);
		}
	}
	
	else if(page==="CASE"){
		div.appendChild(home);
		div.appendChild(appartamento);
		div.appendChild(cottage);
		if(json==="ok"){
			div.appendChild(preferiti);
			div.appendChild(gestioneAffitti);
			div.appendChild(logout);
		}else{
			div.appendChild(login);
			div.appendChild(registrati);
		}
	}
	
	else if(page==="APPARTAMENTI"){
		div.appendChild(home);
		div.appendChild(casa);
		div.appendChild(cottage);
		if(json==="ok"){
			div.appendChild(preferiti);
			div.appendChild(gestioneAffitti);
			div.appendChild(logout);
		}else{
			div.appendChild(login);
			div.appendChild(registrati);
		}
	}
	
	else if(page==="COTTAGES"){
		div.appendChild(home);
		div.appendChild(casa);
		div.appendChild(appartamento);
		if(json==="ok"){
			div.appendChild(preferiti);
			div.appendChild(gestioneAffitti);
			div.appendChild(logout);
		}else{
			div.appendChild(login);
			div.appendChild(registrati);
		}
	}
	
	else if(page==="PREFERITI"){
		div.appendChild(home);
		div.appendChild(casa);
		div.appendChild(appartamento);
		div.appendChild(cottage);
		div.appendChild(gestioneAffitti);
		div.appendChild(logout);
	}
	
	else if(page==="AFFITTI"){
		div.appendChild(home);
		div.appendChild(casa);
		div.appendChild(appartamento);
		div.appendChild(cottage);
		div.appendChild(preferiti);
		div.appendChild(logout);
	}
	
	const chiudi=document.createElement("a");
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

const page=document.querySelector("#pagina").innerHTML;

const menu=document.querySelector("#menu");
menu.addEventListener("click", menù);

caricaLink();

const home=document.createElement("a");
home.textContent="Home";
home.setAttribute("href","index.html");
home.classList.add("link");
const casa=document.createElement("a");
casa.textContent="Casa";
casa.setAttribute("href","casa.html");
casa.classList.add("link");
const appartamento=document.createElement("a");
appartamento.textContent="Appartamento";
appartamento.setAttribute("href","appartamento.html");
appartamento.classList.add("link");
const cottage=document.createElement("a");
cottage.textContent="Cottage";
cottage.setAttribute("href","cottage.html");
cottage.classList.add("link");
const logout=document.createElement("a");
logout.textContent="Logout";
logout.setAttribute("href","logout.php");
logout.classList.add("link");
const preferiti=document.createElement("a");
preferiti.textContent="Preferiti";
preferiti.setAttribute("href","preferiti.html");
preferiti.classList.add("link");
const gestioneAffitti=document.createElement("a");
gestioneAffitti.textContent="Affitti";
gestioneAffitti.setAttribute("href","affitti.html");
gestioneAffitti.classList.add("link");
const login=document.createElement("a");
login.textContent="Login";
login.setAttribute("href","login.php");
login.classList.add("link");
const registrati=document.createElement("a");
registrati.textContent="Registrati";
registrati.setAttribute("href","registrazione.php");
registrati.classList.add("link");