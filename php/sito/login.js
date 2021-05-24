function validazione(event){
	document.querySelector("#errore").textContent="";
	const username=event.currentTarget.username.value;
	const password=event.currentTarget.password.value;
	if(username.length==0 || password.length==0 ){
		event.preventDefault();
		document.querySelector("#errore").textContent="Compilare tutti i campi";
	}
}

const form=document.forms["form"];
form.addEventListener("submit", validazione);