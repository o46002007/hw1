function onJSONCheckUsername(json){
	const span=document.querySelector("#spanUsername");
	span.textContent="";
	if(json==="ok"){
		interruttore=true;
	}else{
		interruttore=false;
		span.textContent="Email già esistente";
	}
}
function onResponseCheckUsername(response){
	return response.json();
}
function checkUsername(event){
	myusername=event.currentTarget.value;
	fetch("http://localhost/php/sito/checkUsername.php?username="+myusername).then(onResponseCheckUsername).then(onJSONCheckUsername);
}


function validazione(event){
	const errore=document.querySelector("#errore");
	errore.textContent="";
	const nome=event.currentTarget.nome.value;
	const cognome=event.currentTarget.cognome.value;
	const username=event.currentTarget.username.value;
	const password=event.currentTarget.password.value;
	const confermapassword=event.currentTarget.confermapassword.value;
	
	if(nome.length==0 || cognome.length==0 || username.length==0 || password.length==0 || confermapassword.length==0){
		event.preventDefault();
		document.querySelector("#errore").textContent="Compilare tutti i campi";
	}else{
		let sim=0;
		let num=0;
		let mai=0;
		let min=0;
		
		if(password.length<8){
			event.preventDefault();
			errore.textContent="Password breve";
			return;
		}
		
		if(password!==confermapassword){
			event.preventDefault();
			errore.textContent="Le due password non coincidono";
			return;
		}
		
		for(let i=0; i<password.length; i++){
			const ascii=password.charCodeAt(i);
			if((ascii>=33 && ascii<=47)||(ascii>=58 && ascii<=64)||(ascii>=91 && ascii<=96)){
				sim++;
			}else if(ascii>=48 && ascii<=57){
				num++;
			}else if(ascii>=65 && ascii<=90){
				mai++;
			}else if(ascii>=97 && ascii<=122){
				min++;
			}
		}
		
		if(sim==0){
			event.preventDefault();
			errore.textContent="Non hai inserito simboli nella password";
		}else if(num==0){
			event.preventDefault();
			errore.textContent="Non hai inserito numeri nella password";
		}else if(mai==0){
			event.preventDefault();
			errore.textContent="Non hai inserito maiuscole nella password";
		}else if(min==0){
			event.preventDefault();
			errore.textContent="Non hai inserito minuscole nella password";
		}
		
	}
	if(interruttore===false){
		event.preventDefault();
	}
}

let interruttore=false;
const form=document.forms["form"];
form.addEventListener("submit", validazione);

const usernameblur=document.querySelector("#username");
usernameblur.addEventListener("blur", checkUsername);