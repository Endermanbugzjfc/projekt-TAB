INSERT INTO users(id, user_name, password, legal_name, surname, phone_number, type, birth_date, pesel, employment_date) VALUES (1, 'jankow123', 'qwerty', 'Jan', 'Kowalski', '+48 527 987 321', 'CUSTOMER', null, null, null);
INSERT INTO users(id, user_name, password, legal_name, surname, phone_number, type, birth_date, pesel, employment_date) VALUES (2, 'alma78', '1234', 'Aldona', 'Makota', '+48 722 733 745', 'EMPLOYEE', '1979-12-12', '79121201123', '2000-06-13');
INSERT INTO users(id, user_name, password, legal_name, surname, phone_number, type, birth_date, pesel, employment_date) VALUES (3, 'bestWorkerEver', '1a2b3cdef', 'Maciej', 'Nowak', '+32 111 11 21', 'EMPLOYEE', '1962-02-22', '62022201825', '2000-06-13');
INSERT INTO users(id, user_name, password, legal_name, surname, phone_number, type, birth_date, pesel, employment_date) VALUES (4, 'admin', 'admin', 'Kinga', 'Maliniak', '534 721 897', 'ADMIN', '1992-01-03', '92010343876', '2021-02-22');
INSERT INTO users(id, user_name, password, legal_name, surname, phone_number, type, birth_date, pesel, employment_date) VALUES (5, 'admin1', 'admin1', 'Konrad', 'Lasek', '112 321 143', 'FIRED', '19690-10-30', '69103045768', '2000-06-13');
INSERT INTO users(id, user_name, password, legal_name, surname, phone_number, type, birth_date, pesel, employment_date) VALUES (6, 'bestAdmin', 'ajdhdvhgs432dw!', 'Helena', 'Maczek', '+32 419 75 68', 'ADMIN', '1980-02-14', '80021483751', '2021-01-15');
INSERT INTO users(id, user_name, password, legal_name, surname, phone_number, type, birth_date, pesel, employment_date) VALUES (7, 'super-misiaczek', '143mis', 'Natalia', 'Bury', '345876453', 'CUSTOMER', null, null, null);

INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (1, 74.99, '2012-12-12', 100);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (2, 37.50, '2012-12-12', 300);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (3, 2.99, '2012-12-12', 231);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (4, 22.49, '2013-10-11', 10);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (5, 49.99, '2014-11-10', 1);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (6, 82.38, '2015-10-09', 11);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (7, 750.0, '2020-09-21', 72);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (8, 700.0, '2019-02-23', 999);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (9, 75.50, '2022-05-31', 43);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (10, 55.20, '2021-08-14', 34);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (11, 14.99, '2013-07-19', 52);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (12, 59.99, '2014-06-02', 8);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (13, 19.99, '2015-12-12', 113);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (14, 219.99, '2017-11-11', 7);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (15, 2500.0, '2018-12-22', 5);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (16, 749.99, '2019-01-23', 3);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (17, 0.38, '2020-02-08', 10);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (18, 735.0, '2021-07-04', 12);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (19, 14.99, '2022-05-02', 10);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (20, 74.99, '2013-12-01', 9);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (21, 82.49, '2012-09-17', 89);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (22, 2999.99, '2013-12-18', 72);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (23, 44.99, '2014-11-20', 13);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (24, 244.49, '2019-10-21', 31);
INSERT INTO product_restock(id, purchase_price, restock_date, quantity) VALUES (25, 440.0, '2020-01-02', 100);

INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (1, 'Buty robocze', 'ShoeMann', 'Czarne buty robocze dobrej jako??ci.', 'TOOLS_AND_ARTICLES', 12, 74.99, 99.99, 1);

INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (2, 'Wid??y', 'Toolers', 'Narz??dzie idealne do t??pienia heretyk??w, kt??rzy twierdz??, ??e Maszyna W jest niepotrzebna i nieaktualna.', 'TOOLS_AND_ARTICLES', 1, 37.50, 49.99, 2);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (3, 'Ta??ma malarska', 'la Coleur', 'Papierowa ta??ma malarska przeznaczona do zabezpieczania powierzchni podczas malowania. Przydatna r??wnie?? przy klejeniu lekkich karton??w. Szeroko????: 38 mm  D??ugo????: 25 m  Kolor: ??????ty', 'TOOLS_AND_ARTICLES', 120, 2.99, 3.99, 3);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (4, 'Pazurki ogrodowe', 'Toolers', 'Narz??dzie, dzi??ki kt??remu plewienie b??dzie sam?? przyjemno??ci??.', 'TOOLS_AND_ARTICLES', 19, 22.49, 29.99, 4);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (5, 'Kilof', 'Heavy metal', 'Narz??dzie idealne do przekuwania wiedzy teoretycznej w projekty studenckie.', 'TOOLS_AND_ARTICLES', 9, 49.99, 54.99, 5);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (6, 'Antena', 'Signal', 'Dzia??a w dw??ch polaryzacjach. Nowy model najmocniejszej anteny dost??pnej na rynku. Dopracowana konstrukcja i ulepszone podzespo??y. W pe??ni odporna na warunki atmosferyczne. Wzmocniona konstrukcja. Dodatkowy dipol. Odbiera Full HD TV oraz MUX 8. Z????cze antenowe "F" (standardowe). Wbudowany filtr przeciw zak????ceniom LTE. Zasi??g Fabryczny Anteny  80km, zysk energetyczny: 32dB, d??ugo???? anteny: 78cm. ', 'INSTALLATION', 221, 82.38, 99.99, 6);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (7, 'Boiler', 'Heatex', 'Kr??tki czas nagrzewania wody. Zewn??trzne pokr??t??o regulacji zakresu temperatury wody w przedziale 15-65??C. ??wietlny wska??nik trybu pracy. Grza??ka miedziana z systemem O???PRO wyd??u??aj??cym ??ywotno???? urz??dzenia. Nastawa fabryczna 65??C. Model na??cienny, wisz??cy w pozycji pionowej. Materia?? ??? stal wysokogatunkowa. Emalia ceramiczna DIAMOND-quality (200 ??m). Kolor bia??y (RAL 9016). Uchwyt mocuj??cy urz??dzenie do ??ciany. Zaw??r bezpiecze??stwa. Mufka dielektryczna. Automatyczny bezpiecznik termiczny. Przew??d elektryczny zako??czony wtyczk?? Euro. Zasilanie ~230V/50 Hz. Moc grza??ki 1600 W. Czas nagrzewania: 0h 24 min (wg producenta). Waga: 8kg', 'INSTALLATION', 5, 750.0, 999.0, 7);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (8, 'Grzejnik ??eliwny', 'Heatex', 'Powr??t do przesz??o??ci. Wykonawstwo, styl, efektywno???? to tylko niekt??re cechy charakteryzuj??ce grzejniki ??eliwne. Ten rodzaj grzejnik??w sprawdza si?? w ogrzewaniu miejskim, na paliwo sta??e oraz do instalacji gazowych. Poprzez swoj?? bezw??adno???? oraz du??y z??ad wody s?? bezkonkurencyjne na obecnym rynku por??wnuj??c to do innych grzejnik??w. Nasze grzejniki przesz??y gruntown?? renowacj??. Wypiaskowane, poddane pr??bie szczelno??ci, malowane farbami podk??adowymi oraz farbami renowacyjnymi. Wymiary:Wysoko???? 60 cm. Szeroko???? 42 cm. G????boko???? 14 cm. Rozstaw przy????czy: 50 cm. Moc: 600 W. Kolor: bia??y. Istnieje mo??liwo???? aran??acji grzejnika w dowolnym kolorze.', 'INSTALLATION', 14, 700.0, 800.0, 8);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (9, 'Zewn??trzny czujnik ruchu', 'SENSitive', 'Mikroprocesorowa analiza sygna??u podczerwieni. Dwa dualne PIR - elementy i dwie soczewki Fresnela. Automatyczna regulacja czu??o??ci. Automatyczne "inteligentne" dostosowanie parametr??w do zmian warunk??w otoczenia. Automatyczna podw??jna kompensacja temperatury.', 'INSTALLATION', 21, 75.50, 89.90, 9);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (10, 'Czujnik dymu', 'SENSitive', 'Niezwykle dok??adny i prosty do zamontowania czujnik fotoelektryczny, kt??ry poprawi bezpiecze??stwo nasze oraz os??b w naszym otoczeniu.Wysokiej jako??ci urz??dzenie, dzi??ki kt??remu mo??emy monitorowa?? zamkni??te pomieszczenia pod k??tem obecno??ci dymu lub wykrycia po??aru. Dzi??ki jego niewielkim rozmiarom, mo??emy zamocowa?? go w dowolnym miejscu, bez zb??dnego okablowania. Wczesne wykrycie dymu i ognia. Wytrzyma??a, 10-letnia bateria litowa. Zgodny z norm?? europejsk?? EN14604:2005. Skuteczny alarm d??wi??kowy (85 dB/3m). Migaj??cy wska??nik LED, informuj??cy o niebezpiecze??stwie. ??atwy w monta??u (na dowolnej ??cianie lub suficie). Wy????czanie alarmu za pomoc?? jednego przycisku. Kompaktowa i solidna obudowa. Obszar detekcji 20-40 m2. Czu??o???? wykrywania dymu: 0,120-0,155 db/m. y??oszczelny i ognioodporny materia?? (ABS). ', 'INSTALLATION', 212, 55.20, 65.99, 10);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (11, 'Begonia', 'Garden Heaven', 'Begonia to rodzaj ro??lin z rodziny begoniowatych obejmuj??cy wed??ug r????nych autor??w 1200???1500 gatunk??w. Wyst??puj?? na wszystkich, z wyj??tkiem Australii obszarach tropikalnych i subtropikalnych kuli ziemskiej, najliczniejsza grupa gatunk??w wyst??puje w Ameryce Po??udniowej.', 'GARDEN', 10, 14.99, 17.99, 11);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (12, 'O??wietlenie ogrodowe', 'Light Up The Night', 'Zjawiskowe lampki wprowadzaj??ce niepowtarzaln?? atmosfer?? podczas wieczornych imprez w ogrodzie. Zasilane s?? energi?? elektryczn??. D??ugo???? ??a??cucha z lampkami: 5m.', 'GARDEN', 9, 59.99, 79.99, 12);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (13, 'Konewka', 'Toolers', '??????ta, designerska konewka, kt??ra nie tylko u??atwi podlewanie kwiat??w, ale tak??e b??dzie pe??ni??a rol?? dekoracyjn??.', 'GARDEN', 9, 19.99, 24.99, 13);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (14, 'Hu??tawka', 'Garden Heaven', 'Hu??tawka jednoosobowa. Maksymalny ud??wig: 150kg.', 'GARDEN', 8, 219.99, 280.0, 14);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (15, 'Plac zabaw', 'Garden Heaven', 'Plac zabaw, kt??ry przysporzy wiele rado??ci rodzicom, kt??rzy przez kilka godzin b??d?? sk??adali konstrukcj?? oraz dzieciom, kt??re sp??dz?? na nim ????cznie godzin??. W sk??ad placu zabaw wchodz?? zje??d??alnia z drabinkami oraz trzy hu??tawki.', 'GARDEN', 71, 2500.0, 3500.0, 15);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (16, 'Betoniarka', 'Robert De Builder', 'Zasilanie: 230V, 50Hz. Moc silnika: 220 W. Pojemno???? ca??kowita: 63 litr??w. ??rednica otworu: 260 mm. Obroty: 27,5 obr/min. Wymiary zewn??trzne: 116 x 550 x 935 mm. Waga: 26 kg. ', 'BUILDING', 23, 749.99, 849.99, 16);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (17, 'Ceg??a rozbi??rkowa', 'Robert De Builder', '', 'BUILDING', 42, 0.38, 0.5, 17);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (18, 'Okno PCV plastikowe', 'Knock Knock', 'Okno plastikowe PCV dost??pne w kolorach bia??ym i br??zowym. Wymiary do uzgodnienia.', 'BUILDING', 24, 735.0, 980.0, 18);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (19, 'Rynna PVC', 'Robert De Builder', '??rednica: 125mm. Materia??: Tworzywo sztuczne. Gwarancja:10 Lat. WA??NE: Dost??pne s?? r????ne kolory, wi??c podczas zakupu prosz?? poda?? kolor.', 'BUILDING', 19, 14.99, 19.99, 19);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (20, 'Drabina aluminiowa', 'Robert De Builder', 'Drabina aluminiowa domowa. Materia??: Aluminium. Rodzaj ????czenia Szczebli: Nitowanie. Wysoko???? Do Podestu: 0,54m. Liczba Stopni/Szczebli: 4. Maksymalne Obci????enie: 130 kg. Wysoko???? Robocza: 2,75 m. Wysoko???? Do Podestu: 0,75 m. Szeroko???? Drabiny: 0,43 m. D??ugo???? Drabiny Z??o??onej: 1,45 m. Grubo???? Drabiny Z??o??onej : 0,115 m. Waga: 2,9 kg. Wej??cie: Jednostronne', 'BUILDING', 65, 74.99, 99.99, 20);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (21, 'Karnisz metalowy', 'Heavy metal', 'Pi??kny, metalowy karnisz z jeszcze pi??kniejszym zdobieniem na ko??cach. Cena za 1m.', 'ARRANGEMENT', 28, 82.49, 110.0, 21);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (22, 'Wanna wolnostoj??ca', 'arrrrMATURA', 'Bia??a, wolnostoj??ca wanna, idealna do nowoczesnych wn??trz. D??ugo????: 1,6m. Szeroko????: 1m. ', 'ARRANGEMENT', 82, 2999.99, 3999.99, 22);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (23, 'P??ytki pod??ogowe', 'FloorAndWalls', 'Sze??ciok??t foremny to w naturze kszta??t idealny, dlatego my stworzyli??my dla Ciebie p??ytki idealne: trwa??e, l??ni??ce, ??atwe w czyszczeniu, sze??ciok??tne p??ytki pod??ogowe. S?? niezwykle efektowne. ??atwo je utrzyma?? w stanie takim jak nowe. Cena za 1m2.', 'ARRANGEMENT', 99, 44.99, 69.99, 23);
INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (24, 'Lampa sto??owa', 'Light Up The Night', 'Pi??kna lampka stolikowa idealnie nadaj??ca si?? do nowoczesnych wn??trz.', 'ARRANGEMENT', 120, 244.49, 325.99, 24);

