// =======================================================
//  ЗАЕДНИЧКИ ДЕЛ - се користи на сите страни
// =======================================================

// Почетни дестинации (се користат ако сè уште нема зачувани)
var pocetniDestinacii = [
  {
    id: 1,
    ime: "Рим",
    dolgOpis: "Рим е град-музеј на отворено, со повеќе од 2500 години историја. Тука ќе ги видите Колосеумот, Римскиот форум и Ватикан, а меѓу знаменитостите ќе уживате во вистинска италијанска пица и џелато. Најдобро време за посета е пролет или есен.",
    drzava: "Италија",
    kategorija: "Културен град",
    budzet: 80,
    opis: "Вечниот град со Колосеумот, Ватикан и одлична храна.",
    sliki: [
      "sliki/rim1.jpg",
      "sliki/rim2.jpg",
      "sliki/rim3.jpg"
    ]
  },
  {
    id: 2,
    ime: "Париз",
    dolgOpis: "Париз е градот на светлината, уметноста и романтиката. Искачете се на Ајфеловата кула, посетете го Лувр и прошетајте покрај Сена навечер. Не заборавајте да пробате кроасан во некое мало кафуле.",
    drzava: "Франција",
    kategorija: "Културен град",
    budzet: 110,
    opis: "Градот на светлината, Ајфеловата кула и Лувр.",
    sliki: [
      "sliki/pariz1.jpg",
      "sliki/pariz2.jpg",
      "sliki/pariz3.jpg"
    ]
  },
  {
    id: 3,
    ime: "Охрид",
    dolgOpis: "Охрид е бисерот на Балканот и град под заштита на УНЕСКО. Кристално чистото езеро, црквата Св. Јован Канео и Самуиловата тврдина го прават идеален за летен одмор. Совршен е и за викенд-патување со мал буџет.",
    drzava: "Македонија",
    kategorija: "Море",
    budzet: 40,
    opis: "Бисерот на Балканот со прекрасно езеро и стари цркви.",
    sliki: [
      "sliki/ohrid1.jpg",
      "sliki/ohrid2.jpg",
      "sliki/ohrid3.jpg"
    ]
  },
  {
    id: 4,
    ime: "Барселона",
    dolgOpis: "Барселона спојува море, сонце и неверојатна архитектура. Делата на Гауди, како Саграда Фамилија и Парк Гуел, се единствени во светот. Навечер градот оживува со тапас-барови и музика.",
    drzava: "Шпанија",
    kategorija: "Море",
    budzet: 90,
    opis: "Плажи, Гауди и живописни улици.",
    sliki: [
      "sliki/barselona1.jpg",
      "sliki/barselona2.jpg",
      "sliki/barselona3.jpg"
    ]
  },
  {
    id: 5,
    ime: "Банско",
    dolgOpis: "Банско е планински град под Пирин, познат по одличното скијање во зима. Во лето е идеален за планинарење, а стариот град нуди камени куќи и традиционални механи. Цените се пристапни, па е добар избор за студенти.",
    drzava: "Бугарија",
    kategorija: "Планина",
    budzet: 50,
    opis: "Скијање во зима, планинарење во лето.",
    sliki: [
      "sliki/bansko1.jpg",
      "sliki/bansko2.jpg",
      "sliki/bansko3.jpg"
    ]
  },
  {
    id: 6,
    ime: "Цермат",
    dolgOpis: "Цермат е алпско село во подножјето на легендарниот врв Матерхорн. Во селото нема автомобили, а скијањето на глечерот е можно цела година. Скап е, но погледот вреди за секое евро.",
    drzava: "Швајцарија",
    kategorija: "Планина",
    budzet: 180,
    opis: "Алпско село под врвот Матерхорн.",
    sliki: [
      "sliki/cermat1.jpg",
      "sliki/cermat2.jpg",
      "sliki/cermat3.jpg"
    ]
  }
];

