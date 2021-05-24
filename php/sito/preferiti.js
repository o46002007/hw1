function onJSONCarica(json){
	if(json=="error"){
		return;
	}
	
	section11.innerHTML="";
	
	for(let index in json){
		const div=document.createElement("div");
		div.setAttribute("data-index",json[index].nome);
		section11.appendChild(div);
		div.classList.add("item-preferiti");
		
		const span=document.createElement("span");
		span.classList.add('dislike');
		const divb=document.createElement("div");
		
		div.appendChild(span);
		
		const h4=document.createElement("h4");
		const imgd=document.createElement("img");
		const img=document.createElement("img");
		const a=document.createElement("a");
		
		h4.textContent=json[index].nome;
		imgd.src="immagini/dislike.jpg";
		img.src=json[index].immagine;
		a.textContent="View more";
		
		span.appendChild(h4);
		span.appendChild(imgd);
		div.appendChild(img);
		div.appendChild(divb);
		div.appendChild(a);
		a.classList.add('button');
		
		a.addEventListener("click", viewMore);
		imgd.addEventListener("click", removePreferiti);
	}
	
	const divs=document.querySelectorAll(".item-preferiti");
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
	fetch("http://localhost/php/sito/getPreferiti.php").then(onResponseCarica).then(onJSONCarica);
}

function onJsonViewMore(json){
	const index=json[0].nome;
	const div=section11.querySelector("[data-index='"+index+"']");
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
	const index=div.dataset.index;
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

function onJsonRemovePreferiti(json){
	if(json=="error"){
		return;
	}
	carica();
}
function responseRemovePreferiti(response){
	return response.json();
}
function removePreferiti(event){
	const div=event.currentTarget.parentNode.parentNode;
	const index=div.dataset.index;
	fetch("http://localhost/php/sito/removePreferiti.php?index="+index).then(responseRemovePreferiti).then(onJsonRemovePreferiti);
}

const pagina=document.querySelector("#pagina").innerHTML;
const article=document.querySelector("article");

const section1=document.createElement("section");
article.appendChild(section1);
const h1sec1=document.createElement("h1");
section1.appendChild(h1sec1);
h1sec1.classList.add("hidden");
h1sec1.setAttribute("id","preferiti");
h1sec1.textContent="Preferiti";
const section11=document.createElement("section");
section1.appendChild(section11);
section11.setAttribute("id","preferiti-container");

carica();