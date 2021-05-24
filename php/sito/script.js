function onJSONAmadeusToken(json){
	if(json=="error"){
		return;
	}
	token=json.access_token;
}
function onResponseAmadeusToken(response){
	return response.json();
}

function onJsonCarica(json){
	for(let index in json){
		const div=document.createElement("div");
		div.setAttribute("data-index",json[index].nome);
		section21.appendChild(div);
		div.classList.add("flex-item");
		
		const span=document.createElement("span");
		span.classList.add('preferiti');
		const divb=document.createElement("div");
		
		div.appendChild(span);
		
		const h4=document.createElement("h4");
		const imgp=document.createElement("img");
		const img=document.createElement("img");
		const a=document.createElement("a");
		
		h4.textContent=json[index].nome;
		imgp.src="immagini/like.jpg";
		img.src=json[index].immagine;
		a.textContent="View more";
		
		div.querySelector("span").appendChild(h4);
		div.querySelector("span").appendChild(imgp);
		div.appendChild(img);
		div.appendChild(divb);
		div.appendChild(a);
		a.classList.add('button');
		
		img.addEventListener("click", apriModale);
		a.addEventListener("click", viewMore);
		imgp.addEventListener("click", addPreferiti);
	}
	checkPreferiti();
}
function responseCarica(response){
	return response.json();
}
function carica(){
	fetch("http://localhost/php/sito/carica.php?pagina="+pagina).then(responseCarica).then(onJsonCarica);
}

function onJsonCheckPreferiti(json){
	if(json=="error"){
		return;
	}
	const section=document.querySelector("#preferiti-container");
	section.innerHTML="";
	
	for(let i in json){
		const index=json[i].nome;
		const div=document.createElement("div");
		section.appendChild(div);
		div.classList.add('item-preferiti');
		div.setAttribute("data-index",index);
		const span=document.createElement("span");
		span.classList.add('preferiti-sopra');
		div.appendChild(span);
		const h5=document.createElement("h5");
		const imgs=document.createElement("img");
		const img=document.createElement("img");
		
		h5.textContent=json[i].nome;
		imgs.src="immagini/dislike.jpg";
		img.src=json[i].immagine;
		
		div.querySelector("span").appendChild(h5);
		div.querySelector("span").appendChild(imgs);
		div.appendChild(img);
		
		const section1=document.querySelector("#container-items");
		const div1=section1.querySelector("[data-index='"+index+"']");
		div1.removeEventListener("click", addPreferiti);
		imgs.addEventListener("click", removePreferiti);
	}
	
	if(token!=null){
		checkCittà();
	}
	
	const h1=document.querySelector("#preferiti");
	if(section.childNodes.length<1){
		h1.classList.add("hidden");
	}else{
		h1.classList.remove("hidden");
	}
}
function responseCheckPreferiti(response){
	return response.json();
}
function checkPreferiti(){
	fetch("http://localhost/php/sito/checkPreferiti.php?pagina="+pagina).then(responseCheckPreferiti).then(onJsonCheckPreferiti);
}

function onJSONCheckCittà(json){
	if(json=="error"){
		return;
	}
	
	const h1=document.querySelector("#case-hotel");
	const section=document.querySelector("#container-città");
	section.innerHTML="";
	città(json);
}
function onResponseCheckCittà(response){
	return response.json();
}
function checkCittà(){
	fetch("http://localhost/php/sito/checkCittà.php?pagina="+pagina).then(onResponseCheckCittà).then(onJSONCheckCittà);
}

