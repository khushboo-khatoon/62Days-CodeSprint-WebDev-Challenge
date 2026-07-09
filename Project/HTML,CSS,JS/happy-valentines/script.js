window.addEventListener("load", () => {
  const loader = document.getElementById("heart-loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("is-hidden");
      setTimeout(() => loader.remove(), 800);
    }, 1800);
  }

  document.querySelectorAll(".reveal").forEach(el => {
    el.classList.add("show");
  });
});

const heartsContainer = document.querySelector('.hearts');

function createHeart() {
  if (!heartsContainer) return;
  const heart = document.createElement('div');
  heart.classList.add('heart');

  const size = Math.random() * 8 + 6; // different sizes
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;

  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = '110vh';

  const duration = Math.random() * 15 + 15; // slow float
  heart.style.animationDuration = `${duration}s`;

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

/* create hearts softly over time */
if (heartsContainer) {
  setInterval(createHeart, 1800); // adjust for more/less hearts
}


// shared unlock handler (per card)
document.querySelectorAll(".accept-box").forEach(trigger => {
  const area = trigger.closest(".card-right")?.querySelector(".unlock-area");
  if (!area) return;

  trigger.addEventListener("click", () => {
    trigger.innerHTML = "<p>congrats, you unlocked-</p>";
    trigger.classList.add("accepted");
    trigger.style.pointerEvents = "none";
    area.style.display = "block";
  });
});

const scrollTopBtn = document.getElementById("scrollTopBtn");
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function parseLocalDateTime(value) {
  if (!value) return null;
  const [datePart, timePart = "00:00"] = value.trim().split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day, hour || 0, minute || 0, 0, 0);
}

function formatUnlockDate(date) {
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatCountdown(ms) {
  if (ms <= 0) return "Unlocked";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  return parts.join(" ");
}

function ensureLockOverlay(section, unlockDate) {
  let overlay = section.querySelector(".lock-overlay");
  if (!overlay) {
    const titleText = section.getAttribute("data-day-title") || "Locked for now";
    const lockImg = section.getAttribute("data-lock-img");
    const imgHtml = lockImg ? `<div class="lock-date-img-wrap"><img class="lock-date-img" src="${lockImg}" alt="${titleText}"></div>` : "";
    overlay = document.createElement("div");
    overlay.className = "lock-overlay";
    overlay.innerHTML = `
      <div class="lock-card">
        <div class="lock-title">${titleText}</div>
        <div class="lock-date">${imgHtml}Unlocks ${formatUnlockDate(unlockDate)}</div>
        <div class="lock-countdown" data-countdown></div>
      </div>
    `;
    section.appendChild(overlay);
  }
  return overlay;
}

function updateLocks() {
  const now = new Date();
  document.querySelectorAll("[data-unlock]").forEach((section) => {
    const unlockValue = section.getAttribute("data-unlock");
    const unlockDate = parseLocalDateTime(unlockValue);
    if (!unlockDate) return;

    if (now >= unlockDate) {
      section.classList.remove("locked");
      const overlay = section.querySelector(".lock-overlay");
      if (overlay) overlay.remove();
      section.removeAttribute("aria-disabled");
      return;
    }

    section.classList.add("locked");
    section.setAttribute("aria-disabled", "true");
    const overlay = ensureLockOverlay(section, unlockDate);
    const countdownEl = overlay.querySelector("[data-countdown]");
    if (countdownEl) {
      countdownEl.textContent = formatCountdown(unlockDate - now);
    }
  });
}

updateLocks();
setInterval(updateLocks, 30000);
