import { showResult, nextQuestion } from "./benchmark.js";

// Variabili globali per gestire il timer
let tempoRimanente = 60; // Quanti secondi restano per rispondere
let timerInterval = null; // Serve per fermare il timer quando finisce

// Prende il canvas dalla pagina e prepara il "pennello" per disegnare
const canvas = document.getElementById("timerCanvas");
const ctx = canvas.getContext("2d");
let totalTime = 60; // Tempo totale per la domanda (può cambiare)

// Funzione che disegna il timer circolare sul canvas
function drawTimer(remaining) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il disegno precedente

  // Imposta il centro e il raggio del cerchio
  const centerX = 60;
  const centerY = 60;
  const radius = 52;

  // Disegna il cerchio di sfondo 
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "#6c4a7d";
  ctx.lineWidth = 10;
  ctx.stroke();

  // Disegna la parte colorata che mostra quanto tempo resta
  const percent = remaining / totalTime; // Percentuale di tempo rimasto
  ctx.beginPath();
  ctx.arc(
    centerX,
    centerY,
    radius,
    -0.5 * Math.PI, // Inizia da sopra
    2 * Math.PI * percent - 0.5 * Math.PI // Disegna solo la parte rimasta
  );
  ctx.strokeStyle = "#00ffe7";
  ctx.lineWidth = 10;
  ctx.stroke();

  // Scrive "SECONDS" sopra il numero
  ctx.font = "bold 11px Inter, Arial";
  ctx.fillStyle = "#d1c3e6";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SECONDS", centerX, centerY - 22);

  // Scrive il numero dei secondi rimasti al centro
  ctx.font = "bold 34px Inter, Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText(remaining, centerX, centerY);

  // Scrive "REMAINING" sotto il numero
  ctx.font = "bold 11px Inter, Arial";
  ctx.fillStyle = "#d1c3e6";
  ctx.fillText("REMAINING", centerX, centerY + 22);
}

// Funzione che avvia il timer (puoi scegliere quanti secondi dura)
export function startTimer(time = 60) {
  clearInterval(timerInterval); // Ferma eventuali timer già attivi

  totalTime = time; // Imposta il tempo totale
  tempoRimanente = time; // Imposta il tempo rimasto
  drawTimer(tempoRimanente); // Disegna il timer iniziale

  // Ogni secondo aggiorna il timer
  timerInterval = setInterval(() => {
    tempoRimanente--; // Scala di uno il tempo rimasto
    drawTimer(tempoRimanente); // Ridisegna il timer

    // Se il tempo è finito
    if (tempoRimanente <= 0) {
      clearInterval(timerInterval); // Ferma il timer
      drawTimer(0); // Mostra il timer a zero
      fineTempo(); // Chiama la funzione che gestisce la fine del tempo
    }
  }, 1000); // Ogni 1000 millisecondi (1 secondo)
}

// Funzione per fermare il timer manualmente (ad esempio se l'utente risponde prima)
export function stopTimer() {
  clearInterval(timerInterval); // Ferma il timer
}

// Funzione chiamata quando il tempo scade
function fineTempo() {
  console.log("Tempo scaduto");
  nextQuestion(); // Passa alla prossima domanda (puoi cambiare con showResult se vuoi finire il quiz)
}
