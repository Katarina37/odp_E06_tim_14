CREATE DATABASE IF NOT EXISTS default_db;

USE default_db;

CREATE TABLE IF NOT EXISTS users (
	user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(65) UNIQUE NOT NULL,
    uloga VARCHAR(15) NOT NULL,
    lozinka VARCHAR(300) NOT NULL
);

INSERT INTO USERS (username, uloga, lozinka) VALUES
('tamara', 'administrator', 'odp123'),
('katarina', 'administrator', 'odp456'),
('danijel', 'korisnik', 'sifra123');


CREATE TABLE IF NOT EXISTS content (
	content_id INT PRIMARY KEY AUTO_INCREMENT,
    naziv VARCHAR(250) NOT NULL,
    tip VARCHAR(15) NOT NULL,
    opis TEXT,
    datum_izlaska DATE,
    cover_slika VARCHAR(300),
    zanr VARCHAR(100)
);

INSERT INTO content (naziv, tip, opis, datum_izlaska, cover_slika, zanr) VALUES
('Inception', 'film', 'Pljackas Dom Kob ulazi u snove drugih ljudi kako bi prikupio informacije koje su inace nedostupne.Prilika za iskupljenje i povratak starom zivotu javlja se kada Kob i njegov tim specijalista biva uposlen da usadi odredjenu ideju u podsvijest njihove mete.', '2010-07-16', 'Images/filmovi/Inception.jpg', 'Akcija'),
('Titanic', 'film', 'Radnja filma pocinje 1996. godine kada lovac na blago, Brock Lovett, zajedno sa svojim timom zaranja u Atlanski okean prema olupini Titanica u potrazi za ogrlicom "Srce okeana". Nakon sto nadju crtez mlade djevojke koja nosi ogrlicu i isti objave u medijima, ubrzo se javlja stara gospodja koja tvrdi da je djevojka sa crteza. Stara Rose vraca gledaoce u 1912. u luku Southampton odakle Titanic krece na svoje prvo putovanje.', '1997-12-19', 'Images/filmovi/Titanic.jpg', 'Drama'),
('Interstellar', 'film', 'U bliskoj buducnosti Zemlja vise ne moze zadovoljiti potrebe covjecanstva jer je doslo do unistenja ravnoteze u prirodi. NASA-ini naucnici vjeruju da vanzemaljska bica pokusavaju komunicirati sa njima i da su stvorili crvotocinu kraj Saturna kako bi je ljudi koristili. Cooper, bivsi NASA-in pilot pristaje biti pilot Endurancea i ici putem misije Lazarus.', '2014-11-07', 'Images/filmovi/Interstellar.jpg', 'Naucna fantastika'),
('Zodiac', 'film', 'Zodiac govori o lovu na zloglasnog serijskog ubicu poznatog kao "Zodiac" koji je ubijao tokom 60-ih na podrucju San Franciska, ostavivsi nekoliko zrtava na zivotu i ostavljajuci izazove policiji u obliku pisama i sifri dostavljenih novinama.', '2007-03-02', 'Images/filmovi/Zodiac.jpg', 'Triler'),
('Friends', 'serija', 'Serija prati zivot grupe prijatelja iz Njujorka. Kroz humoristicne momente prikazuju se svakodnevne situacije Monice, Rossa, Chandlera, Phoebe, Rachel i Joey', '1994-09-22', 'Images/serije/Friends.jpg', 'Komedija'),
('Breaking Bad', 'serija', 'Profesoru hemije, Walteru Whiteu, je dijagnostifikovan uznapredovani rak pluca. Walter stupi u kontakt sa bivsim ucenikom Jessejem te razradi plan u kom njih dvojica postaju partneri u proizovdnji i distribuciji metamfetamina.', '2008-01-20', 'Images/serije/BreakingBad.jpg', 'Drama, Krimi'),
('Suits', 'serija', 'serija prati Mike Ross-a, studenta prava sa fotografskim pamcenjem koji se ispisao sa fakulteta, koji radi za uspjesnog i harizmaticnog Harvey Specter-a. Fokus je na njihovom radu i zatvaranju slucajeva ali i na skrivanju Mike-ove tajne od ostalih.', '2011-06-23', 'Images/serije/Suits.jpg', 'Komedija, Drama'),
('Game of Thrones', 'serija', 'Radnjom smjestena na izmisljenje kontinente Westerosa i Essosa, Game of Thrones prati nekoliko zapleta. Fokusira se na zeljezno prijestolje 7 kraljevstva Westerosa i prati isprepletenu mrezu saveznistava i suparnistava plemenitih porodica koje se bore kako bi zauzele prijestolje.', '2011-04-17', 'Images/serije/GoT.jpg', 'Fantazija, Drama');

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

