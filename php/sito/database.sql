create database agenziaImmobiliare;
use agenziaImmobiliare;

create table utente(
	id integer(10) not null auto_increment primary key,
	nome varchar(50) not null,
	cognome varchar(50) not null,
	username varchar(50) not null,
	password varchar(100) not null
)engine='innoDB';
create table immobile(
	id integer(10) not null auto_increment primary key,
	nome varchar(40) not null,
	tipo varchar(50) not null,
	immagine varchar(100) not null,
	descrizione varchar(100) not null,
	mq varchar(10) not null,
	prezzo varchar(22) not null,
	città varchar(10) not null
)engine='innoDB';
create table preferiti(
	id integer(10) not null auto_increment primary key,
	id_utente integer(10) not null,
	id_immobile integer(10) not null,
	FOREIGN KEY(id_utente)REFERENCES utente(id),
	FOREIGN KEY(id_immobile)REFERENCES immobile(id)
)engine='innoDB';
create table cookie(
    id integer(10) not null auto_increment primary key,
    hash varchar(100) not null,
    id_utente integer(10) not null,
    tempo bigint(20) not null,
    FOREIGN KEY(id_utente)REFERENCES utente(id)
)engine='innoDB';
create table affitto(
    id integer(10) not null auto_increment primary key,
    id_utente integer(10) not null,
    id_immobile integer(10) not null,
    data_inizio date not null,
    data_fine date not null,
    FOREIGN KEY(id_utente)REFERENCES utente(id),
    FOREIGN KEY(id_immobile)REFERENCES immobile(id)
)engine='innoDB';

INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Casa estiva","case","immagini/casa/casa1.jpg","Una splendida casa in legno circondata da un bel giardino giardino","400 mq","200.000","ASP");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Casa in foresta","case","immagini/casa/casa2.jpg","Una casa sdirubbata in legno in mezzo a una foresta tenebrosa","400 mq","10.000","BDL");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Casa in paese","case","immagini/casa/casa3.jpg","Una splendida casa smart con garage con un giardino davanti","400 mq","130.000","BEH");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Casa autunnale","case","immagini/casa/casa4.jpg","Una casa in legno con un albero alla cazzum alla destra e circondata da piantine di marijuana","400 mq","250.000","BEL");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Casa geometrica","case","immagini/casa/casa5.jpg","Una casa geometrica 97% cemento e 3% vetro","400 mq","20.000","BGO");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Casa sul fiume","case","immagini/casa/casa6.jpg","Una casa/cottage con vista fiume che con la luna piena sommergerà tutto","400 mq","0","BHM");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Casetta nel vallone","case","immagini/casa/casa7.jpg","Una casetta tra le montagne della svizzera","400 mq","100.000","BKL");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Casa isolata da tutto e tutti","case","immagini/casa/casa8.jpg","Una casa lontano da tutto e da tutti","400 mq","130.000","BMI");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Casa in campagna","case","immagini/casa/casa9.jpg","Una casa in campagna per ottime scampagnate","400 mq","assai","BRE");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Casa sul lago","case","immagini/casa/casa10.jpg","Ottima casetta in riva al lago","400 mq","30.000","BWN");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Palafitta sul mare","case","immagini/casa/casa11.jpg","Una bellissima casa al mare, ottima per la pesca","400 mq","10.000","CCS");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Casa ammucciata","case","immagini/casa/casa12.jpg","Una casa ammucciata da tutta l'erba che la ricopre. Ottima per nascondersi dai nazisti","400 mq","100.000","COO");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Appartamento decorato","appartamenti","immagini/appartamento/appartamento1.jpg","Bellissimo appartamento artistico","400 mq","100.000","FNT");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Appartamento bianco","appartamenti","immagini/appartamento/appartamento2.jpg","Appartamento con colori chiari","200 mq","200.000","DEN");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Appartamento con parquet","appartamenti","immagini/appartamento/appartamento3.jpg","Non so che descrizione mettere","300 mq","300.000","DXB");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Appartamento con divano","appartamenti","immagini/appartamento/appartamento4.jpg","Appartamento con divano-letto e tv","400 mq","100.000","PER");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Appartamento in legno","appartamenti","immagini/appartamento/appartamento5.jpg","Appartamento monovano","50 mq","200.000","BOG");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Appartamento e mansarda","appartamenti","immagini/appartamento/appartamento6.jpg","Appartamento senza vicini di sopra perchè sopra ci sta la mansarda","300 mq","800.000","GUA");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Cottage imbluito","cottages","immagini/cottage/cottage1.jpg","Il cottage dei tuoi sogni","300 mq","400.000","GUA");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Cottage con garage","cottages","immagini/cottage/cottage2.jpg","Un ottimo cottage con il garage!","300 mq","400.000","FNT");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Cottage sul prato","cottages","immagini/cottage/cottage3.jpg","Un bel cottage con giardino per giocare a golf","400 mq","400.000","CAI");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Cottage imbluito pure lui","cottages","immagini/cottage/cottage4.jpg","Cottage gemello al cottage blu","400 mq","400.000","BOG");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Cottage sul lago","cottages","immagini/cottage/cottage5.jpg","Il più bel cottage che potresti comprare","100 mq","800.000","BRN");
INSERT INTO immobile(nome, tipo, immagine, descrizione, mq, prezzo, città) VALUES ("Cottage Smolville","cottages","immagini/cottage/cottage6.jpg","La casa di Clark Kent","100 mq","1.000.000","BOO");

delimiter //
create trigger gestione_affitto
before insert on affitto
for each row
begin
if exists(
select data_inizio, data_fine
from affitto
where affitto.id_immobile=new.id_immobile
and new.data_inizio is not null and new.data_fine is not null
and (
date(new.data_inizio) between affitto.data_inizio AND affitto.data_fine
or 
date(new.data_fine) between affitto.data_inizio AND affitto.data_fine
or (	
new.data_inizio<=affitto.data_inizio
and
new.data_fine>=affitto.data_fine
)
)
)then
signal sqlstate '45000'
set message_text="L'immobile è già affittato! (gestione_affitto)";
end if;
end //
delimiter ;

delimiter //
create trigger gestione_affitto1
before insert on affitto
for each row
begin
if(
new.data_inizio="0000-00-00" || new.data_fine="0000-00-00" || new.data_inizio>new.data_fine
)then
signal sqlstate '45000'
set message_text="Errore (gestione_affitto1)";
end if;
end //
delimiter ;