function onJSONAmadeusData(json){	

	const section=document.querySelector("#container-città");
	const othersection=document.querySelector("#preferiti-container");
	
	const div=document.createElement("div");
	section.appendChild(div);
	div.classList.add("divItems");
	
	const h5=document.createElement("h5");
	h5.textContent="Hotel vicini alla città: "+json[0];
	div.appendChild(h5);

	let n=json[1].data.length;
	
	if(n==0){
		const h6=document.createElement("h6");
		h6.textContent="Nessun hotel vicino :(";
		div.appendChild(h6);
	}else{
		if(n>5){
			n=5;
		}
		
		for(let i=0; i<n; i++){
			const nome=json[1].data[i].hotel.name;
			const h6=document.createElement("h6");
			h6.textContent=nome;
			div.appendChild(h6);
		}
	}
	
	const h1=document.querySelector("#case-hotel");
	if(section.childNodes.length>0){
		h1.classList.remove("hidden");
	}else{
		h1.classList.add("hidden");
	}
}
function onResponseAmadeusData(response){
	return response.json();
}
function città(json){
	if(json.length==0){
		const h1=document.querySelector("#case-hotel");
		h1.classList.add("hidden");
	}
	for(let i=0; i<json.length; i++){
		const city=json[i].città;
		fetch("http://localhost/php/sito/Amadeus.php?città="+city+"&token="+token).then(onResponseAmadeusData).then(onJSONAmadeusData);
	}
}

function apriModale(event){
	const img=document.createElement("img");
	img.src=event.currentTarget.src;
	const modale=document.querySelector("#modale");
	modale.appendChild(img);
	modale.classList.remove("hidden");
	const body=document.querySelector("body");
	body.classList.add("no-scroll");
	modale.addEventListener("click", chiudiModale);
}
function chiudiModale(event){
	const modale=document.querySelector("#modale");
	modale.innerHTML="";
	modale.classList.add("hidden");
	const body=document.querySelector("body");
	body.classList.remove("no-scroll");
}

function onJsonAffitta(json){
	errore.classList.add("hidden");
	if(json==false || json=="errore"){
		const errore=document.querySelector("#errore");
		errore.textContent="Impossibile affittare l'immobile in questo periodo";
		errore.classList.remove("hidden");
	}else{
		chiudiModale();
	}
}
function responseAffitta(response){
	return response.json();
}
function affitta2(event){
	event.preventDefault();
	const div=document.querySelector("#affitto-item");
	const index=div.querySelector("h2").textContent;
	const form=document.querySelector("#form");
	const inizio_affitto=form.inizioAffitto.value;
	const fine_affitto=form.fineAffitto.value;
	fetch("http://localhost/php/sito/affitta.php?index="+index+"&inizioAffitto="+inizio_affitto+"&fineAffitto="+fine_affitto).then(responseAffitta).then(onJsonAffitta);
}

function bloccaPropagation(event){
	event.stopPropagation();
}

function affitta(event){
	const div=event.currentTarget.parentNode.parentNode;
	const index=div.getAttribute("data-index");
	const modale=document.querySelector("#modale");
	modale.classList.remove("hidden");
	const body=document.querySelector("body");
	body.classList.add("no-scroll");
	modale.addEventListener("click", chiudiModale);
	const modalDiv=document.createElement("div");
	modale.appendChild(modalDiv);
	modalDiv.setAttribute("id","affitto-item");
	
	const h2=document.createElement("h2");
	h2.textContent=index;
	
	const form=document.createElement("form");
	form.setAttribute("id", "form");
	form.setAttribute("method", "get");
	
	const errore=document.createElement("h3");
	errore.textContent="";
	errore.setAttribute("id", "errore");
	errore.classList.add("hidden");
	
	const label1=document.createElement("label");
	label1.textContent="Data inizio affitto";
	const label2=document.createElement("label");
	label2.textContent="Data fine affitto";
	
	const inizioAffitto=document.createElement("input");
	const fineAffitto=document.createElement("input");
	const invio=document.createElement("input");
	
	inizioAffitto.setAttribute("type","date");
	fineAffitto.setAttribute("type","date");
	inizioAffitto.setAttribute("name","inizioAffitto");
	fineAffitto.setAttribute("name","fineAffitto");
	invio.setAttribute("type","submit");
	invio.setAttribute("value","AFFITTA");
	
	inizioAffitto.addEventListener("click", bloccaPropagation);
	fineAffitto.addEventListener("click", bloccaPropagation);
	modalDiv.addEventListener("click", bloccaPropagation);
	
	modalDiv.appendChild(h2);
	modalDiv.appendChild(form);
	form.appendChild(errore);
	form.appendChild(label1);
	form.appendChild(label2);
	label1.appendChild(inizioAffitto);
	label2.appendChild(fineAffitto);
	form.appendChild(invio);
	invio.addEventListener("click", affitta2);
}

