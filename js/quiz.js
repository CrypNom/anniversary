/* ==========================================================================
   quiz.js — "How well do you know Prem & Niruta?" playful mini-quiz
   Edit the QUESTIONS array below to personalize prompts/answers.
   ========================================================================== */

const QUESTIONS = [
  {
    q: "Where did Prem & Niruta first meet?",
    options: ["A college festival", "A friend's wedding", "A coffee shop", "Online, of course 💻"],
    answer: 2, // 👉 set the index of the correct option
  },
  {
    q: "What's their go-to comfort food on a lazy Sunday?",
    options: ["Momo & chai", "Pizza night", "Homemade dal-bhat", "Ice cream for dinner"],
    answer: 0,
  },
  {
    q: "What song always makes them stop and dance?",
    options: ["Their first-dance song", "Whatever's on the radio", "An old Nepali classic", "A cheesy 2000s hit"],
    answer: 0,
  },
  {
    q: "Where do they dream of traveling together next?",
    options: ["The mountains of Mustang", "A beach in Bali", "Tokyo for the lights", "Somewhere new, together"],
    answer: 3,
  },
  {
    q: "What's the secret to their one year (and counting)?",
    options: ["Never going to bed angry", "Laughing every single day", "Cheering each other on", "All of the above 💗"],
    answer: 3,
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const box = document.getElementById('quiz-app');
  if (!box) return;

  let current = 0;
  let score = 0;

  renderProgress();
  renderQuestion();

  function renderProgress() {
    let bar = document.getElementById('quiz-progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'quiz-progress';
      bar.className = 'quiz-progress';
      box.prepend(bar);
    }
    bar.innerHTML = QUESTIONS.map((_, i) => `<span class="${i < current ? 'done' : ''}"></span>`).join('');
  }

  function renderQuestion() {
    const existing = document.getElementById('quiz-question-wrap');
    if (existing) existing.remove();

    const wrap = document.createElement('div');
    wrap.id = 'quiz-question-wrap';

    if (current >= QUESTIONS.length) {
      wrap.innerHTML = renderResult();
      box.appendChild(wrap);
      const replay = document.getElementById('quiz-replay');
      if (replay) replay.addEventListener('click', () => {
        current = 0; score = 0; renderProgress(); renderQuestion();
      });
      return;
    }

    const item = QUESTIONS[current];
    wrap.innerHTML = `
      <p class="quiz-q">${item.q}</p>
      <div class="quiz-options">
        ${item.options.map((opt, i) => `<button class="quiz-opt" data-i="${i}">${opt}</button>`).join('')}
      </div>
    `;
    box.appendChild(wrap);

    wrap.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(btn, item));
    });
  }

  function handleAnswer(btn, item) {
    const chosen = Number(btn.getAttribute('data-i'));
    const buttons = btn.parentElement.querySelectorAll('.quiz-opt');
    buttons.forEach(b => b.style.pointerEvents = 'none');
    if (chosen === item.answer) {
      btn.classList.add('correct');
      score++;
    } else {
      btn.classList.add('wrong');
      buttons[item.answer].classList.add('correct');
    }
    setTimeout(() => {
      current++;
      renderProgress();
      renderQuestion();
    }, 900);
  }

  function renderResult() {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    let emoji = '💐';
    let msg = "A sweet effort — go on a date and swap stories!";
    if (pct >= 60 && pct < 100) { emoji = '💞'; msg = "You really do know this love story!"; }
    if (pct === 100) { emoji = '💍'; msg = "Certified best friend of Prem & Niruta!"; }
    return `
      <div class="quiz-result reveal is-visible">
        <span class="big-emoji">${emoji}</span>
        <h3>You scored ${score} / ${QUESTIONS.length}</h3>
        <p>${msg}</p>
        <button id="quiz-replay" class="btn btn--primary">Play again 🔁</button>
      </div>
    `;
  }
});