INSERT INTO products(id, name, producer, description, category, number_of_items_in_stock, purchase_price, retail_price, product_id) VALUES
    (25, 'Lustro dekoracyjne postarzane', 'Workucci', ' Lustro dekoracyjne postarzane. W prawdzie nie przejrzysz si?? w nim, ale mo??e to dobrze, przynajmniej nie zobaczysz swoich work??w pod oczami. Wymiary: 1x2m', 'ARRANGEMENT', 1, 440.0, 330.0, 25);
INSERT INTO addresses(id, street_name, street_number, zip_code, location, country, user_id ) VALUES (1, 'Mr??gowska', '2C/8', '47-450', 'Owsiszcze', 'Polska', 1);
INSERT INTO addresses(id, street_name, street_number, zip_code, location, country, user_id ) VALUES (2, 'Warszawska', '11', '45-200', 'Dalekowice', 'Polska', 2);
INSERT INTO addresses(id, street_name, street_number, zip_code, location, country, user_id ) VALUES (3, '3 Maja', '3c', '47-229', 'Nieistniejewo', 'Polska', 3);
INSERT INTO addresses(id, street_name, street_number, zip_code, location, country, user_id ) VALUES (4, 'Profesora Drabiniaka', '66', '66-666', 'Piek??o', 'Polska', 4);
INSERT INTO addresses(id, street_name, street_number, zip_code, location, country, user_id ) VALUES (5, 'Rzemie??lnicza', '12/4', '77-777', 'Niebo', 'Polska', 5);
INSERT INTO addresses(id, street_name, street_number, zip_code, location, country, user_id ) VALUES (6, 'Mr??gowska', '2C/9', '47-450', 'Owsiszcze', 'Polska', 6);
INSERT INTO addresses(id, street_name, street_number, zip_code, location, country, user_id ) VALUES (7, 'Uczelniana', '7/404', '47-100', 'Gliwice', 'Polska', 7);