function onJsonViewMore(json){
	const index=json[0].nome;
	const section1=document.querySelector("#container-items");
	const div=section1.querySelector("[data-index='"+index+"']");
	const descrizione=json[0].descrizione;
	const mq=json[0].mq;
	const prezzo=json[0].prezzo;
	const città=json[0].città;
	
	const h6=document.createElement("h6");
	const p=document.createElement("p");
	const h5=document.createElement("h5");
	const h3=document.createElement("h3");
	
	div.querySelector("div").appendChild(h6);
	div.querySelector("div").appendChild(p);
	div.querySelector("div").appendChild(h5);
	div.querySelector("div").appendChild(h3);
	
	div.querySelector("h6").textContent=descrizione;
	div.querySelector("p").textContent=mq;
	div.querySelector("h5").textContent="Città: "+città;
	div.querySelector("h3").textContent="Prezzo: € "+prezzo;
	
	if(json[1]){
		const affitto=document.createElement("button");
		div.querySelector("div").appendChild(affitto);
		affitto.classList.add("affitto");
		affitto.textContent="AFFITTA";
		affitto.addEventListener("click", affitta);
	}
	
	const a=div.querySelector("a");
	a.textContent="View less";
	
	a.removeEventListener("click", viewMore);
	a.addEventListener("click", viewLess);
}
function responseViewMore(response){
	return response.json();
}
function viewMore(event){	
	const div=event.currentTarget.parentNode;
	const index=encodeURIComponent(div.dataset.index);
	fetch("http://localhost/php/sito/viewMore.php?index="+index).then(responseViewMore).then(onJsonViewMore);
}

function viewLess(event){
	const div=event.currentTarget.parentNode;
	const children=div.childNodes;
	div.querySelector("div").innerHTML="";
	const a=div.querySelector("a");
	a.textContent="View more";
	event.currentTarget.removeEventListener("click", viewLess);
	event.currentTarget.addEventListener("click", viewMore);
}

function onJSONPexels(json){	
	const section=document.querySelector("#altro-container");
	
	let n=json.total_results;
	if(n>=3){
		n=3;
	}
	
	if(section.childNodes.length>0){
		section.innerHTML="";
	}
	
	for(let i=0; i<n; i++){
		const immagine=json.photos[i].src.medium;
		const div=document.createElement("div");
		div.classList.add("item-altro");
		section.appendChild(div);
		const img=document.createElement("img");
		img.src=immagine;
		div.appendChild(img);
	}
	
	const h1=document.querySelector("#altro");
	if(section.childNodes.length>0){
		h1.classList.remove("hidden");
	}else{
		h1.classList.add("hidden");
	}
	
}
function onResponsePexels(response){
	return response.json();
}
function onJSONSearch(json){
	const section=document.querySelector(".flex-container");
	section.innerHTML="";
	
	for(let index in json){
		const div=document.createElement("div");
		div.setAttribute("data-index",json[index].nome);
		section21.appendChild(div);
		div.classList.add("flex-item");
		
		const span=document.createElement("span");
		span.classList.add('preferiti');
		const divb=document.createElement("div");
		
		div.appendChild(span);
		
		const h4=document.createElement("h4");
		const imgp=document.createElement("img");
		const img=document.createElement("img");
		const a=document.createElement("a");
		
		h4.textContent=json[index].nome;
		imgp.src="immagini/like.jpg";
		img.src=json[index].immagine;
		a.textContent="View more";
		
		div.querySelector("span").appendChild(h4);
		div.querySelector("span").appendChild(imgp);
		div.appendChild(img);
		div.appendChild(divb);
		div.appendChild(a);
		a.classList.add('button');
		
		img.addEventListener("click", apriModale);
		a.addEventListener("click", viewMore);
		imgp.addEventListener("click", addPreferiti);
	}
	
	const divs=document.querySelectorAll(".flex-item");
	const tantidiv=document.querySelectorAll(".flex-container .hidden");
	const h1=document.querySelector("#case-scritta");
	if((divs.length-tantidiv.length)<1){
		h1.classList.add("hidden");
	}else{
		h1.classList.remove("hidden");
	}
}
function onResponseSearch(response){
	return response.json();
}
function search(){
	event.preventDefault();
	const input=document.querySelector("#searchbar");
	const text=encodeURIComponent(input.value.toUpperCase());
	fetch("http://localhost/php/sito/search.php?testo="+text+"&pagina="+pagina).then(onResponseSearch).then(onJSONSearch);
	
	if(text!==""){
		const newText=encodeURIComponent(text);
		fetch("http://localhost/php/sito/pexels.php?testo="+newText).then(onResponsePexels).then(onJSONPexels);
	}else{
		const section=document.querySelector("#altro-container");
		section.innerHTML="";
		const h1=document.querySelector("#altro").classList.add("hidden");
	}
}