// Ги зема дестинациите од localStorage (меморијата на прелистувачот)
function zemiDestinacii() {
  var podatoci = localStorage.getItem("destinacii_v2");
  if (podatoci == null) {
    return pocetniDestinacii;
  }
  return JSON.parse(podatoci);
}

// Ги зачувува дестинациите во localStorage
function zacuvajDestinacii(lista) {
  localStorage.setItem("destinacii_v2", JSON.stringify(lista));
}

// Проверува дали корисникот е најавен
function eNajaven() {
  return localStorage.getItem("najaven") == "da";
}

// Го менува линкот "Најава" во "Одјава" ако корисникот е најавен
function proveriNajava() {
  var link = document.getElementById("linkNajava");
  if (link != null && eNajaven()) {
    link.innerHTML = "Одјава (" + localStorage.getItem("korisnik") + ")";
    link.href = "#";
    link.onclick = function () {
      localStorage.removeItem("najaven");
      localStorage.removeItem("korisnik");
      alert("Успешно се одјавивте!");
      window.location.href = "index.html";
    };
  }
}

// Прави HTML за една картичка на град
function napraviKarticka(d, soBrishenje) {
  var html = "<div class='karticka'>";
  html += "<img src='" + d.sliki[0] + "' alt='" + d.ime + "'>";
  html += "<div class='karticka-tekst'>";
  html += "<h3>" + d.ime + ", " + d.drzava + "</h3>";
  html += "<span class='oznaka'>" + d.kategorija + "</span>";
  html += "<span class='oznaka'>" + d.budzet + " € / ден</span>";
  html += "<p>" + d.opis + "</p>";
  html += "<a class='kopce' href='grad.html?id=" + d.id + "'>Повеќе</a> ";
  if (soBrishenje) {
    html += "<button class='kopce kopce-sivo' onclick='izbrisiDestinacija(" + d.id + ")'>Избриши</button>";
  }
  html += "</div></div>";
  return html;
}

// Прави поголема картичка за почетната страна (со подолг опис)
function napraviPopularna(d) {
  var opis = d.dolgOpis;
  if (opis == undefined) {
    opis = d.opis; // ако нема подолг опис, го користиме краткиот
  }
  var html = "<div class='karticka popularna'>";
  html += "<div class='slika-ramka'><img src='" + d.sliki[0] + "' alt='" + d.ime + "'></div>";
  html += "<div class='karticka-tekst'>";
  html += "<h3>" + d.ime + ", " + d.drzava + "</h3>";
  html += "<span class='oznaka'>" + d.kategorija + "</span>";
  html += "<span class='oznaka'>" + d.budzet + " € / ден</span>";
  html += "<p>" + opis + "</p>";
  html += "<a class='kopce' href='grad.html?id=" + d.id + "'>Повеќе</a>";
  html += "</div></div>";
  return html;
}

// Се извршува на секоја страна
proveriNajava();


// =======================================================
//  ПОЧЕТНА СТРАНА (index.html)
// =======================================================
var popularni = document.getElementById("popularni");
if (popularni != null) {
  var lista = zemiDestinacii();
  var html = "";
  // ги прикажуваме само првите 3 града
  for (var i = 0; i < lista.length && i < 3; i++) {
    html += napraviPopularna(lista[i]);
  }
  popularni.innerHTML = html;
}


// =======================================================
//  НАЈАВА (login.html)
// =======================================================
function najaviSe() {
  var korisnik = document.getElementById("korisnik").value;
  var lozinka = document.getElementById("lozinka").value;
  var poraka = document.getElementById("porakaNajava");

  if (korisnik == "" || lozinka == "") {
    poraka.innerHTML = "Пополнете ги двете полиња!";
    poraka.style.color = "red";
    return false;
  }

  if (korisnik == "admin" && lozinka == "1234") {
    localStorage.setItem("najaven", "da");
    localStorage.setItem("korisnik", korisnik);
    alert("Добредојдовте, " + korisnik + "!");
    window.location.href = "destinacii.html";
  } else {
    poraka.innerHTML = "Погрешно корисничко име или лозинка.";
    poraka.style.color = "red";
  }
  return false; // за формата да не ја освежи страната
}


