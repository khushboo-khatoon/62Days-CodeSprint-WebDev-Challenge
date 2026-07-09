/* ===== Typing Animation ===== */

const typingElement = document.getElementById("typingText");
const typingText = "Will you be my Valentine?";
let typingIndex = 0;

function typeText() {
  if (typingIndex < typingText.length) {
    typingElement.textContent += typingText.charAt(typingIndex);
    typingIndex++;
    setTimeout(typeText, 70);
  }
}

typeText();

/* ===== Cursor Heart Trail ===== */

document.addEventListener("mousemove", (e) => {
  const heart = document.createElement("div");
  heart.className = "heart-trail";
  heart.textContent = "💗";

  heart.style.left = e.clientX + "px";
  heart.style.top = e.clientY + "px";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 800);
});


const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const mainContent = document.getElementById("mainContent");
const startCard = document.getElementById("startCard");
const proposalCard = document.querySelector(".proposal-card");
const loadingOverlay = document.getElementById("loadingOverlay");
const afterYesBlocks = document.querySelectorAll(".after-yes");

const behavior = {
  yesBaseScale: 1,
  yesMaxScale: 2.6,
  scaleDistance: 260,
  repelDistance: 70,
  positioned: false,
};

function clamp(min, val, max) {
  return Math.min(max, Math.max(min, val));
}

function ensureNoBtnPositioned() {

  if (behavior.positioned) return;

  const rect = noBtn.getBoundingClientRect();
  const cardRect = proposalCard.getBoundingClientRect();

  noBtn.style.position = "absolute";
  noBtn.style.left = rect.left - cardRect.left + "px";
  noBtn.style.top = rect.top - cardRect.top + "px";

  behavior.positioned = true;
}


function moveNoButton(avoidX, avoidY) {

  const btnRect = noBtn.getBoundingClientRect();
  const padding = 20;

  const cardRect = proposalCard.getBoundingClientRect();

  const minX = padding;
  const minY = padding;

  const maxX = Math.max(minX, cardRect.width);
  const maxY = Math.max(minY, cardRect.height);

  let x = Math.random() * (maxX - minX) + minX;
  let y = Math.random() * (maxY - minY) + minY;

  x = clamp(minX, x, maxX);
  y = clamp(minY, y, maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}
window.addEventListener("resize", () => {
  behavior.positioned = false;
});


/* YES BUTTON */
yesBtn.addEventListener("click", () => {
  startCard.style.display = "none";
  loadingOverlay.classList.add("active");

  setTimeout(() => {
    loadingOverlay.classList.remove("active");
    afterYesBlocks.forEach((el) => {
      el.style.display = "block";
    });
    startSnakePath();
  }, 2200);
});

/* CURSOR NEAR NO: YES GROWS, NO RUNS */
document.addEventListener("mousemove", (event) => {
  if (!startCard || startCard.style.display === "none") return;
  ensureNoBtnPositioned();

  const noRect = noBtn.getBoundingClientRect();
  const noCenterX = noRect.left + noRect.width / 2;
  const noCenterY = noRect.top + noRect.height / 2;

  const dx = event.clientX - noCenterX;
  const dy = event.clientY - noCenterY;
  const distance = Math.hypot(dx, dy);

  const t = 1 - clamp(0, distance / behavior.scaleDistance, 1);
  const scale = behavior.yesBaseScale + t * (behavior.yesMaxScale - behavior.yesBaseScale);
  yesBtn.style.transform = `scale(${scale})`;

  if (distance < behavior.repelDistance) {
    moveNoButton(event.clientX, event.clientY);
  }
});

const path = document.getElementById("snakePath");
const length = path.getTotalLength();

function resetSnakePath() {
  path.style.transition = "none";
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
}

function startSnakePath() {
  // let the browser apply reset before we animate
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      path.style.transition = "stroke-dashoffset 6s ease-in-out";
      path.style.strokeDashoffset = "0";
    });
  });
}

resetSnakePath();

const envelope = document.getElementById("envelope");
const letterParagraph = document.querySelector(".letter p");
let letterTypingStarted = false;
let letterTypingTimer = null;

function buildTypingTokens(html) {
  const parts = html.split(/(<br\s*\/?>)/gi);
  const tokens = [];

  parts.forEach((part) => {
    if (!part) return;
    if (part.toLowerCase().startsWith("<br")) {
      tokens.push(part);
      return;
    }
    for (const char of part) {
      tokens.push(char);
    }
  });

  return tokens;
}

function startLetterTyping() {
  if (!letterParagraph || letterTypingStarted) return;

  const originalHtml = letterParagraph.innerHTML;
  const tokens = buildTypingTokens(originalHtml);

  letterParagraph.innerHTML = "";
  letterTypingStarted = true;

  let index = 0;
  const step = () => {
    if (index >= tokens.length) {
      return;
    }
    const token = tokens[index];
    letterParagraph.innerHTML += token;
    index += 1;
    letterTypingTimer = setTimeout(step, 35);
  };

  step();
}

envelope.addEventListener("click", () => {
  envelope.classList.toggle("open");
  if (envelope.classList.contains("open")) {
    startLetterTyping();
  }
});
const questions = [
  {
    q:"Who is my favourite person?",
    a:["You","You obviously","Still you","Forever you"]
  },
  {
    q:"What is my favorite kind of day?",
    a:["A day spent with you", "A day full of your messages", "A day where we laugh together", "Any day that includes you"]
  },
  {
    q:"When do I feel the happiest?",
    a:["When I'm talking to you", "When you're smiling", "When we're together", "All of the above"]
  }
];

let currentQ = 0;

const qText = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const qNum = document.getElementById("qNum");

const cells = document.querySelectorAll(".cell");
const winLine = document.getElementById("winLine");
const winText = document.getElementById("winText");

/* Diagonal positions we will fill */
const heartPositions = [0,4,8];

function loadQuestion(){

  qText.textContent = questions[currentQ].q;
  qNum.textContent = currentQ + 1;

  optionsDiv.innerHTML = "";

  questions[currentQ].a.forEach(ans => {

    const btn = document.createElement("div");
    btn.className = "option";
    btn.textContent = ans;

    btn.onclick = () => answerQuestion();

    optionsDiv.appendChild(btn);
  });
}

function answerQuestion(){

  const cellIndex = heartPositions[currentQ];

  const heart = document.createElement("span");
  heart.textContent = "💗";
  heart.className = "heart";

  cells[cellIndex].appendChild(heart);

  currentQ++;

  if(currentQ < questions.length){
    loadQuestion();
  }else{
    setTimeout(showWin,500);
  }
}

function showWin(){

  /* draw diagonal line */
  winLine.style.height = "340px";
  winLine.style.transform = "rotate(-45deg)";
  winText.classList.add("show");
}

loadQuestion();

