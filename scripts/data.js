const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&apos; t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

/*
  Converte le entità HTML (es. &quot;, &#039;) in caratteri normali (es. " e ')
  - Se l'input non è una stringa, lo restituisce com'è (guard clause).
  - Usa un <textarea> temporaneo: impostando innerHTML, il browser decodifica le entità.
  - Legge il valore “pulito” da .value e lo ritorna.
  Esempio: decodeHtml('The &quot;CPU&quot;') -> 'The "CPU"'
*/
function decodeHtml(str) {
  if (typeof str !== "string") return str; // niente da fare se non è una stringa
  const el = document.createElement("textarea"); // elemento temporaneo
  el.innerHTML = str; // il browser decodifica le entità assegnate a innerHTML
  return el.value; // testo decodificato
}

/*
  Ritorna SEMPRE le domande locali (array questions) con i testi decodificati.
  - Non filtra e non limita: usa tutto l'array locale così com'è.
  - Crea un nuovo array con map (non modifica l’originale).
  - Decodifica: domanda, risposta corretta e ogni risposta errata.
  Utile come "piano B" quando l’API non risponde o torna entità HTML.
*/
function getLocalQuestionsDecoded() {
  return questions.map((q) => ({
    ...q, // copia tutte le proprietà originali (category, type, difficulty, ecc.)
    question: decodeHtml(q.question), // decodifica il testo della domanda
    correct_answer: decodeHtml(q.correct_answer), // decodifica la risposta corretta
    incorrect_answers: q.incorrect_answers.map((a) => decodeHtml(a)), // decodifica ogni risposta errata
  }));
}

export async function getDataFromApi(amount = 10, difficulty = "easy") {
  // 1) Metto in sicurezza "amount":
  //    - deve essere un intero positivo
  //    - non deve superare il massimo consentito (10)
  //    - se non è valido, uso 10 come valore di default
  const amt =
    Number.isInteger(amount) && amount > 0 ? Math.min(amount, 10) : 10;

  // 2) Metto in sicurezza "difficulty":
  //    - accetto solo i valori previsti
  //    - se arriva qualcosa di diverso, imposto "easy"
  const diff = ["easy", "medium", "hard"].includes(difficulty)
    ? difficulty
    : "easy";

  // 3) Costruisco l'URL dell'API con i parametri scelti
  const url = `https://opentdb.com/api.php?amount=${amt}&category=18&difficulty=${diff}`;

  try {
    // 4) Chiamo l'API
    const response = await fetch(url);

    // 5) Se il server risponde con un errore (es. 404/500), interrompo con un errore
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    // 6) Converto la risposta in JSON
    const result = await response.json();

    // 7) Se ci sono domande nell'array "results"
    if (result && Array.isArray(result.results) && result.results.length > 0) {
      // 8) Normalizzo i testi decodificando le entità HTML (es. &quot; -> ")
      const cleaned = result.results.map((q) => ({
        ...q,
        question: decodeHtml(q.question),
        correct_answer: decodeHtml(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((a) => decodeHtml(a)),
      }));

      // 9) Ritorno le domande pulite
      return cleaned;
    }

    // 10) Se l'API non ha restituito domande, uso il fallback locale (senza filtri)
    console.warn("API vuota: uso il fallback locale (senza filtri).");
    return getLocalQuestionsDecoded();
  } catch (error) {
    // 11) In caso di errore di rete o altro, loggo e ritorno il fallback locale
    console.error("getDataFromApi error:", error.message);
    return getLocalQuestionsDecoded();
  }
}
export default questions;