// =======================================================
//  ДЕСТИНАЦИИ (destinacii.html)
// =======================================================

// Ги прикажува градовите (со или без филтер)
function prikaziDestinacii(lista) {
  var kontejner = document.getElementById("listaDestinacii");
  if (lista.length == 0) {
    kontejner.innerHTML = "<p>Нема дестинации според избраниот филтер.</p>";
    return;
  }
  var html = "";
  for (var i = 0; i < lista.length; i++) {
    html += napraviKarticka(lista[i], eNajaven());
  }
  kontejner.innerHTML = html;
}

// Филтрирање по категорија и буџет
function filtriraj() {
  var kategorija = document.getElementById("filterKategorija").value;
  var maxBudzet = document.getElementById("filterBudzet").value;
  var site = zemiDestinacii();
  var rezultat = [];

  for (var i = 0; i < site.length; i++) {
    var d = site[i];
    var dobraKategorija = (kategorija == "site" || d.kategorija == kategorija);
    var dobarBudzet = (maxBudzet == "" || d.budzet <= Number(maxBudzet));
    if (dobraKategorija && dobarBudzet) {
      rezultat.push(d);
    }
  }
  prikaziDestinacii(rezultat);
}

function iscistiFilter() {
  document.getElementById("filterKategorija").value = "site";
  document.getElementById("filterBudzet").value = "";
  prikaziDestinacii(zemiDestinacii());
}

// Додавање нова дестинација
function dodadiDestinacija() {
  var ime = document.getElementById("novoIme").value;
  var drzava = document.getElementById("novaDrzava").value;
  var kategorija = document.getElementById("novaKategorija").value;
  var budzet = document.getElementById("novBudzet").value;
  var opis = document.getElementById("novOpis").value;
  var slika = document.getElementById("novaSlika").value;

  if (ime == "" || drzava == "" || budzet == "") {
    alert("Внесете име, држава и буџет!");
    return false;
  }

  // ако не е внесена слика, ставаме случајна
  if (slika == "") {
    slika = "sliki/baner.jpg";
  }

  var nova = {
    id: Date.now(), // уникатен број
    ime: ime,
    drzava: drzava,
    kategorija: kategorija,
    budzet: Number(budzet),
    opis: opis,
    sliki: [slika, slika, slika]
  };

  var lista = zemiDestinacii();
  lista.push(nova);
  zacuvajDestinacii(lista);

  document.getElementById("formaDodadi").reset();
  prikaziDestinacii(lista);
  popolniKalkulator();
  alert("Дестинацијата е додадена!");
  return false;
}

// Бришење дестинација
function izbrisiDestinacija(id) {
  if (!confirm("Дали сте сигурни дека сакате да ја избришете?")) {
    return;
  }
  var lista = zemiDestinacii();
  var nova = [];
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id != id) {
      nova.push(lista[i]);
    }
  }
  zacuvajDestinacii(nova);
  prikaziDestinacii(nova);
  popolniKalkulator();
}

// Ги става градовите во паѓачкото мени на калкулаторот
function popolniKalkulator() {
  var select = document.getElementById("kalkGrad");
  var lista = zemiDestinacii();
  var html = "";
  for (var i = 0; i < lista.length; i++) {
    html += "<option value='" + lista[i].budzet + "'>" + lista[i].ime + " (" + lista[i].budzet + " € / ден)</option>";
  }
  select.innerHTML = html;
}

