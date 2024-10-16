# Muistilappu
Komennot konsoliin ja riippuvuushommat ja muut.

## Frontti
Tulee kun jaksan palata näihin.

## Bäkki

### Palvelimen luonti

#### Luo uusi projekti
Aja olemassa olevassa projektikansiossa `npm init`.
* Vastaa konsolin esittämiin kysymyksiin. (Seuraavissa ohjeissa oletetaan kohdan *main* olevan *index.js*.)
* Kohtaan *test command* voi laittaa `echo \"Error: no test specified\" && exit 1`.

Komento luo projektikansioon tiedoston package.json.
* Lisää tiedostoon kohdan *scripts* alle rivi `"start": "node index.js"`.

#### Ota käyttöön express
Aja projektikansiossa `npm install express`.
* Tiedostoon *package.json* lisätään riippuvuus *express* kohdan *dependencies* alle.
* Kansioon *node_modules* lisätään *express* omine riippuvuuksineen.

*Miksi?* Express on kirjasto, joka tarjoaa mahdollisuuden tehdä http-pyyntöjä miellyttävämmin. Tai jotain. Se on joka tapauksessa käytössä tällä kurssilla niin siksi siis.

#### Ota käyttöön nodemon
Aja projektikansiossa `npm intall --save-dev nodemon`.
* Tiedostoon *package.json* lisätään riippuvuus *nodemon* kohdan *devDependencies* alle.
* Kannattaa lisätä tiedostoon myös kohdan *scripts* alle rivi `"dev": "nodemon index.js"`.

*Miksi?* Nodemonin avulla palvelinta ei tarvitse käynnistää manuaalisesti uudelleen, jotta koodiin tehdyt muutokset näkyy selaimessa. Se lisätään (*--save-dev* tägin avulla) kehitysaikaiseksi riippuvuudeksi, koska sitä ei tarvita kun koodia suoritetaan tuotantopalvelimella.

### Palvelimen käynnistäminen

#### Käynnistäminen nodemonilla sovelluskehitysmoodissa
(Nodemon käynnistää palvelimen uudelleen aina kun koodiin tehdään muutoksia. Selain pitää silti itse päivittää, jotta mutokset näkyvät.)

Aja projektikansiossa `npm run dev` (olettaen, että tiedostoon *package.json* on aiemmassa vaiheessa lisätty skripti "dev".)

Vaihtoehtoinen tapa (ilman em. skriptiä): aja projektikansiossa `node_modules/.bin/nodemon index.js` (ei toimi välttämättä Wondowsilla).

#### Käynnistäminen "tavallisesti" ilman nodemonia
(Palvelimen joutuu käynnistämään itse konsolista uudelleen jokaisen koodimuutoksen jälkeen, jotta muutokset on nähtävissä selaimessa.)

Aja projektikansiossa `npm start` (olettaen, että tiedostoon *package.json* on aiemmassa vaiheessa lisätty skripti "start").

Vaihtoehtoinen tapa "suoraan" nodella: aja projektikansiossa `node index.js`.


