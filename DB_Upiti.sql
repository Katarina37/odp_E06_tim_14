CREATE DATABASE IF NOT EXISTS default_db;

USE default_db;

CREATE TABLE IF NOT EXISTS users (
	user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(65) UNIQUE NOT NULL,
    uloga VARCHAR(15) NOT NULL,
    lozinka VARCHAR(300) NOT NULL
);

CREATE TABLE IF NOT EXISTS content (
	content_id INT PRIMARY KEY AUTO_INCREMENT,
    naziv VARCHAR(250) NOT NULL,
    tip VARCHAR(15) NOT NULL,
    opis TEXT,
    datum_izlaska DATE,
    cover_slika VARCHAR(300),
    zanr VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS epizode (
	episode_id INT PRIMARY KEY AUTO_INCREMENT,
    content_id INT NOT NULL,
    sezona INT NOT NULL,
    broj_epizode INT NOT NULL,
    naziv_epizode VARCHAR(250) NOT NULL,
    opis_epizode TEXT,
    cover_slika VARCHAR(300),
    FOREIGN KEY (content_id) REFERENCES content(content_id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ocjena (
	rating_id INT PRIMARY KEY AUTO_INCREMENT,
    content_id INT NOT NULL,
    user_id INT NOT NULL,
    ocjena INT NOT NULL,
    UNIQUE (content_id, user_id),
    FOREIGN KEY (content_id) REFERENCES content(content_id)
      ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
      ON DELETE CASCADE,
	CHECK (ocjena BETWEEN 1 AND 10)
);

CREATE TABLE IF NOT EXISTS trivia (
	trivia_id INT PRIMARY KEY AUTO_INCREMENT,
    content_id INT NOT NULL,
    opis TEXT NOT NULL,
    FOREIGN KEY (content_id) REFERENCES content(content_id)
      ON DELETE CASCADE
);

INSERT INTO USERS (username, uloga, lozinka) VALUES
('tamara', 'administrator', 'odp123'),
('katarina', 'administrator', 'odp456'),
('danijel', 'korisnik', 'sifra123');

INSERT INTO content (naziv, tip, opis, datum_izlaska, cover_slika, zanr) VALUES
('Inception', 'film', 'Pljackas Dom Kob ulazi u snove drugih ljudi kako bi prikupio informacije koje su inace nedostupne.Prilika za iskupljenje i povratak starom zivotu javlja se kada Kob i njegov tim specijalista biva uposlen da usadi odredjenu ideju u podsvijest njihove mete.', '2010-07-16', 'Images/filmovi/Inception.jpg', 'Akcija'),
('Titanic', 'film', 'Radnja filma pocinje 1996. godine kada lovac na blago, Brock Lovett, zajedno sa svojim timom zaranja u Atlanski okean prema olupini Titanica u potrazi za ogrlicom "Srce okeana". Nakon sto nadju crtez mlade djevojke koja nosi ogrlicu i isti objave u medijima, ubrzo se javlja stara gospodja koja tvrdi da je djevojka sa crteza. Stara Rose vraca gledaoce u 1912. u luku Southampton odakle Titanic krece na svoje prvo putovanje.', '1997-12-19', 'Images/filmovi/Titanic.jpg', 'Drama'),
('Interstellar', 'film', 'U bliskoj buducnosti Zemlja vise ne moze zadovoljiti potrebe covjecanstva jer je doslo do unistenja ravnoteze u prirodi. NASA-ini naucnici vjeruju da vanzemaljska bica pokusavaju komunicirati sa njima i da su stvorili crvotocinu kraj Saturna kako bi je ljudi koristili. Cooper, bivsi NASA-in pilot pristaje biti pilot Endurancea i ici putem misije Lazarus.', '2014-11-07', 'Images/filmovi/Interstellar.jpg', 'Naucna fantastika'),
('Zodiac', 'film', 'Zodiac govori o lovu na zloglasnog serijskog ubicu poznatog kao "Zodiac" koji je ubijao tokom 60-ih na podrucju San Franciska, ostavivsi nekoliko zrtava na zivotu i ostavljajuci izazove policiji u obliku pisama i sifri dostavljenih novinama.', '2007-03-02', 'Images/filmovi/Zodiac.jpg', 'Triler'),
('Friends', 'serija', 'Serija prati zivot grupe prijatelja iz Njujorka. Kroz humoristicne momente prikazuju se svakodnevne situacije Monice, Rossa, Chandlera, Phoebe, Rachel i Joey', '1994-09-22', 'Images/serije/Friends.jpg', 'Komedija'),
('Breaking Bad', 'serija', 'Profesoru hemije, Walteru Whiteu, je dijagnostifikovan uznapredovani rak pluca. Walter stupi u kontakt sa bivsim ucenikom Jessejem te razradi plan u kom njih dvojica postaju partneri u proizovdnji i distribuciji metamfetamina.', '2008-01-20', 'Images/serije/BreakingBad.jpg', 'Drama, Krimi'),
('Suits', 'serija', 'serija prati Mike Ross-a, studenta prava sa fotografskim pamcenjem koji se ispisao sa fakulteta, koji radi za uspjesnog i harizmaticnog Harvey Specter-a. Fokus je na njihovom radu i zatvaranju slucajeva ali i na skrivanju Mike-ove tajne od ostalih.', '2011-06-23', 'Images/serije/Suits.jpg', 'Komedija, Drama'),
('Game of Thrones', 'serija', 'Radnjom smjestena na izmisljenje kontinente Westerosa i Essosa, Game of Thrones prati nekoliko zapleta. Fokusira se na zeljezno prijestolje 7 kraljevstva Westerosa i prati isprepletenu mrezu saveznistava i suparnistava plemenitih porodica koje se bore kako bi zauzele prijestolje.', '2011-04-17', 'Images/serije/GoT.jpg', 'Fantazija, Drama');

INSERT INTO epizode(content_id, sezona, broj_epizode, naziv_epizode, opis_epizode, cover_slika) VALUES
(5, 1, 1, 'The One Where Monica Gets a Roomate', 'Pilot epizoda serije Friends', 'Images/serije/FriendsE1.jpg'),
(5, 1, 2, 'The One with the Sonogram at the End', 'Ross saznaje da je njegova bivsa zena trudna. Rachel vraca prsten Barry-ju. Monika je pod stresom kad njeni roditelji dodju u posjetu', 'Images/serije/FriendsE2.jpg'),
(5, 1, 3, 'The One with the Thumb', 'Monika se bori sa raskidom sa deckom kojeg svi vole, Chandler ponovo pocinje pusiti a Pheobe dobija veliku, svotu novca', 'Images/serije/FriendsE3.jpg');

INSERT INTO epizode(content_id, sezona, broj_epizode, naziv_epizode, opis_epizode, cover_slika) VALUES
(6, 1, 1, 'Pilot', 'Walter saznaje da ima rak i odlucuje da proizvodi metamfetamin kako bi obezbijedio zenu i sina', 'Images/serije/BreakingBadE1.jpg'),
(6, 1, 2, 'Cat\'s in the Bag...', 'Walter i Jesse pokusavaju da sakriju tijelo i drogu', 'Images/serije/BreakingBadE2.jpg'),
(6, 1, 3, '...And the Bag\'s in the River', 'Walter se suocava sa moralnom dilemom i likvidira prve neprijatelje', 'Images/serije/BreakingBadE3.jpg');

INSERT INTO epizode(content_id, sezona, broj_epizode, naziv_epizode, opis_epizode, cover_slika) VALUES
(7, 1, 1, 'Pilot', 'Mike Ross pocinje da radi kao advokat u firmi Harvey Specter-a', 'Images/serije/SuitsE1.jpg'),
(7, 1, 2, 'Errors and Omissions', 'Mike and Harvey se suocavaju sa komplikovanim slucajem', 'Images/serije/SuitsE2.jpg'),
(7, 1, 3, 'Inside Track', 'Rivalstvo i poslovni izazovi', 'Images/serije/SuitsE3.jpg');

INSERT INTO epizode(content_id, sezona, broj_epizode, naziv_epizode, opis_epizode, cover_slika) VALUES
(8, 1, 1, 'Winter Is Coming', 'Upoznajemo porodicu Stark i politicke intrige Westerosa', 'Images/serije/GoTE1.jpg'),
(8, 1, 2, 'The Kingsroad', 'Porodice putuju kroz Kraljev put, prve tenzije se pojavljuju', 'Images/serije/GoTE2.jpg'),
(8, 1, 3, 'Lord Snow', 'Jon Snow zapocinje svoj zivot na Zidu', 'Images/serije/GoTE3.jpg');



INSERT INTO ocjena (content_id, user_id, ocjena) VALUES
(1, 1, 10),
(1, 2, 9),
(1, 3, 8);

INSERT INTO ocjena (content_id, user_id, ocjena) VALUES
(2, 1, 10),
(2, 2, 9),
(2, 3, 8);

INSERT INTO ocjena (content_id, user_id, ocjena) VALUES
(3, 1, 10),
(3, 2, 9),
(3, 3, 8);

INSERT INTO ocjena (content_id, user_id, ocjena) VALUES
(4, 1, 10),
(4, 2, 9),
(4, 3, 8);

INSERT INTO ocjena (content_id, user_id, ocjena) VALUES
(5, 1, 10),
(5, 2, 9),
(5, 3, 8);

INSERT INTO ocjena (content_id, user_id, ocjena) VALUES
(6, 1, 10),
(6, 2, 9),
(6, 3, 8);

INSERT INTO ocjena (content_id, user_id, ocjena) VALUES
(7, 1, 10),
(7, 2, 9),
(7, 3, 8);

INSERT INTO ocjena (content_id, user_id, ocjena) VALUES
(8, 1, 10),
(8, 2, 9),
(8, 3, 8);

INSERT INTO trivia (content_id, opis) VALUES
(1, 'Inception je sniman u sest razlicitih gradova sirom svijeta.'),
(1, 'Leonardo DiCaprio je odbio scene bez kaskadera.'),
(2, 'Titanik je osvojio 11 oskara.'),
(3, 'Zbog filma su konsultovani naucnici za crne rupe i relativnost.'),
(4, 'Kostimi zrtava su rekreirani iz forenzickih dokaza koji su posudjeni produkciji.'),
(5, 'Courtney Cox je prvobitno odbila ulogu Monice.'),
(6, 'Serija je prvobitno planirana za samo 2 sezone.'),
(6, 'Naziv serije dolazi od hemijskog izraza BrBa'),
(7, 'Serija se snima u Torontu, iako se radnja desava u Njujorku.'),
(7, 'Harvey Specter je inspirisan stvarnim advokatom.'),
(8, 'Prva epizoda je snimljena u Sjevernoj Irskoj i Maroku.'),
(8, 'Poznata scena sa zmajem je kreirana koriscenjem CGI efekata.');

INSERT INTO epizode(content_id, sezona, broj_epizode, naziv_epizode, opis_epizode, cover_slika) VALUES
(5, 1, 4, 'The One with George Stephanopoulos', 'Joey i Chandler vode Ross-a na hokejasku utakmicu, kako bi ga oraspolozili. S druge stranne, djevojke postanu depresivne kada shvate da nemaju plan', 'Images/serije/FriendsE4.jpg'),
(5, 1, 5, 'The One with the East German Laundry Detergent', 'Kako bi proveo vise vremena sa Rachel, Ross se pretvara kako je njegova perionica vesa puna pacova kako bi mogao da se pridruzi njoj. U medjuvremenu, Monika pozira kao djevojka za Joey-a i Chandler pokusava da raskine sa djevojkom', 'Images/serije/FriendsE5.jpg'),
(5, 1, 6, 'The One with  the Butt', 'Monikina opsesivnost izlazi na vidjelo kada Rachel ocisti stan, Joey dobija ulogu kao dabler za Al Pacinovu zadnjicu. Chandler zapocinje vezu bez obaveza', 'Images/serije/FriendsE6.jpg'), 
(5, 1, 7, 'The One with the Blackout', 'Dok je cijeli Njujork bez struje, Ross pokusava da kaze Rachel da je zaljubljen u nju, a Chandler ostaje zaglavljen u banci sa modelom', 'Images/serije/FriendsE7.jpg'),
(5, 1, 8, 'The One Where Nana Dies Twice', 'Monica i Ross su u zalosti za bakom. Chandler je sokiran jer je saznao da ljudi misle da je gej', 'Images/serije/FriendsE8.jpg');


INSERT INTO epizode(content_id, sezona, broj_epizode, naziv_epizode, opis_epizode, cover_slika) VALUES
(5, 2, 1, 'The One with Ross\'s New Girlfriend', 'Rachel na aerodromu ceka Ross-a ne znajuci za njegovu novu djevojku. U medjuvremenu, Chandler ima zastrasujuce iskustvo sa Joey-evim krojacem, a Phoebe lose osisa Moniku', 'Images/serije/FriendsS2E1.jpg'),
(5, 2, 2, 'The One with the Breast Milk', 'Monika ide u soping sa Julie i pokusava to sakriti od Rachel. Ross je zgrozen zbog Carolinog mlijeka. Joey se muci sa kolonjskom vodom', 'Images/serije/FriendsS2E2.jpg'),
(5, 2, 3, 'The One Where Heckles Dies', 'Gospoding Heckles umire i sve svoje stvari ostavi Moniki i Rachel. Chandler se boji da ce umrijeti sam kao i on. U medjuvremenu, Rachel i Monika se svadjaju oko lampe, a Phoebe i Ross oko evolucije', 'Images/serije/FriendsS2E3.jpg'),
(5, 2, 4, 'The One with Phoebe\'s Husband', 'Kada ekipa sazna da je Phoebe udata za kanadskog plesaca na ledu zbog zelene karte, mnoge tajne izlaze na vidjelo. U medjuvremenu, Rachel daje Ross-u los savjet za vezu', 'Images/serije/FriendsS2E4.jpg'),
(5, 2, 5, 'The One with Five Steaks and an Eggplant', 'Ekipa se podijeli oko tekuceg problema: Monica, Chandler i Ross zaradjuju vise novca nego ostatak ekipe. Chandler iskoristava slucaj zamijenjenog identiteta u svoju korist', 'Images/serije/FriendsS2E5.jpg'),
(5, 2, 6, 'The One with the Baby on the Bus', 'Joey i Chandler cuvaju Ben-a, dok Monica vodi Ross-a u bolnicu. U medjuvremenu, Phoebe gubi svoju svirku u Central Perk-u zbog profesionalnog pjevaca', 'Images/serije/FriendsS2E6.jpg');

INSERT INTO epizode(content_id, sezona, broj_epizode, naziv_epizode, opis_epizode, cover_slika) VALUES
(6, 1, 4, 'Cancer Man', 'Walt-ova dijagnoza je potresla njegovu porodicu dok sjecanja otkrivaju koliko je Gray Matter imao znacaja za njegovu karijeru. Ogorcenost ga gura jos dalje u kriminal dok Hank-ove DEA price fasciniraju Walt Juniora', 'Images/serije/BBE4.jpg'),
(6, 1, 5, 'Gray Matter', 'Bivsi partneri Elliott i Gretchen se nude da plate lijecenje, ali Walt zbog ponosa odbija. Zbog skripe sa novcem, ponovo pokrece poduhvat sa metom dok Skyler kopa po Jess-ijevoj proslosti', 'Images/serije/BBE5.jpg'),
(6, 1, 6, 'Crazy Handful of Nothing', 'Obrijan i ponovo rodjen kao Heisenberg, Walt unistavaa Tuck-ovo skloniste eksplozivnim zivinim fulminatom, zamjenjujuci hemiju zastrasivanjem. Nasilna isplata finansira hemioterapiju, ali privlaci Hank-ovu paznju', 'Images/serije/BBE6.jpg'),
(6, 2, 1, 'Seven Thirty-Seven', 'Walt-ov i Jess-jjev posljedni dogovor u pustinji je zavrsio nasiljem, natjeravsi Walt-a da preracuna koliko mu je novca potrebmo i gura par u sve vece prijetnje kod kuce i u njohovom krhkom partnerstvu', 'Images/serije/BBS2E1.jpg'),
(6, 2, 2, 'Grilled', 'Nakon sto ih Tuco napusti, Walt i Jesse se bore za opstanak u izolovanom sklonistu dok se njihove porodice i Hank trude da ih nadju', 'Images/serije/BBS2E2.jpg'),
(6, 2, 3, 'Bit by a Dead Bee', 'Walt i Jesse rade kako bi se vratili u normalu poslije opasnosti koju su prezivjeli, dogovarajuci se oko alibija dok Hank-ova istraga napreduje i sumnja u porodici raste', 'Images/serije/BBS2E3.jpg'),
(6, 2, 4, 'Down', 'Walt zonglira zivot kod kuce i opasnu tajnu kako Skyler podvlaci, Jesse ostaje bez stopala i partnerstvo je na testu', 'Images/serije/BBS2E4.jpg'),
(6, 2, 5, 'Breakage', 'Kako se njihova operacija siri, Walt i Jesse se suocavaju sa cijenom prekida kada zaliha nestane. Hank se bori sa posljedicama prethodnog slucaja dok Skyler-ino povjerenje u Walt-a nastavlja da popusta', 'Images/serije/BBS2E5.jpg'),
(6, 2, 6, 'Peekaboo', 'Jesse nalazi par koji je pokrao jednog od njegovih dilera i nalazi zapostavljeno dijete u haoticnom domu, dok Walt pokusava da odrzi dupli zivot netaknutim', 'Images/serije/BBS2E6.jpg');

INSERT INTO epizode(content_id, sezona, broj_epizode, naziv_epizode, opis_epizode, cover_slika) VALUES 
(7, 1, 4, 'Dirty Little Secrets', 'Dok Harvey brani nekoga iz Jessicine proslosti, Mike dobija svoj prvi solo slucaj u kom je njegova tajna zamalo otkrivena', 'Images/serije/SuitsE4.jpg'),
(7, 1, 5, 'Bail Out', 'Harvey, svjedok za civilnu tuzbu svog vozaca, mora da se osloni na Luis-ovu pomoc. Mike izbavlja starog prijatelja iz zatvora', 'Images/serije/SuitsE5.jpg'),
(7, 1, 6, 'Tricks of the Trade', 'Harvey i Mike pokusavaju da je zena optuzena sa odavanje informacija nevina. Mike takodje pomaze Rachel da uci za prijemni ali saznaje da je ona blizu toga da otkrije njegovu tajnu', 'Images/serije/SuitsE6.jpg'),
(7, 2, 1, 'She knows', 'Harvey povjerava Mike-u zavrsavanje velike tuzbe dok on mora da donese odluku o cuvanju Mike-ove tajne', 'Images/serije/SuitsS2E1.jpg'),
(7, 2, 2, 'The Choice', 'Hardman se vraca i pitanje je vremena kad ce joj uzeti kontrolu, Jessica odlucuje da se uvjeri da ima punu podrsku i salje Harvey-a da to i osigura', 'Images/serije/SuitsS2E2.jpg'),
(7, 2, 3, 'Meet the New Boss', 'Hardman pokusava da se umiljava tako sto trazi od Jessic-e slucaj u kom pokusavaju da sprijece strajk sestara ali ona slaze da je to vec dala Harvey-u. Hardman pokusava da dobije informacije preko Mike-a ', 'Images/serije/SuitsS2E3.jpg'),
(7, 2, 4, 'Discovery', 'Harvey-eva karijera je na ivici sa tuzbom za prevaru, odlucuje da da Mike-a Luis-u', 'Images/serije/SuitsS2E4.jpg'),
(7, 2, 5, 'BreakPoint', 'Harvey se ljudi kada ga Jessica stavi na drugo mjesto u tuzbi koja je kljucna za buducnost firme', 'Images/serije/SuitsS2E5.jpg'),
(7, 2, 6, 'All In', 'Harvey mora da se izbori sa kockarom koji je upravo izgubio firmu. Luis i Rachel rjesavaju problem baletske kompanije a Jessica zeli osvetu za salu iz proslosti', 'Images/serije/SuitsS2E6.jpg');