// Пресметка на патни трошоци
function presmetaj() {
  var budzetDen = Number(document.getElementById("kalkGrad").value);
  var denovi = Number(document.getElementById("kalkDenovi").value);
  var lugje = Number(document.getElementById("kalkLugje").value);
  var prevoz = Number(document.getElementById("kalkPrevoz").value);

  if (denovi <= 0 || lugje <= 0) {
    alert("Внесете број на денови и број на луѓе!");
    return false;
  }

  var poCovek = budzetDen * denovi + prevoz;
  var vkupno = poCovek * lugje;

  document.getElementById("rezultatKalk").innerHTML =
    "По човек: <b>" + poCovek + " €</b><br>Вкупно за " + lugje + " лица: <b>" + vkupno + " €</b>";
  return false;
}

// Кога ќе се отвори страната destinacii.html
if (document.getElementById("listaDestinacii") != null) {
  prikaziDestinacii(zemiDestinacii());
  popolniKalkulator();

  // формата за додавање ја гледа само најавен корисник
  if (eNajaven()) {
    document.getElementById("formaDodadi").style.display = "block";
    document.getElementById("porakaZaNajava").style.display = "none";
  }
}


// =======================================================
//  ГАЛЕРИЈА (galerija.html)
// =======================================================
var galerija = document.getElementById("galerijaSliki");
if (galerija != null) {
  var lista = zemiDestinacii();
  var html = "";
  for (var i = 0; i < lista.length; i++) {
    for (var j = 0; j < lista[i].sliki.length; j++) {
      html += "<a href='grad.html?id=" + lista[i].id + "'>";
      html += "<img src='" + lista[i].sliki[j] + "' title='" + lista[i].ime + "'>";
      html += "</a>";
    }
  }
  galerija.innerHTML = html;
}


// =======================================================
//  СТРАНА ЗА ГРАД (grad.html)
// =======================================================

// Ги зема оцените и коментарите за сите слики
function zemiOcenki() {
  var podatoci = localStorage.getItem("ocenki");
  if (podatoci == null) {
    return {};
  }
  return JSON.parse(podatoci);
}

// Враќа податоци за една слика (ако ги нема, прави нови)
function podatociZaSlika(kluc) {
  var ocenki = zemiOcenki();
  if (ocenki[kluc] == undefined) {
    return { like: 0, dislike: 0, komentari: [] };
  }
  return ocenki[kluc];
}

function zacuvajZaSlika(kluc, podatoci) {
  var ocenki = zemiOcenki();
  ocenki[kluc] = podatoci;
  localStorage.setItem("ocenki", JSON.stringify(ocenki));
}

function lajk(kluc) {
  var p = podatociZaSlika(kluc);
  p.like = p.like + 1;
  zacuvajZaSlika(kluc, p);
  prikaziGrad();
}

function dislajk(kluc) {
  var p = podatociZaSlika(kluc);
  p.dislike = p.dislike + 1;
  zacuvajZaSlika(kluc, p);
  prikaziGrad();
}

function dodadiKomentar(kluc) {
  var pole = document.getElementById("kom-" + kluc);
  var tekst = pole.value;
  if (tekst == "") {
    alert("Напишете коментар!");
    return;
  }
  var p = podatociZaSlika(kluc);
  p.komentari.push(tekst);
  zacuvajZaSlika(kluc, p);
  prikaziGrad();
}

