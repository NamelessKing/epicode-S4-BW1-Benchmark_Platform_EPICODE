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

export async function getDataFromApi(amount = 10, difficulty = "easy") {
  // Controllo che amount sia un numero valido tra 1 e 10, altrimenti uso 10
  const amt =
    Number.isInteger(amount) && amount > 0 ? Math.min(amount, 10) : 10;

  // Controllo che la difficoltà sia una tra quelle accettate, altrimenti uso "easy"
  const diff = ["easy", "medium", "hard"].includes(difficulty)
    ? difficulty
    : "easy";

  // Costruisco l'indirizzo da cui prendere le domande
  const url = `https://opentdb.com/api.php?amount=${amt}&category=18&difficulty=${diff}`;

  try {
    // Chiedo le domande all'API
    const response = await fetch(url);

    // Se la risposta non è ok (ad esempio errore di rete), lancio un errore
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    // Trasformo la risposta in formato JSON
    const result = await response.json();

    // Se ci sono domande nell'oggetto ricevuto, le restituisco
    if (result && Array.isArray(result.results) && result.results.length > 0) {
      return result.results;
    }

    // Se non ci sono domande, avviso e restituisco quelle locali
    console.warn(
      "getDataFromApi: nessun risultato dall'API, uso fallback locale."
    );
    return questions;
  } catch (error) {
    // Se c'è un errore (ad esempio la connessione non funziona), avviso e restituisco quelle locali
    console.error("getDataFromApi error:", error.message);
    return questions; // fallback semplice per evitare undefined
  }
}
export default questions;
