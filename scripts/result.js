function () {
  const data = JSON.parse(localStorage.getItem("quizResults")) || {
    total: 0, correct: 0, wrong: 0, percent: 0,
  };

  const byId = (id) => document.getElementById(id);
  const pct = Number.isFinite(data.percent) ? Math.max(0, Math.min(100, data.percent)) : 0;
  const wrongPct = 100 - pct;

  // numeri
  byId("correct").textContent = data.correct;
  byId("wrong").textContent = data.wrong;
  byId("total").textContent = data.total;
  byId("total2").textContent = data.total;
  byId("percent").textContent = pct + "%";
  byId("percent2").textContent = wrongPct + "%";