INSERT INTO shopping_carts (id, creation_date, number_of_items, user_id) VALUES (1, '2022-06-12', 3, 7);
INSERT INTO shopping_carts (id, creation_date, number_of_items, user_id) VALUES (2, '2022-06-24', 0, 1);

INSERT INTO orders(id, order_date, payment_method, user_id) VALUES (1, '2013-09-21', 'CASH', 1);
INSERT INTO orders(id, order_date, payment_method, user_id) VALUES (2, '2014-05-17', 'BLIK', 1);
INSERT INTO orders(id, order_date, payment_method, user_id) VALUES (3, '2020-11-11', 'TRANSFER', 7);
INSERT INTO orders(id, order_date, payment_method, user_id) VALUES (4, '2021-12-21', 'BLIK', 7);
INSERT INTO orders(id, order_date, payment_method, user_id) VALUES (5, '2022-06-24', 'BLIK', 1);
INSERT INTO orders(id, order_date, payment_method, user_id) VALUES (6, '2020-06-06', 'CASH', 7);
INSERT INTO orders(id, order_date, payment_method, user_id) VALUES (7, '2019-01-22', 'CARD', 1);

INSERT INTO images(id, image_uri, product_id) VALUES (1, 'stock/toolsAndArticles/boots1.jpg', 1);
INSERT INTO images(id, image_uri, product_id) VALUES (2, 'stock/toolsAndArticles/fork1.jpg', 2);
INSERT INTO images(id, image_uri, product_id) VALUES (3, 'stock/toolsAndArticles/painterTape2.jpg', 3);
INSERT INTO images(id, image_uri, product_id) VALUES (4, 'stock/toolsAndArticles/fork2.jpg', 4);
INSERT INTO images(id, image_uri, product_id) VALUES (5, 'stock/toolsAndArticles/pickaxe2.jpg', 5);
INSERT INTO images(id, image_uri, product_id) VALUES (6, 'stock/installation/antenna3.jpg', 6);
INSERT INTO images(id, image_uri, product_id) VALUES (7, 'stock/installation/boiler2.jpg', 7);
INSERT INTO images(id, image_uri, product_id) VALUES (8, 'stock/installation/heater3.jpg', 8);
INSERT INTO images(id, image_uri, product_id) VALUES (9, 'stock/installation/sensor1.jpg', 9);
INSERT INTO images(id, image_uri, product_id) VALUES (10, 'stock/installation/sensor4.jpg', 10);
INSERT INTO images(id, image_uri, product_id) VALUES (11, 'stock/garden/begonia.jpg', 11);
INSERT INTO images(id, image_uri, product_id) VALUES (12, 'stock/garden/gardenLighting2.jpg', 12);
INSERT INTO images(id, image_uri, product_id) VALUES (13, 'stock/garden/wateringCan3.jpg', 13);
INSERT INTO images(id, image_uri, product_id) VALUES (14, 'stock/garden/swing1.jpg', 14);
INSERT INTO images(id, image_uri, product_id) VALUES (15, 'stock/garden/playground.jpg', 15);
INSERT INTO images(id, image_uri, product_id) VALUES (16, 'stock/building/concreteMixer.jpg', 16);
INSERT INTO images(id, image_uri, product_id) VALUES (17, 'stock/building/brick1.jpg', 17);
INSERT INTO images(id, image_uri, product_id) VALUES (18, 'stock/building/window1a.jpg', 18);
INSERT INTO images(id, image_uri, product_id) VALUES (19, 'stock/building/gutter3.jpg', 19);
INSERT INTO images(id, image_uri, product_id) VALUES (20, 'stock/building/ladder3.jpg', 20);
INSERT INTO images(id, image_uri, product_id) VALUES (21, 'stock/arrangement/curtainRod3.jpg', 21);
INSERT INTO images(id, image_uri, product_id) VALUES (22, 'stock/arrangement/bath4.jpg', 22);
INSERT INTO images(id, image_uri, product_id) VALUES (23, 'stock/arrangement/floorTiles5.jpg', 23);
INSERT INTO images(id, image_uri, product_id) VALUES (24, 'stock/arrangement/lamp1.jpg', 24);
INSERT INTO images(id, image_uri, product_id) VALUES (25, 'stock/arrangement/mirror4.jpg', 25);