function onJsonRemovePreferiti(json){
	if(json=="error"){
		return;
	}
	checkPreferiti();
	const section2=document.querySelector("#container-città");
	if(section2.childNodes.length==0){
		const h1=document.querySelector("#case-hotel");
		h1.classList.add("hidden");
	}
}
function responseRemovePreferiti(response){
	return response.json();
}
function removePreferiti(event){
	const div=event.currentTarget.parentNode.parentNode;
	const index=encodeURIComponent(div.dataset.index);
	fetch("http://localhost/php/sito/removePreferiti.php?index="+index).then(responseRemovePreferiti).then(onJsonRemovePreferiti);
}

function onJsonAddPreferiti(json){
	const errore=document.querySelector("#error-preferiti");
	errore.innerHTML="";
	if(json=="error"){
		errore.textContent="Impossibile aggiungere l'elemento selezionato ai preferti!";
		errore.classList.remove("hidden");
		return;
	}
	checkPreferiti();
}
function responseAddPreferiti(response){
	return response.json();
}
function addPreferiti(){
	const div=event.currentTarget.parentNode.parentNode;
	const index=encodeURIComponent(div.dataset.index);
	fetch("http://localhost/php/sito/addPreferiti.php?index="+index).then(responseAddPreferiti).then(onJsonAddPreferiti);
}


let token=null;
fetch("http://localhost/php/sito/token.php").then(onResponseAmadeusToken).then(onJSONAmadeusToken);


const pagina=document.querySelector("#pagina").innerHTML;
const article=document.querySelector("article");

const section1=document.createElement("section");
article.appendChild(section1);
const h1sec1=document.createElement("h1");
section1.appendChild(h1sec1);
h1sec1.classList.add("hidden");
h1sec1.setAttribute("id","preferiti");
h1sec1.textContent="Preferiti";
const h3sec1=document.createElement("h3");
section1.appendChild(h3sec1);
h3sec1.classList.add("hidden");
h3sec1.setAttribute("id","error-preferiti");
const section11=document.createElement("section");
section1.appendChild(section11);
section11.setAttribute("id","preferiti-container");

const section4=document.createElement("section");
article.appendChild(section4);
const h1sec4=document.createElement("h1");
section4.appendChild(h1sec4);
h1sec4.textContent="Hotel vicini";
h1sec4.setAttribute("id","case-hotel");
h1sec4.classList.add("hidden");
const section41=document.createElement("section");
section41.setAttribute("id","container-città");
section4.appendChild(section41);

const section2=document.createElement("section");
section2.setAttribute("id","container-items");
article.appendChild(section2);
const h1sec2=document.createElement("h1");
section2.appendChild(h1sec2);
h1sec2.textContent=pagina;
h1sec2.setAttribute("id","case-scritta");
const section21=document.createElement("section");
section21.classList.add("flex-container");
section2.appendChild(section21);

const section3=document.createElement("section");
article.appendChild(section3);
const h1sec3=document.createElement("h1");
section3.appendChild(h1sec3);
h1sec3.classList.add("hidden");
h1sec3.setAttribute("id","altro");
h1sec3.textContent="Vedi altro";
const section31=document.createElement("section");
section3.appendChild(section31);
section31.setAttribute("id","altro-container");

const section5=document.createElement("section");
article.appendChild(section5);
section5.setAttribute("id","modale");
section5.classList.add("hidden");

const input=document.querySelector("#search");
input.addEventListener("submit", search);

carica();