INSERT INTO epizode(content_id, sezona, broj_epizode, naziv_epizode, opis_epizode, cover_slika) VALUES
(13, 1, 1, 'The One Where Monica Gets a Roomate', 'Pilot epizoda serije Friends', 'Images/serije/FriendsE1.jpg'),
(13, 1, 2, 'The One with the Sonogram at the End', 'Ross saznaje da je njegova bivsa zena trudna. Rachel vraca prsten Barry-ju. Monika je pod stresom kad njeni roditelji dodju u posjetu', 'Images/serije/FriendsE2'),
(13, 1, 3, 'The One with the Thumb', 'Monika se bori sa raskidom sa deckom kojeg svi vole, Chandler ponovo pocinje pusiti a Pheobe dobija veliku, svotu novca', 'Images/serije/FriendsE3');

INSERT INTO epizode(content_id, sezona, broj_epizode, naziv_epizode, opis_epizode, cover_slika) VALUES
(14, 1, 1, 'Pilot', 'Walter saznaje da ima rak i odlucuje da proizvodi metamfetamin kako bi obezbijedio zenu i sina', 'Images/serije/BreakingBadE1'),
(14, 1, 2, 'Cat\'s in the Bag...', 'Walter i Jesse pokusavaju da sakriju tijelo i drogu', 'Images/serije/BreakingBadE2'),
(14, 1, 3, '...And the Bag\'s in the River', 'Walter se suocava sa moralnom dilemom i likvidira prve neprijatelje', 'Images/serije/BreakingBadE3');

INSERT INTO epizode(content_id, sezona, broj_epizode, naziv_epizode, opis_epizode, cover_slika) VALUES
(15, 1, 1, 'Pilot', 'Mike Ross pocinje da radi kao advokat u firmi Harvey Specter-a', 'Images/serije/SuitsE1'),
(15, 1, 2, 'Errors and Omissions', 'Mike and Harvey se suocavaju sa komplikovanim slucajem', 'Images/serije/SuitsE2'),
(15, 1, 3, 'Inside Track', 'Rivalstvo i poslovni izazovi', 'Images/serije/SuitsE3');

INSERT INTO epizode(content_id, sezona, broj_epizode, naziv_epizode, opis_epizode, cover_slika) VALUES
(16, 1, 1, 'Winter Is Coming', 'Upoznajemo porodicu Stark i politicke intrige Westerosa', 'Images/serije/GoTE1'),
(16, 1, 2, 'The Kingsroad', 'Porodice putuju kroz Kraljev put, prve tenzije se pojavljuju', 'Images/serije/GoTE2'),
(16, 1, 3, 'Lord Snow', 'Jon Snow zapocinje svoj zivot na Zidu', 'Images/serije/GoTE3');


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

INSERT INTO ocjena (content_id, user_id, ocjena) VALUES
(9, 1, 10),
(9, 2, 9),
(9, 3, 8);

INSERT INTO ocjena (content_id, user_id, ocjena) VALUES
(10, 1, 10),
(10, 2, 9),
(10, 3, 8);

INSERT INTO ocjena (content_id, user_id, ocjena) VALUES
(11, 1, 10),
(11, 2, 9),
(11, 3, 8);

INSERT INTO ocjena (content_id, user_id, ocjena) VALUES
(12, 1, 10),
(12, 2, 9),
(12, 3, 8);

INSERT INTO ocjena (content_id, user_id, ocjena) VALUES
(13, 1, 10),
(13, 2, 9),
(13, 3, 8);

INSERT INTO ocjena (content_id, user_id, ocjena) VALUES
(14, 1, 10),
(14, 2, 9),
(14, 3, 8);

INSERT INTO ocjena (content_id, user_id, ocjena) VALUES
(15, 1, 10),
(15, 2, 9),
(15, 3, 8);

INSERT INTO ocjena (content_id, user_id, ocjena) VALUES
(16, 1, 10),
(16, 2, 9),
(16, 3, 8);


CREATE TABLE IF NOT EXISTS trivia (
	trivia_id INT PRIMARY KEY AUTO_INCREMENT,
    content_id INT NOT NULL,
    opis TEXT NOT NULL,
    FOREIGN KEY (content_id) REFERENCES content(content_id)
      ON DELETE CASCADE
);

INSERT INTO trivia (content_id, opis) VALUES
(9, 'Inception je sniman u sest razlicitih gradova sirom svijeta.'),
(9, 'Leonardo DiCaprio je odbio scene bez kaskadera.'),
(10, 'Titanik je osvojio 11 oskara.'),
(11, 'Zbog filma su konsultovani naucnici za crne rupe i relativnost.'),
(12, 'Kostimi zrtava su rekreirani iz forenzickih dokaza koji su posudjeni produkciji.'),
(13, 'Courtney Cox je prvobitno odbila ulogu Monice.'),
(14, 'Serija je prvobitno planirana za samo 2 sezone.'),
(14, 'Naziv serije dolazi od hemijskog izraza BrBa'),
(15, 'Serija se snima u Torontu, iako se radnja desava u Njujorku.'),
(15, 'Harvey Specter je inspirisan stvarnim advokatom.'),
(16, 'Prva epizoda je snimljena u Sjevernoj Irskoj i Maroku.'),
(16, 'Poznata scena sa zmajem je kreirana koriscenjem CGI efekata.');


