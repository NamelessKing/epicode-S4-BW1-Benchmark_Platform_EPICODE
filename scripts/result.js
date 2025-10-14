//Preleva i risultati dal localStorage
const results = JSON.parse(localStorage.getItem("quizResults"));

// Elementi del DOM
const correctSpan = document.getElementById("correct");
const wrongSpan = document.getElementById("wrong");
const totalSpan = document.getElementById("total");
const totalSpan2 = document.getElementById("total2"); // L'altro span per il totale
const correctPercentP = document.getElementById("percent");
const wrongPercentP = document.getElementById("wrongpercent");
const circleContainer = document.getElementById("circle");
const circleInner = document.querySelector(".circle-inner"); // Elemento interno del cerchio

if (
  results &&
  typeof results.correct === "number" &&
  typeof results.wrong === "number"
) {
  // Calcoli
  const totalQuestions = results.correct + results.wrong;
  const correctAnswers = results.correct;
  const wrongAnswers = results.wrong;

  let correctPercent = 0;
  let wrongPercent = 0;

  if (totalQuestions > 0) {
    correctPercent = ((correctAnswers / totalQuestions) * 100).toFixed(1);
    wrongPercent = ((wrongAnswers / totalQuestions) * 100).toFixed(1);
  }

  // La percentuale richiesta per passare l'esame
  const passThreshold = 60;
  const passed = parseFloat(correctPercent) >= passThreshold;

  // Aggiorna il contenuto testuale
  correctSpan.textContent = correctAnswers;
  wrongSpan.textContent = wrongAnswers;
  totalSpan.textContent = totalQuestions;
  totalSpan2.textContent = totalQuestions; // Il totale è lo stesso
  correctPercentP.textContent = `${correctPercent}%`;
  wrongPercentP.textContent = `${wrongPercent}%`;

  // Aggiorna il testo all'interno del cerchio
  if (passed) {
    circleInner.innerHTML = `
            <p>Congratulations!<br /><span>You passed the exam.</span></p>
            <small>We'll send you the certificate<br />in few minutes.<br />Check your email (including promotions / spam folder)</small>
        `;
  } else {
    circleInner.innerHTML = `
            <p>Spiacente!<br /><span>Non hai superato l'esame.</span></p>
            <small>La percentuale minima richiesta<br />è del ${passThreshold}%.</small>
        `;
  }

  // Aggiorna lo stile del cerchio (Donut Chart)
  const circumference = 2 * Math.PI * 120; // logica CSS usa un raggio di 120px

  // Per creare l'effetto "donut chart" con un singolo background/border:
  // La parte corretta è data da 'correctPercent'
  const correctFillAngle = (correctAnswers / totalQuestions) * 360;

  // Imposta lo stile del cerchio esterno per creare il riempimento
  // Usiamo 'conic-gradient' per simulare il riempimento del cerchio.
  circleContainer.style.background = `conic-gradient(
       #00ffff  ${correctFillAngle}deg, 
        #d20094 ${correctFillAngle}deg 360deg
    )`;

  // Coloro i testi in base al risultato dato
  if (passed) {
    // Se l'esame è superato, colora il titolo in verde
    circleInner.querySelector("span").style.color = "#00ffff";
  } else {
    // Se non è superato, coloro in rosso
    circleInner.querySelector("span").style.color = "#d20094";
  }
} else {
  // Gestione dell'errore se i dati non sono disponibili
  console.error("Dati del quiz non trovati o incompleti.");
}
