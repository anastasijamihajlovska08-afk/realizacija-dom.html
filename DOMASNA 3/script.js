
var vozaci = [];          
var krug = 0;             
var vkupnoKrugovi = 10;   

function napraviVozaci() {
    vozaci = [
        { ime: "Макс Ферстапен",   tim: "Red Bull",     brzina: 95, vestina: 95 },
        { ime: "Ландо Норис",      tim: "McLaren",      brzina: 94, vestina: 90 },
        { ime: "Оскар Пјастри",    tim: "McLaren",      brzina: 93, vestina: 89 },
        { ime: "Шарл Леклер",      tim: "Ferrari",      brzina: 92, vestina: 90 },
        { ime: "Луис Хамилтон",    tim: "Ferrari",      brzina: 91, vestina: 93 },
        { ime: "Џорџ Расел",       tim: "Mercedes",     brzina: 90, vestina: 89 },
        { ime: "Кими Антонели",    tim: "Mercedes",     brzina: 89, vestina: 82 },
        { ime: "Фернандо Алонсо",  tim: "Aston Martin", brzina: 86, vestina: 94 },
        { ime: "Карлос Саинц",     tim: "Williams",     brzina: 85, vestina: 88 },
        { ime: "Пјер Гасли",       tim: "Alpine",       brzina: 83, vestina: 85 }
    ];

    for (var i = 0; i < vozaci.length; i++) {
        vozaci[i].vkupnoVreme = 0;    
        vozaci[i].vremeKrug = 0;      
        vozaci[i].pitStop = false;   
        vozaci[i].krugoviNaGumi = 0;  
        vozaci[i].status = "На старт";
        vozaci[i].klasa = "";        
        if (Math.random() < 0.5) {
            vozaci[i].gumi = "Меки";
        } else {
            vozaci[i].gumi = "Тврди";
        }
    }
}

function formatVreme(sekundi) {
    var minuti = Math.floor(sekundi / 60);
    var ostanati = sekundi - minuti * 60;
    var tekst = ostanati.toFixed(3);
    if (ostanati < 10) {
        tekst = "0" + tekst;
    }
    return minuti + ":" + tekst;
}


function podredi() {
    vozaci.sort(function (a, b) {
        return a.vkupnoVreme - b.vkupnoVreme;
    });
}


function prikaziTabela(naslov, nastani) {
    var html = "<div class='krug'>";
    html += "<h2>" + naslov + "</h2>";

    if (nastani.length > 0) {
        html += "<div class='nastani'>";
        for (var n = 0; n < nastani.length; n++) {
            html += "<p>" + nastani[n] + "</p>";
        }
        html += "</div>";
    }

    html += "<table>";
    html += "<tr>";
    html += "<th>Поз.</th><th>Возач</th><th>Тим</th><th>Брзина</th><th>Вештина</th>";
    html += "<th>Гуми</th><th>Пит-стоп</th><th>Време на круг</th><th>Вкупно време</th>";
    html += "<th>Заостанок</th><th>Статус</th>";
    html += "</tr>";

    for (var i = 0; i < vozaci.length; i++) {
        var v = vozaci[i];

        var gumaKlasa = "tvrdi";
        if (v.gumi == "Меки") {
            gumaKlasa = "meki";
        }

        var zaostanok = "-";
        if (krug > 0) {
            if (i == 0) {
                zaostanok = "Лидер";
            } else {
                zaostanok = "+" + (v.vkupnoVreme - vozaci[0].vkupnoVreme).toFixed(3) + " сек";
            }
        }

        var pit = "Не";
        if (v.pitStop == true) {
            pit = "Да ✔";
        }

        var vremeKrugTekst = "-";
        var vkupnoTekst = "-";
        if (krug > 0) {
            vremeKrugTekst = formatVreme(v.vremeKrug);
            vkupnoTekst = formatVreme(v.vkupnoVreme);
        }

        html += "<tr class='" + v.klasa + "'>";
        html += "<td>" + (i + 1) + "</td>";
        html += "<td>" + v.ime + "</td>";
        html += "<td>" + v.tim + "</td>";
        html += "<td>" + v.brzina + "</td>";
        html += "<td>" + v.vestina + "</td>";
        html += "<td><span class='guma " + gumaKlasa + "'>" + v.gumi + "</span></td>";
        html += "<td>" + pit + "</td>";
        html += "<td>" + vremeKrugTekst + "</td>";
        html += "<td>" + vkupnoTekst + "</td>";
        html += "<td>" + zaostanok + "</td>";
        html += "<td>" + v.status + "</td>";
        html += "</tr>";
    }

    html += "</table>";
    html += "<p class='legenda'>🟦 сино = пит-стоп &nbsp; 🟧 портокалово = се извртел / излетал &nbsp; 🟨 златно = победник</p>";
    html += "</div>";

    var trka = document.getElementById("trka");
    trka.innerHTML = html + trka.innerHTML;
}