INSERT INTO shopping_cart_products(id, quantity, product_id, shopping_cart_id) VALUES (1, 2, 2, 1);
INSERT INTO shopping_cart_products(id, quantity, product_id, shopping_cart_id) VALUES (2, 1, 15, 1);

INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (1, 2, 3.99, 1, 3);
INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (2, 2, 54.99, 1, 23);
INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (3, 2, 19.99, 1, 19);
INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (4, 2, 31.99, 2, 4);
INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (5, 2, 18.99, 3, 19);
INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (6, 2, 79.99, 3, 12);
INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (7, 2, 24.99, 4, 11);
INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (8, 2, 69.99, 4, 5);
INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (9, 2, 29.90, 4, 4);
INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (10, 2, 0.5, 4, 17);
INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (11, 2, 4.99, 5, 3);
INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (12, 2, 99.99, 6, 1);
INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (13, 2, 44.99, 6, 2);
INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (14, 2, 32.50, 7, 4);
INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (15, 2, 0.52, 7, 17);
INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (16, 2, 319.99, 7, 14);
INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (17, 2, 65.80, 7, 10);
INSERT INTO order_product(id, item_quantity, price, order_id, product_id) VALUES (19, 2, 99.99, 7, 20);
