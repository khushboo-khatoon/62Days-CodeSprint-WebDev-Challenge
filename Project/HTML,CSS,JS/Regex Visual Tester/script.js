const SAMPLES = {
  email: {
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    text: "Contact us at hello@example.com or support@test.org for help.",
  },
  phone: {
    pattern: "\\+?\\d{1,3}[-.\\s]?\\d{3,4}[-.\\s]?\\d{4}",
    text: "Call +91 98765 43210 or 555-123-4567 for details.",
  },
  url: {
    pattern: "https?://[\\w.-]+\\.[a-z]{2,}[/\\w.-]*",
    text: "Visit https://github.com or http://example.com/page for more.",
  },
  digits: {
    pattern: "\\d+",
    text: "Order #12345 has 99 items and costs 1500 rupees.",
  },
  words: {
    pattern: "\\b\\w+\\b",
    text: "Hello world! Regex makes text matching powerful.",
  },
};

const EXPLAIN = {
  ".": "matches any single character (except newline)",
  "\\d": "matches any digit (0–9)",
  "\\w": "matches a word character (letter, digit, underscore)",
  "\\s": "matches whitespace (space, tab, newline)",
  "+": "one or more of the preceding element",
  "*": "zero or more of the preceding element",
  "?": "zero or one of the preceding element",
  "^": "start of the string (or line with m flag)",
  "$": "end of the string (or line with m flag)",
  "[]": "character class — matches any one character inside",
  "|": "alternation — matches either left or right side",
  "()": "capturing group — stores matched text",
  "\\b": "word boundary",
};

const patternInput = document.getElementById("patternInput");
const testInput = document.getElementById("testInput");
const flagG = document.getElementById("flagG");
const flagI = document.getElementById("flagI");
const flagM = document.getElementById("flagM");
const sampleSelect = document.getElementById("sampleSelect");
const errorMsg = document.getElementById("errorMsg");
const highlightOutput = document.getElementById("highlightOutput");
const groupsList = document.getElementById("groupsList");
const matchCount = document.getElementById("matchCount");
const explanation = document.getElementById("explanation");

function getFlags() {
  let f = "";
  if (flagG.checked) f += "g";
  if (flagI.checked) f += "i";
  if (flagM.checked) f += "m";
  return f;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildExplanation(pattern) {
  if (!pattern) return "Enter a pattern to see what each part means.";

  const parts = [];
  if (flagG.checked) parts.push("Global (g): find all matches, not just the first.");
  if (flagI.checked) parts.push("Case-insensitive (i): uppercase and lowercase letters match equally.");
  if (flagM.checked) parts.push("Multiline (m): ^ and $ match start/end of each line.");

  for (const [key, desc] of Object.entries(EXPLAIN)) {
    if (key.length === 1 && pattern.includes(key)) parts.push(`"${key}" — ${desc}`);
    else if (key.startsWith("\\") && pattern.includes(key)) parts.push(`"${key}" — ${desc}`);
    else if (key === "[]" && /\[/.test(pattern)) parts.push(`[...] — ${desc}`);
    else if (key === "()" && /\(.+\)/.test(pattern)) parts.push(`(...) — ${desc}`);
  }

  if (parts.length === 0) parts.push("This pattern will be tested against your input text character by character.");
  return parts.join(" ");
}

function runTest() {
  const pattern = patternInput.value;
  const text = testInput.value;

  errorMsg.hidden = true;
  errorMsg.textContent = "";

  if (!pattern) {
    highlightOutput.textContent = text || "No matches yet.";
    groupsList.innerHTML = '<li class="empty">No groups yet.</li>';
    matchCount.textContent = "0 matches";
    explanation.textContent = buildExplanation("");
    return;
  }

  let regex;
  try {
    regex = new RegExp(pattern, getFlags());
  } catch (e) {
    errorMsg.hidden = false;
    errorMsg.textContent = `Invalid regex: ${e.message}`;
    highlightOutput.textContent = text;
    groupsList.innerHTML = '<li class="empty">Fix the pattern to see groups.</li>';
    matchCount.textContent = "0 matches";
    explanation.textContent = "The pattern has a syntax error. Check brackets, backslashes, and quantifiers.";
    return;
  }

  const matches = [...text.matchAll(regex)];
  matchCount.textContent = `${matches.length} match${matches.length !== 1 ? "es" : ""}`;

  if (matches.length === 0) {
    highlightOutput.textContent = text || "No matches found.";
    groupsList.innerHTML = '<li class="empty">No capturing groups matched.</li>';
    explanation.textContent = buildExplanation(pattern);
    return;
  }

  let html = "";
  let lastIndex = 0;
  const sorted = matches
    .map((m) => ({ match: m[0], index: m.index }))
    .sort((a, b) => a.index - b.index);

  for (const { match, index } of sorted) {
    if (index < lastIndex) continue;
    html += escapeHtml(text.slice(lastIndex, index));
    html += `<mark>${escapeHtml(match)}</mark>`;
    lastIndex = index + match.length;
  }
  html += escapeHtml(text.slice(lastIndex));
  highlightOutput.innerHTML = html;

  groupsList.innerHTML = matches
    .map((m, i) => {
      const groups = m.slice(1).map((g, gi) =>
        g !== undefined ? `Group ${gi + 1}: "${g}"` : null
      ).filter(Boolean);
      const groupStr = groups.length ? ` — ${groups.join(", ")}` : "";
      return `<li>Match ${i + 1}: "${m[0]}"${groupStr}</li>`;
    })
    .join("");

  explanation.textContent = buildExplanation(pattern);
}

function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

const debouncedRun = debounce(runTest, 150);

[patternInput, testInput, flagG, flagI, flagM].forEach((el) => {
  el.addEventListener("input", debouncedRun);
  el.addEventListener("change", runTest);
});

sampleSelect.addEventListener("change", () => {
  const sample = SAMPLES[sampleSelect.value];
  if (!sample) return;
  patternInput.value = sample.pattern;
  testInput.value = sample.text;
  runTest();
});

testInput.value = SAMPLES.email.text;
patternInput.value = SAMPLES.email.pattern;
runTest();
