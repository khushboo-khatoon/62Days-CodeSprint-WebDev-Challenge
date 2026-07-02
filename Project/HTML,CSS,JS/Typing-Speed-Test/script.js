// ===========================
// Word bank for random text
// ===========================
const wordBank = [
  "the",
  "quick",
  "brown",
  "fox",
  "jumps",
  "over",
  "lazy",
  "dog",
  "while",
  "coding",
  "every",
  "day",
  "helps",
  "build",
  "strong",
  "habits",
  "and",
  "improves",
  "your",
  "skills",
  "javascript",
  "html",
  "css",
  "developer",
  "computer",
  "keyboard",
  "practice",
  "makes",
  "perfect",
  "speed",
  "test",
  "challenge",
  "open",
  "source",
  "project",
  "learning",
  "growth",
  "focus",
  "type",
  "fast",
  "accurate",
  "words",
  "minute",
  "browser",
  "function",
  "variable",
  "array",
  "object",
  "string",
  "number",
  "boolean",
  "loop",
  "design",
  "responsive",
  "website",
  "style",
  "script",
  "element",
  "event",
  "click",
  "input",
  "output",
  "logic",
  "structure",
  "clean",
  "readable",
];

// ===========================
// DOM References
// ===========================
const textDisplay = document.getElementById("textDisplay");
const inputArea = document.getElementById("inputArea");
const timeValue = document.getElementById("timeValue");
const wpmValue = document.getElementById("wpmValue");
const accuracyValue = document.getElementById("accuracyValue");
const errorsValue = document.getElementById("errorsValue");
const durationSelect = document.getElementById("durationSelect");
const restartBtn = document.getElementById("restartBtn");
const themeToggle = document.getElementById("themeToggle");
const resultModal = document.getElementById("resultModal");
const tryAgainBtn = document.getElementById("tryAgainBtn");

const finalWpm = document.getElementById("finalWpm");
const finalAccuracy = document.getElementById("finalAccuracy");
const finalErrors = document.getElementById("finalErrors");
const finalChars = document.getElementById("finalChars");

// ===========================
// State
// ===========================
let targetText = "";
let timer = null;
let timeLeft = 60;
let totalSeconds = 60;
let isRunning = false;
let totalCharsTyped = 0;
let totalErrors = 0;

// ===========================
// Generate random paragraph
// ===========================
function generateText(wordCount = 60) {
  let words = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    words.push(wordBank[randomIndex]);
  }
  return words.join(" ");
}

// ===========================
// Render text into spans
// ===========================
function renderText() {
  textDisplay.innerHTML = "";
  targetText.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    textDisplay.appendChild(span);
  });
  if (textDisplay.firstChild) {
    textDisplay.firstChild.classList.add("char-current");
  }
}

// ===========================
// Start a fresh test
// ===========================
function setupTest() {
  clearInterval(timer);
  isRunning = false;
  totalCharsTyped = 0;
  totalErrors = 0;
  totalSeconds = parseInt(durationSelect.value, 10);
  timeLeft = totalSeconds;

  targetText = generateText(80);
  renderText();

  inputArea.value = "";
  inputArea.disabled = false;

  timeValue.textContent = timeLeft;
  wpmValue.textContent = "0";
  accuracyValue.textContent = "100%";
  errorsValue.textContent = "0";

  resultModal.classList.remove("active");
}

// ===========================
// Start timer on first keystroke
// ===========================
function startTimer() {
  if (isRunning) return;
  isRunning = true;

  timer = setInterval(() => {
    timeLeft--;
    timeValue.textContent = timeLeft;

    updateLiveStats();

    if (timeLeft <= 0) {
      endTest();
    }
  }, 1000);
}

// ===========================
// Live WPM + accuracy while typing
// ===========================
function updateLiveStats() {
  const elapsedMinutes = (totalSeconds - timeLeft) / 60;
  const wordsTyped = totalCharsTyped / 5; // standard: 5 chars = 1 word
  const wpm = elapsedMinutes > 0 ? Math.round(wordsTyped / elapsedMinutes) : 0;
  wpmValue.textContent = wpm > 0 ? wpm : 0;

  const accuracy =
    totalCharsTyped > 0
      ? Math.max(
          0,
          Math.round(((totalCharsTyped - totalErrors) / totalCharsTyped) * 100),
        )
      : 100;
  accuracyValue.textContent = accuracy + "%";

  errorsValue.textContent = totalErrors;
}

// ===========================
// Handle typing input
// ===========================
inputArea.addEventListener("input", () => {
  if (!isRunning) startTimer();

  const typedText = inputArea.value;
  const spans = textDisplay.querySelectorAll("span");

  totalCharsTyped = typedText.length;
  totalErrors = 0;

  spans.forEach((span, index) => {
    const typedChar = typedText[index];
    span.classList.remove("char-correct", "char-incorrect", "char-current");

    if (typedChar == null) {
      // not typed yet
      return;
    } else if (typedChar === span.textContent) {
      span.classList.add("char-correct");
    } else {
      span.classList.add("char-incorrect");
      totalErrors++;
    }
  });

  // mark current character position
  if (spans[typedText.length]) {
    spans[typedText.length].classList.add("char-current");
  }

  updateLiveStats();

  // auto-end if user finishes full text before time runs out
  if (typedText.length >= targetText.length) {
    endTest();
  }
});

// ===========================
// End test and show results
// ===========================
function endTest() {
  clearInterval(timer);
  isRunning = false;
  inputArea.disabled = true;

  const elapsedMinutes = (totalSeconds - timeLeft) / 60 || totalSeconds / 60;
  const wordsTyped = totalCharsTyped / 5;
  const finalWpmValue =
    elapsedMinutes > 0 ? Math.round(wordsTyped / elapsedMinutes) : 0;
  const finalAccuracyValue =
    totalCharsTyped > 0
      ? Math.max(
          0,
          Math.round(((totalCharsTyped - totalErrors) / totalCharsTyped) * 100),
        )
      : 100;

  finalWpm.textContent = finalWpmValue;
  finalAccuracy.textContent = finalAccuracyValue + "%";
  finalErrors.textContent = totalErrors;
  finalChars.textContent = totalCharsTyped;

  resultModal.classList.add("active");
}

// ===========================
// Restart / Try Again
// ===========================
restartBtn.addEventListener("click", setupTest);
tryAgainBtn.addEventListener("click", setupTest);
durationSelect.addEventListener("change", setupTest);

// ===========================
// Theme Toggle (Light / Dark)
// ===========================
function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    document.documentElement.removeAttribute("data-theme");
    themeToggle.textContent = "🌙";
  }
  try {
      localStorage.setItem("typingTestTheme", theme)
  } catch (e) {
      // localStorage unavailable (e.g. Safari Private Mode) — silently ignore
  }
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  applyTheme(isDark ? "light" : "dark");
});

// Load saved theme or fall back to system preference
(function initTheme() {
  let savedTheme = null;
 try {
     savedTheme = localStorage.getItem("typingTestTheme");
 } catch (e) {
     // localStorage unavailable (e.g. Safari Private Mode) — silently ignore
 }
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    applyTheme(prefersDark ? "dark" : "light");
  }
})();

// ===========================
// Initialize on load
// ===========================
setupTest();
