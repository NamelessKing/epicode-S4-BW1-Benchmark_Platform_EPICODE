import { showResult, nextQuestion } from "./benchmark.js";

let tempoRimanente = 60; // durata in secondi
let timerInterval = null;

const timerEl = document.getElementById("timer");

// --- Funzione per avviare il timer ---
export function startTimer() {
  // sicurezza: ferma eventuale timer già in corso
  clearInterval(timerInterval);

  // resetta il tempo a 60 secondi
  tempoRimanente = 60;
  timerEl.textContent = `Tempo rimanente:  ${tempoRimanente}s`;

  // aggiorna ogni secondo
  timerInterval = setInterval(() => {
    tempoRimanente--;
    timerEl.textContent = `⏳ ${tempoRimanente}s`;

    // se arriva a 0: ferma il timer e chiama la funzione di fine
    if (tempoRimanente <= 0) {
      clearInterval(timerInterval);
      timerEl.textContent = "⏰ Tempo scaduto!";
      fineTempo();
    }
  }, 1000);
}

// --- Funzione di stop manuale ---
function stopTimer() {
  clearInterval(timerInterval);
}

// --- Funzione chiamata alla fine del tempo ---
function fineTempo() {
  console.log("Tempo scaduto");
  nextQuestion(); // Chiama la funzione che mostra la prossima domanda
}
