// CONFIGURAZIONE
const creationDate = new Date("2025-12-01");
const totalDaysToWhite = 100;

// COUNTER
function updateDayCounter() {
    const now = new Date();
    const diff = Math.floor((now - creationDate) / (1000 * 60 * 60 * 24));
    document.getElementById("dayCounter").textContent = diff;
    return diff;
}

// SFONDO (nero → bianco)
function updateBackground(days) {
    const progress = Math.min(days / totalDaysToWhite, 1);
    const gray = Math.floor(progress * 255);
    document.getElementById("background").style.backgroundColor = 'rgb(' + gray + ',' + gray + ',' + gray + ')';

    const counter = document.getElementById("dayCounter");
    counter.style.color = gray > 140 ? "black" : "white";

    // aggiorno colore freccia
    updateArrowColor(gray);
}

// ANIMAZIONE SCROLL + NASCONDI NUMERO
function revealOnScroll() {
    const panels = document.querySelectorAll(".panel");
    const vh = window.innerHeight * 0.75;

    panels.forEach(panel => {
        const top = panel.getBoundingClientRect().top;
        if (top < vh) panel.classList.add("visible");
    });

    // NASCONDI NUMERO appena la seconda sezione tocca la parte alta dello schermo
    const secondPanel = document.querySelectorAll(".panel")[1]; // seconda sezione
    const secondPanelTop = secondPanel.getBoundingClientRect().top;
    const counter = document.querySelector(".counter-container");

    if (secondPanelTop <= 0) {  // appena la seconda sezione tocca la parte superiore
        counter.classList.add("counter-hidden");
    } else {
        counter.classList.remove("counter-hidden");
    }
}

// SCROLL FRECCIA
const scrollArrow = document.getElementById("scrollArrow");

if (scrollArrow) {
    // Scroll verso il basso al click (fino in fondo alla pagina)
    scrollArrow.addEventListener("click", function () {
        window.scrollTo({
            top: document.body.scrollHeight, // altezza totale del body
            behavior: "smooth"                // scorrimento fluido
        });
    });

    // Sparisce quando scrolli la pagina
    window.addEventListener("scroll", function () {
        if (window.scrollY > 10) { // dopo qualche pixel di scroll
            scrollArrow.classList.add("arrow-hidden");
        } else {
            scrollArrow.classList.remove("arrow-hidden");
        }
    });
}


// AGGIORNAMENTO COLORE FRECCIA
function updateArrowColor(gray) {
    const scrollArrow = document.getElementById("scrollArrow");
    if (!scrollArrow) return;

    // Se lo sfondo è chiaro (gray > 140), freccia nera, altrimenti bianca
    scrollArrow.style.color = gray > 140 ? "black" : "white";
}


// AVVIO
function init() {
    const days = updateDayCounter();
    updateBackground(days);
    revealOnScroll();
}

window.addEventListener("scroll", revealOnScroll);
init();