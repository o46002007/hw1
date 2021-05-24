function onJsonRimuoviAffitto(json){
	if(json=="error"){
		return;
	}
	carica();
}
function responseRimuoviAffitto(response){
	return response.json();
}
function rimuoviAffitto(event){
	const div=event.currentTarget.parentNode;
	const index=div.dataset.index;
	const inizio_affitto=div.querySelector(".inizio").innerHTML;
	const fine_affitto=div.querySelector(".fine").innerHTML;
	fetch("http://localhost/php/sito/removeAffitto.php?index="+index+"&inizio_affitto="+inizio_affitto+"&fine_affitto="+fine_affitto).then(responseRimuoviAffitto).then(onJsonRimuoviAffitto);
}

function onJSONCarica(json){
	if(json=="error"){
		return;
	}
	
	section11.innerHTML="";
	
	for(let i=0; i<json.length; i++){
		const div=document.createElement("div");
		div.setAttribute("data-index",json[i].nome);
		section11.appendChild(div);
		div.classList.add("item-affitti");
		
		const h4=document.createElement("h4");
		const img=document.createElement("img");
		const p1=document.createElement("p");
		const p2=document.createElement("p");
		const a=document.createElement("a");
		
		h4.textContent=json[i].nome;
		img.src=json[i].immagine;
		p1.textContent=json[i].data_inizio;
		p2.textContent=json[i].data_fine;
		a.textContent="Rimuovi affitto";
		
		p1.classList.add("inizio");
		p2.classList.add("fine");
		
		div.appendChild(h4);
		div.appendChild(img);
		div.appendChild(p1);
		div.appendChild(p2);
		div.appendChild(a);
		
		a.classList.add("button");
		a.addEventListener("click", rimuoviAffitto);
	}
	
	const divs=document.querySelectorAll(".item-affitti");
	const footer=document.querySelector("footer");
	if((divs.length)<2){
		footer.classList.add("hidden");
	}else{
		footer.classList.remove("hidden");
	}
}
function onResponseCarica(response){
	return response.json();
}
function carica(){
	fetch("http://localhost/php/sito/getAffitti.php").then(onResponseCarica).then(onJSONCarica);
}

const pagina=document.querySelector("#pagina").innerHTML;
const article=document.querySelector("article");

const section1=document.createElement("section");
article.appendChild(section1);
const h1sec1=document.createElement("h1");
section1.appendChild(h1sec1);
h1sec1.classList.add("hidden");
h1sec1.setAttribute("id","affitti");
h1sec1.textContent="Gestisci i tuoi affitti";
const section11=document.createElement("section");
section1.appendChild(section11);
section11.setAttribute("id","affitti-container");

carica();