// Ги прикажува сликите на градот со like/dislike и коментари
function prikaziGrad() {
  // го читаме id од адресата, пр. grad.html?id=1
  var parametri = new URLSearchParams(window.location.search);
  var id = parametri.get("id");

  var lista = zemiDestinacii();
  var grad = null;
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id == id) {
      grad = lista[i];
    }
  }

  var kontejner = document.getElementById("gradSodrzina");
  if (grad == null) {
    kontejner.innerHTML = "<p>Градот не е пронајден. <a href='destinacii.html'>Назад кон дестинации</a></p>";
    return;
  }

  var html = "<h1>" + grad.ime + ", " + grad.drzava + "</h1>";
  html += "<p>" + grad.opis + "</p>";
  html += "<p><span class='oznaka'>" + grad.kategorija + "</span>";
  html += "<span class='oznaka'>" + grad.budzet + " € / ден</span></p>";

  for (var j = 0; j < grad.sliki.length; j++) {
    var kluc = grad.id + "-" + j;
    var p = podatociZaSlika(kluc);

    html += "<div class='slika-blok'>";
    html += "<img src='" + grad.sliki[j] + "'>";
    html += "<p>";
    html += "<button class='kopce' onclick=\"lajk('" + kluc + "')\">👍 " + p.like + "</button> ";
    html += "<button class='kopce kopce-sivo' onclick=\"dislajk('" + kluc + "')\">👎 " + p.dislike + "</button>";
    html += "</p>";

    html += "<h3>Коментари (" + p.komentari.length + ")</h3>";
    for (var k = 0; k < p.komentari.length; k++) {
      html += "<div class='komentar'>" + p.komentari[k] + "</div>";
    }

    html += "<div class='forma'>";
    html += "<input type='text' id='kom-" + kluc + "' placeholder='Напишете коментар...'>";
    html += "<button class='kopce' onclick=\"dodadiKomentar('" + kluc + "')\">Испрати</button>";
    html += "</div>";
    html += "</div>";
  }

  kontejner.innerHTML = html;
}

if (document.getElementById("gradSodrzina") != null) {
  prikaziGrad();
}


// =======================================================
//  АНКЕТА (anketa.html)
// =======================================================
function isprativAnketa() {
  var ime = document.getElementById("anketaIme").value;
  var email = document.getElementById("anketaEmail").value;
  var vozrast = document.getElementById("anketaVozrast").value;
  var kakoNajde = document.getElementById("anketaKako").value;
  var komentar = document.getElementById("anketaKomentar").value;

  // оцена (radio копчиња)
  var ocena = "";
  var radio = document.getElementsByName("ocena");
  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      ocena = radio[i].value;
    }
  }

  // што им се допадна (checkbox - може повеќе)
  var dopadna = [];
  var kutii = document.getElementsByName("dopadna");
  for (var j = 0; j < kutii.length; j++) {
    if (kutii[j].checked) {
      dopadna.push(kutii[j].value);
    }
  }

  // проверка
  if (ime == "" || ocena == "") {
    alert("Внесете име и изберете оцена!");
    return false;
  }

  var odgovor = {
    ime: ime,
    email: email,
    vozrast: vozrast,
    ocena: Number(ocena),
    dopadna: dopadna,
    kakoNajde: kakoNajde,
    komentar: komentar
  };

  var site = JSON.parse(localStorage.getItem("anketi") || "[]");
  site.push(odgovor);
  localStorage.setItem("anketi", JSON.stringify(site));

  document.getElementById("formaAnketa").reset();
  document.getElementById("porakaAnketa").innerHTML = "Ви благодариме, " + ime + "! Вашиот одговор е зачуван.";
  prikaziRezultati();
  return false;
}

// Прикажува колку луѓе одговориле и просечна оцена
function prikaziRezultati() {
  var site = JSON.parse(localStorage.getItem("anketi") || "[]");
  var rezultati = document.getElementById("rezultatiAnketa");

  if (site.length == 0) {
    rezultati.innerHTML = "<p>Сè уште нема одговори.</p>";
    return;
  }

  var zbir = 0;
  for (var i = 0; i < site.length; i++) {
    zbir = zbir + site[i].ocena;
  }
  var prosek = (zbir / site.length).toFixed(1);

  var html = "<p>Број на одговори: <b>" + site.length + "</b></p>";
  html += "<p>Просечна оцена: <b>" + prosek + " / 5</b></p>";
  html += "<h3>Последни коментари:</h3>";
  for (var j = site.length - 1; j >= 0 && j >= site.length - 5; j--) {
    if (site[j].komentar != "") {
      html += "<div class='komentar'><b>" + site[j].ime + ":</b> " + site[j].komentar + "</div>";
    }
  }
  rezultati.innerHTML = html;
}

if (document.getElementById("rezultatiAnketa") != null) {
  prikaziRezultati();
}