function sledenKrug() {
    if (krug >= vkupnoKrugovi) {
        alert("Трката заврши! Кликни на 'Нова трка'.");
        return;
    }

    krug = krug + 1;
    document.getElementById("brojKrug").innerHTML = krug;

    var nastani = [];  

    var bezbednosnoVozilo = false;
    if (Math.random() < 0.15) {
        bezbednosnoVozilo = true;
        nastani.push("🚨 <b>БЕЗБЕДНОСНО ВОЗИЛО</b> излезе на патеката! Сите возат побавно и колоната се збива.");
    }

    for (var i = 0; i < vozaci.length; i++) {
        var v = vozaci[i];
        v.status = "Вози нормално";
        v.klasa = "";

        var vreme = 95;

        vreme = vreme - (v.brzina - 80) * 0.3;

        vreme = vreme - (v.vestina - 80) * 0.15;
        vreme = vreme + Math.random() * 1.5;

        if (v.gumi == "Меки") {
            vreme = vreme - 1.5 + v.krugoviNaGumi * 0.4;
        } else {
            
            vreme = vreme - 0.5 + v.krugoviNaGumi * 0.1;
        }
        v.krugoviNaGumi = v.krugoviNaGumi + 1;

        var sansaGreska = (100 - v.vestina) / 150;
        var slucaen = Math.random();

        if (slucaen < sansaGreska / 3) {
            vreme = vreme + 15;
            v.status = "💥 Излета од патеката (+15 сек)";
            v.klasa = "red-spin";
            nastani.push("💥 " + v.ime + " излета од патеката и изгуби 15 секунди.");
        } else if (slucaen < sansaGreska) {
            vreme = vreme + 6;
            v.status = "🌀 Се изврте (+6 сек)";
            v.klasa = "red-spin";
            nastani.push("🌀 " + v.ime + " се изврте и изгуби 6 секунди.");
        }

       
        var vleguvaVoBoks = false;
        if (v.pitStop == false) {
            if (krug == vkupnoKrugovi - 1) {
               
                vleguvaVoBoks = true;
            } else if (krug >= 3 && Math.random() < 0.3) {
                vleguvaVoBoks = true;
            }
        }

        if (vleguvaVoBoks == true) {
            vreme = vreme + 20;   // пит-стопот трае 20 секунди
            var stariGumi = v.gumi;
            if (v.gumi == "Меки") {
                v.gumi = "Тврди";
            } else {
                v.gumi = "Меки";
            }
            v.krugoviNaGumi = 0;
            v.pitStop = true;
            v.status = "🔧 Пит-стоп: " + stariGumi + " → " + v.gumi + " (+20 сек)";
            v.klasa = "red-pit";
            nastani.push("🔧 " + v.ime + " влезе во бокс и смени гуми од " + stariGumi + " на " + v.gumi + ".");
        }

       
        if (bezbednosnoVozilo == true) {
            vreme = vreme + 25;
            if (v.klasa == "") {
                v.status = "🚨 Зад безбедносно возило";
            }
        }

        v.vremeKrug = vreme;
        v.vkupnoVreme = v.vkupnoVreme + vreme;
    }

    podredi();

    if (bezbednosnoVozilo == true) {
        for (var j = 1; j < vozaci.length; j++) {
            var razlika = vozaci[j].vkupnoVreme - vozaci[j - 1].vkupnoVreme;
            if (razlika > 1) {
                var namaluvanje = razlika - 1;
                vozaci[j].vkupnoVreme = vozaci[j].vkupnoVreme - namaluvanje;
                vozaci[j].vremeKrug = vozaci[j].vremeKrug - namaluvanje;
            }
        }
    }

    if (nastani.length == 0) {
        nastani.push("✅ Мирен круг, без посебни настани.");
    }

    if (krug == vkupnoKrugovi) {
        vozaci[0].klasa = "red-pobednik";
        vozaci[0].status = "🏆 ПОБЕДНИК";
        nastani.push("🏁 Крај на трката! Победник е " + vozaci[0].ime + " (" + vozaci[0].tim + ").");

        document.getElementById("pobednik").innerHTML =
            "🏆 Победник: " + vozaci[0].ime + " - " + vozaci[0].tim +
            " (" + formatVreme(vozaci[0].vkupnoVreme) + ") 🏆";

        document.getElementById("kopceKrug").disabled = true;
        prikaziTabela("🏁 Крај на круг " + krug + " - КРАЈ НА ТРКАТА", nastani);
    } else {
        prikaziTabela("Крај на круг " + krug, nastani);
    }
}

function novaTrka() {
    krug = 0;
    document.getElementById("brojKrug").innerHTML = krug;
    document.getElementById("pobednik").innerHTML = "";
    document.getElementById("trka").innerHTML = "";
    document.getElementById("kopceKrug").disabled = false;

    napraviVozaci();
    prikaziTabela("🚦 Старт на трката", ["Возачите се подготвени на стартната решетка."]);
}



novaTrka();