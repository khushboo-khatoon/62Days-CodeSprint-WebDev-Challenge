const SHORTCUTS = {
  vscode: [
    { action: "Save the current file", keys: ["ctrl", "s"], display: "Ctrl + S" },
    { action: "Open Quick Open (go to file)", keys: ["ctrl", "p"], display: "Ctrl + P" },
    { action: "Open Command Palette", keys: ["ctrl", "shift", "p"], display: "Ctrl + Shift + P" },
    { action: "Toggle line comment", keys: ["ctrl", "/"], display: "Ctrl + /" },
    { action: "Select next occurrence", keys: ["ctrl", "d"], display: "Ctrl + D" },
    { action: "Open integrated terminal", keys: ["ctrl", "`"], display: "Ctrl + `" },
    { action: "Find in file", keys: ["ctrl", "f"], display: "Ctrl + F" },
    { action: "Replace in file", keys: ["ctrl", "h"], display: "Ctrl + H" },
    { action: "Go to line", keys: ["ctrl", "g"], display: "Ctrl + G" },
    { action: "Format document", keys: ["shift", "alt", "f"], display: "Shift + Alt + F" },
  ],
  browser: [
    { action: "Open a new tab", keys: ["ctrl", "t"], display: "Ctrl + T" },
    { action: "Close current tab", keys: ["ctrl", "w"], display: "Ctrl + W" },
    { action: "Reopen closed tab", keys: ["ctrl", "shift", "t"], display: "Ctrl + Shift + T" },
    { action: "Reload the page", keys: ["ctrl", "r"], display: "Ctrl + R" },
    { action: "Focus address bar", keys: ["ctrl", "l"], display: "Ctrl + L" },
    { action: "Open find on page", keys: ["ctrl", "f"], display: "Ctrl + F" },
    { action: "Open developer tools", keys: ["f12"], display: "F12" },
    { action: "Go back in history", keys: ["alt", "arrowleft"], display: "Alt + ←" },
    { action: "Go forward in history", keys: ["alt", "arrowright"], display: "Alt + →" },
    { action: "Bookmark this page", keys: ["ctrl", "d"], display: "Ctrl + D" },
  ],
};

const categorySelect = document.getElementById("categorySelect");
const startBtn = document.getElementById("startBtn");
const skipBtn = document.getElementById("skipBtn");
const gameArea = document.getElementById("gameArea");
const gameHint = document.getElementById("gameHint");
const challengeCard = document.getElementById("challengeCard");
const challengeCategory = document.getElementById("challengeCategory");
const challengeAction = document.getElementById("challengeAction");
const keyDisplay = document.getElementById("keyDisplay");
const expectedHint = document.getElementById("expectedHint");
const feedback = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const streakEl = document.getElementById("streak");
const accuracyEl = document.getElementById("accuracy");
const roundEl = document.getElementById("round");

let active = false;
let current = null;
let pressedKeys = new Set();
let score = 0;
let streak = 0;
let correct = 0;
let total = 0;
let round = 0;
let lastChallenge = null;

function getPool() {
  const cat = categorySelect.value;
  if (cat === "all") return [...SHORTCUTS.vscode, ...SHORTCUTS.browser];
  return SHORTCUTS[cat];
}

function getCategoryLabel(item) {
  return SHORTCUTS.vscode.includes(item) ? "VS Code" : "Browser";
}

function pickChallenge() {
  const pool = getPool();
  let item;
  do {
    item = pool[Math.floor(Math.random() * pool.length)];
  } while (pool.length > 1 && item === lastChallenge);
  lastChallenge = item;
  return item;
}

function normalizeKey(key) {
  const k = key.toLowerCase();
  if (k === " ") return "space";
  if (k === "arrowleft") return "arrowleft";
  if (k === "arrowright") return "arrowright";
  if (k === "`" || k === "backquote") return "`";
  if (k === "/") return "/";
  return k;
}

function buildCombo(e) {
  const parts = [];
  if (e.ctrlKey) parts.push("ctrl");
  if (e.shiftKey) parts.push("shift");
  if (e.altKey) parts.push("alt");
  if (e.metaKey) parts.push("meta");

  const key = normalizeKey(e.key);
  if (!["control", "shift", "alt", "meta"].includes(key)) {
    parts.push(key);
  }
  return parts;
}

function combosMatch(a, b) {
  if (a.length !== b.length) return false;
  return a.every((k, i) => k === b[i]);
}

function renderPressedKeys(keys) {
  if (keys.length === 0) {
    keyDisplay.innerHTML = '<span class="placeholder">Press keys…</span>';
    return;
  }
  keyDisplay.innerHTML = keys
    .map((k) => `<span class="key">${formatKey(k)}</span>`)
    .join("");
}

function formatKey(k) {
  const map = {
    ctrl: "Ctrl", shift: "Shift", alt: "Alt", meta: "Meta",
    arrowleft: "←", arrowright: "→", "/": "/", "`": "`",
  };
  return map[k] || k.toUpperCase();
}

function updateStats() {
  scoreEl.textContent = score;
  streakEl.textContent = streak;
  roundEl.textContent = round;
  accuracyEl.textContent = total === 0 ? "—" : `${Math.round((correct / total) * 100)}%`;
}

function showChallenge() {
  current = pickChallenge();
  round++;
  pressedKeys = new Set();
  challengeCategory.textContent = getCategoryLabel(current);
  challengeAction.textContent = current.action;
  expectedHint.textContent = "";
  keyDisplay.innerHTML = '<span class="placeholder">Press keys…</span>';
  feedback.textContent = "";
  feedback.className = "feedback";
  updateStats();
}

function startGame() {
  active = true;
  score = 0;
  streak = 0;
  correct = 0;
  total = 0;
  round = 0;
  lastChallenge = null;
  gameHint.classList.add("hidden");
  challengeCard.classList.remove("hidden");
  skipBtn.disabled = false;
  startBtn.textContent = "Restart";
  showChallenge();
  gameArea.focus();
}

function endRound(success, skipped = false) {
  total++;
  if (skipped) {
    streak = 0;
    feedback.textContent = `Skipped — answer: ${current.display}`;
    feedback.className = "feedback wrong";
  } else if (success) {
    correct++;
    streak++;
    score += 10 + streak;
    feedback.textContent = "Correct! +10 points";
    feedback.className = "feedback correct";
  } else {
    streak = 0;
    feedback.textContent = `Wrong — correct answer: ${current.display}`;
    feedback.className = "feedback wrong";
  }
  updateStats();
  setTimeout(showChallenge, success || skipped ? 900 : 1400);
}

function handleKeyDown(e) {
  if (!active || !current) return;

  const blocked = ["t", "w", "r", "l", "d", "p", "s", "f", "h", "g", "n"];
  const combo = buildCombo(e);
  if (combo.length > 1 || (combo.length === 1 && !blocked.includes(combo[0]))) {
    e.preventDefault();
  }

  pressedKeys = new Set(combo);
  renderPressedKeys(combo);

  if (combosMatch(combo, current.keys)) {
    endRound(true);
  }
}

function handleKeyUp() {
  if (!active) return;
  pressedKeys.clear();
  renderPressedKeys([]);
}

startBtn.addEventListener("click", startGame);

skipBtn.addEventListener("click", () => {
  if (!active) return;
  endRound(false, true);
});

categorySelect.addEventListener("change", () => {
  if (active) showChallenge();
});

gameArea.addEventListener("keydown", handleKeyDown);
gameArea.addEventListener("keyup", handleKeyUp);

gameArea.addEventListener("click", () => gameArea.focus());
