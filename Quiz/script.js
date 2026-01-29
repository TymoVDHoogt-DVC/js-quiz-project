const vragen = [
    {
        vraag: "Wat betekent DOM in JavaScript?",
        antwoorden: [
            { tekst: "Document Object Model", juist: true },
            { tekst: "Data Output Machine", juist: false },
            { tekst: "Digital Object Manager", juist: false }
        ]
    },
    {
        vraag: "Welke keyword gebruik je om een variabele te maken?",
        antwoorden: [
            { tekst: "var / let / const", juist: true },
            { tekst: "make", juist: false },
            { tekst: "variable", juist: false }
        ]
    },
    {
        vraag: "Welke functie reageert op een klik?",
        antwoorden: [
            { tekst: "addEventListener('click')", juist: true },
            { tekst: "onPress()", juist: false },
            { tekst: "clickNow()", juist: false }
        ]
    },
    {
        vraag: "Wat gebruik je om HTML aan te passen?",
        antwoorden: [
            { tekst: "DOM-manipulatie", juist: true },
            { tekst: "CSS kleuren", juist: false },
            { tekst: "SQL queries", juist: false }
        ]
    },
    {
        vraag: "Waar sla je meerdere waarden in op?",
        antwoorden: [
            { tekst: "Array", juist: true },
            { tekst: "Alert", juist: false },
            { tekst: "Console", juist: false }
        ]
    }
];

const vraagElement = document.querySelector("#vraag");
const antwoordKnoppen = document.querySelector("#antwoord-knoppen");
const volgendeKnop = document.querySelector("#volgende-btn");
const resultaatElement = document.querySelector("#resultaat");
const opnieuwKnop = document.querySelector("#opnieuw-btn");
const voortgangBalk = document.querySelector("#voortgang-balk");

let huidigeVraag = 0;
let score = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startQuiz() {
    huidigeVraag = 0;
    score = 0;
    shuffle(vragen);
    volgendeKnop.style.display = "none";
    opnieuwKnop.style.display = "none";
    resultaatElement.textContent = "";
    voortgangBalk.style.width = "0%";
    toonVraag();
}

function updateVoortgang() {
    let percentage = (huidigeVraag / vragen.length) * 100;
    voortgangBalk.style.width = percentage + "%";
}

function toonVraag() {
    resetScherm();

    let q = vragen[huidigeVraag];
    vraagElement.textContent = q.vraag;

    shuffle(q.antwoorden).forEach(antwoord => {
        const knop = document.createElement("button");
        knop.textContent = antwoord.tekst;
        knop.classList.add("answer-btn");
        knop.addEventListener("click", () => kiesAntwoord(antwoord.juist, knop));
        antwoordKnoppen.appendChild(knop);
    });

    updateVoortgang();
}

function resetScherm() {
    volgendeKnop.style.display = "none";
    antwoordKnoppen.innerHTML = "";
}

function kiesAntwoord(juist, knop) {
    if (juist) {
        knop.classList.add("correct");
        score++;
    } else {
        knop.classList.add("wrong");
    }

    Array.from(antwoordKnoppen.children).forEach(k => {
        k.disabled = true;
    });

    volgendeKnop.style.display = "block";
}

volgendeKnop.addEventListener("click", () => {
    huidigeVraag++;
    if (huidigeVraag < vragen.length) {
        toonVraag();
    } else {
        zieResultaat();
    }
});

function zieResultaat() {
    resetScherm();
    vraagElement.textContent = "Quiz afgerond!";
    resultaatElement.textContent = `Je score is: ${score} van de ${vragen.length}`;
    voortgangBalk.style.width = "100%";
    opnieuwKnop.style.display = "block";
}

opnieuwKnop.addEventListener("click", startQuiz);

startQuiz();