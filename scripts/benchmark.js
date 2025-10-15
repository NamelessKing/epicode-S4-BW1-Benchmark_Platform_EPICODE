/**
 *         QUIZ GAME!

        REGOLE:
        / L'utente dovrà indovinare un certo numero di domandeThe player must guess correctly a certain amount of questions
        / Ogni risposta corretta gli darà 1 punto
        / Le domande possono avere risposte multiple o singole (true/false)
        / Al termine del quiz l'utente dovrà poter vedere il suo punteggio

        DOMANDE:
        / Le domande possono essere ottenute da questo URL ( http://bit.ly/strive_QUIZZ ) o puoi scriverne di tue
        / Possono essere composte di boolean multipli (true / false)

        TIPS:
        / Usa una variabile globale per registrare il punteggio dell'utente
        / Crea una variabile "questionNumber" per tenere traccia del numero (o posizione) della domanda presentata all'utente
        / Quando "questionNumber" è maggiore delle domande disponibili, a quel punto l'applicazione dovrà mostrare il punteggio
        / Comincia salvando le domande in una variabile (o reperiscile dall'URL fornito usando AJAX e fetch)
        / Parti con l'implementazione semplice, poi passa agli extra e ad abbellire l'interfaccia 
        / Fai test completi: controlla la console periodicamente per verificare che non ci siano errori e che il flusso di dati sia quello che ti aspetti

        EXTRA:
        / Dai un feedback sulla risposta al momento del click (corretta o sbagliata)
        / Visualizza una domanda alla volta in sequenza piuttosto che tutte assieme in forma di lista
        / Permetti all'utente di selezionare la difficoltà del quiz prima di iniziare e il numero di domande che desidera ricevere.
        ( Se hai implementato l'applicazione usando l'URL fornito, puoi ottenere i dati che ti servono in modo semplice, 
        usando query parameters in questo modo: https://opentdb.com/api.php?amount=10&category=18&difficulty=easy e modificarne il numero di domande e difficoltà )

        // SE MOSTRI UNA DOMANDA ALLA VOLTA:
      // Mostra la prima domanda con il testo e i radio button.
      // Quando l'utente seleziona una risposta, passa alla domanda successiva dell'array e sostituisci quella precedentemente visualizzata con quella corrente,
      // salvando le risposte dell'utente in una variabile
    };

      // Come calcolare il risultato? Hai due strade:
      // Se stai mostrando tutte le domande nello stesso momento, controlla semplicemente se i radio button selezionati sono === correct_answer
      // Se stai mostrando una domanda alla volta, aggiungi semplicemente un punto alla variabile del punteggio che hai precedentemente creato SE la risposta selezionata è === correct_answer
 */

//import questions from "./data.js"; // Importa le domande dal file data.js
import { startTimer } from "./timer.js";

//const results = JSON.parse(localStorage.getItem("questionsParameters"));

let results = {
  amount: 5,
  difficulty: "hard",
};
const questions = await getData(results.amount, results.difficulty);

let currentQuestion = 0; // Tiene traccia del numero della domanda attuale
let score = 0; // Tiene traccia del punteggio dell'utente

// Prende gli elementi HTML che mostrano il numero della domanda, il totale, il testo della domanda e le risposte
const qNum = document.getElementById("qNum");
const qTotal = document.getElementById("qTotal");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");

qTotal.textContent = questions.length; // Mostra il numero totale di domande

// Mostra la domanda corrente e le possibili risposte
function showQuestion(index) {
  const q = questions[index]; // Prende la domanda attuale dall'array

  //console.log(q);

  qNum.textContent = index + 1; // Aggiorna il numero della domanda
  questionEl.textContent = q.question; // Mostra il testo della domanda

  // Prepara le risposte: mette insieme la risposta corretta e quelle sbagliate
  let answers = [q.correct_answer, ...q.incorrect_answers];
  answers = answers.sort(() => Math.random() - 0.5); // Mischia le risposte in modo casuale

  answersEl.innerHTML = ""; // Svuota il contenitore delle risposte
  const feedback = document.getElementById("feedback");
  feedback.innerHTML = ``;
  answers.forEach((answer) => {
    const btn = document.createElement("button"); // Crea un bottone per ogni risposta
    btn.textContent = answer; // Mostra il testo della risposta sul bottone
    btn.classList.add("answer"); // Applica la classe CSS
    btn.onclick = () => handleAnswer(btn, answer, q.correct_answer); // Quando clicchi, controlla se è giusta
    answersEl.appendChild(btn); // Aggiunge il bottone al contenitore
  });
  startTimer(); // Avvia il timer per ogni domanda
}

// Funzione che può essere chiamata dal timer per passare alla prossima domanda
export function nextQuestion() {
  currentQuestion++; // Passa alla domanda successiva
  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion); // Se ci sono ancora domande, mostra la prossima
  } else {
    showResult(); // Se sono finite, mostra il risultato
  }
}

// Gestisce la risposta dell'utente
function handleAnswer(btn, selected, correct) {
  // Disabilita tutti i bottoni e rimuovi la classe selected
  Array.from(answersEl.children).forEach((b) => {
    b.disabled = true;
    b.classList.remove("selected");
  });

  btn.classList.add("selected"); // Evidenzia il bottone cliccato

  if (selected === correct) {
    score++;
    setTimeout(nextQuestion, 800); // Passa alla prossima domanda dopo breve feedback
  } else {
    const divEl = document.getElementById("feedback");
    divEl.innerHTML = `<p>La risposta corretta è ${correct}</p>`;
    // const correctAnsw = document.createElement("p"); //creo elemento paragraph
    // correctAnsw.innerText = `La risposta corretta è:  ${q.correct_answer}`; //metto testo della risposta corretta dentro paragraph
    // // correctAnsw.classList.add("answer"); //aggiungo CSS
    // divEl.appendChild(correctAnsw); //appendo
    setTimeout(nextQuestion, 5000);
  }
}
// Mostra il risultato finale del quiz
export function showResult() {
  // Calcola i dati finali del quiz
  const total = questions.length; // Numero totale di domande
  const correct = score; // Numero di risposte corrette
  const wrong = total - correct; // Numero di risposte sbagliate
  const percent = Math.round((correct / total) * 100); // Percentuale di risposte corrette

  // Salva i dati nel localStorage come stringa JSON
  localStorage.setItem(
    "quizResults", // Chiave con cui recuperare i dati
    JSON.stringify({
      // Trasforma l'oggetto in stringa
      total,
      correct,
      wrong,
      percent,
    })
  );

  // Mostra il risultato sulla pagina attuale (opzionale)
  questionEl.textContent = `Quiz finished! Your score: ${correct}/${total}`;
  answersEl.innerHTML = "";

  // Per mostrare i risultati in una nuova pagina
  window.location.href = "results.html";
}

// Funzione che può essere chiamata dal timer per ricominciare il quiz
export function resetQuiz() {
  currentQuestion = 0; // Torna alla prima domanda
  score = 0; // Azzera il punteggio
  showQuestion(currentQuestion); // Mostra la prima domanda
}

showQuestion(currentQuestion); // Mostra la prima domanda quando la pagina si carica

async function getData(amount = 10, difficulty = "easy") {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${difficulty}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result.results);
    return result.results;
  } catch (error) {
    console.error(error.message);
  }
}
