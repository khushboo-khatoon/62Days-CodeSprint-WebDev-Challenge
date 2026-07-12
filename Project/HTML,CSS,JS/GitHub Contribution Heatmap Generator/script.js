const GITHUB_API = "https://api.github.com/users";
const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const state = {
  username: "",
  user: null,
  years: [],
  selectedPeriod: "last",
  contributions: [],
  totalContributions: 0,
};

const elements = {
  form: document.getElementById("search-form"),
  usernameInput: document.getElementById("username-input"),
  searchBtn: document.getElementById("search-btn"),
  btnLabel: document.querySelector(".btn-label"),
  btnSpinner: document.querySelector(".btn-spinner"),
  statusMessage: document.getElementById("status-message"),
  loadingState: document.getElementById("loading-state"),
  results: document.getElementById("results"),
  profileAvatar: document.getElementById("profile-avatar"),
  profileName: document.getElementById("profile-name"),
  profileLink: document.getElementById("profile-link"),
  yearSelect: document.getElementById("year-select"),
  statTotal: document.getElementById("stat-total"),
  statActiveDays: document.getElementById("stat-active-days"),
  statLongestStreak: document.getElementById("stat-longest-streak"),
  statCurrentStreak: document.getElementById("stat-current-streak"),
  heatmapTitle: document.getElementById("heatmap-title"),
  heatmapSubtitle: document.getElementById("heatmap-subtitle"),
  monthLabels: document.getElementById("month-labels"),
  heatmapGrid: document.getElementById("heatmap-grid"),
  tooltip: document.getElementById("tooltip"),
};

function getContributionLevel(count) {
  if (count <= 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

function formatDateISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDisplayDate(dateStr) {
  return parseDate(dateStr).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function showStatus(message, type = "error") {
  elements.statusMessage.textContent = message;
  elements.statusMessage.className = `status-message ${type}`;
  elements.statusMessage.classList.remove("hidden");
}

function hideStatus() {
  elements.statusMessage.classList.add("hidden");
}

function setLoading(isLoading) {
  elements.searchBtn.disabled = isLoading;
  elements.btnLabel.classList.toggle("hidden", isLoading);
  elements.btnSpinner.classList.toggle("hidden", !isLoading);
  elements.loadingState.classList.toggle("hidden", !isLoading);
}

function validateUsername(username) {
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(username);
}

async function fetchGitHubUser(username) {
  const response = await fetch(`${GITHUB_API}/${encodeURIComponent(username)}`);

  if (response.status === 404) {
    throw new Error(`User "@${username}" was not found on GitHub.`);
  }

  if (!response.ok) {
    throw new Error("Unable to reach GitHub API. Please try again later.");
  }

  return response.json();
}

async function fetchContributions(username, period = "last") {
  const url = `${CONTRIBUTIONS_API}/${encodeURIComponent(username)}?y=${period}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch contribution data. Please try again later.");
  }

  return response.json();
}

async function fetchAvailableYears(username) {
  const response = await fetch(`${CONTRIBUTIONS_API}/${encodeURIComponent(username)}`);

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  return Array.isArray(data.years) ? data.years.sort((a, b) => b - a) : [];
}

function buildWeeks(contributions) {
  if (!contributions.length) {
    return [];
  }

  const byDate = new Map(
    contributions.map((entry) => [
      entry.date,
      {
        ...entry,
        level: getContributionLevel(entry.count),
      },
    ])
  );

  const firstDate = parseDate(contributions[0].date);
  const lastDate = parseDate(contributions[contributions.length - 1].date);

  const gridStart = new Date(firstDate);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());

  const weeks = [];
  const cursor = new Date(gridStart);

  while (cursor <= lastDate || weeks.length === 0) {
    const week = [];

    for (let day = 0; day < 7; day += 1) {
      const dateStr = formatDateISO(cursor);
      const inRange = cursor >= firstDate && cursor <= lastDate;
      const entry = byDate.get(dateStr);

      week.push({
        date: dateStr,
        count: entry?.count ?? 0,
        level: entry ? getContributionLevel(entry.count) : 0,
        inRange,
      });

      cursor.setDate(cursor.getDate() + 1);
    }

    weeks.push(week);

    if (cursor > lastDate && weeks.length >= 1) {
      break;
    }
  }

  return weeks;
}

function computeStats(contributions) {
  const activeDays = contributions.filter((day) => day.count > 0).length;
  const total = contributions.reduce((sum, day) => sum + day.count, 0);

  let longestStreak = 0;
  let currentRun = 0;

  contributions.forEach((day) => {
    if (day.count > 0) {
      currentRun += 1;
      longestStreak = Math.max(longestStreak, currentRun);
    } else {
      currentRun = 0;
    }
  });

  let currentStreak = 0;
  for (let i = contributions.length - 1; i >= 0; i -= 1) {
    if (contributions[i].count > 0) {
      currentStreak += 1;
    } else {
      break;
    }
  }

  return { total, activeDays, longestStreak, currentStreak };
}

function getMonthLabels(weeks) {
  const labels = [];
  let lastMonth = -1;

  weeks.forEach((week, index) => {
    const firstInRange = week.find((day) => day.inRange);
    if (!firstInRange) {
      labels.push({ text: "", width: 14 });
      return;
    }

    const month = parseDate(firstInRange.date).getMonth();
    if (month !== lastMonth) {
      labels.push({ text: MONTHS[month], width: 14 });
      lastMonth = month;
    } else {
      labels.push({ text: "", width: 14 });
    }
  });

  return labels;
}

function renderMonthLabels(weeks) {
  const labels = getMonthLabels(weeks);
  elements.monthLabels.innerHTML = "";

  labels.forEach((label) => {
    const span = document.createElement("span");
    span.className = "month-label";
    span.style.width = `${label.width}px`;
    span.textContent = label.text;
    elements.monthLabels.appendChild(span);
  });
}

function showTooltip(event, count, date) {
  const contributionLabel = count === 1 ? "contribution" : "contributions";
  elements.tooltip.textContent = `${count} ${contributionLabel} on ${formatDisplayDate(date)}`;
  elements.tooltip.classList.remove("hidden");

  const offset = 12;
  let left = event.clientX + offset;
  let top = event.clientY + offset;

  const rect = elements.tooltip.getBoundingClientRect();
  if (left + rect.width > window.innerWidth - 8) {
    left = event.clientX - rect.width - offset;
  }
  if (top + rect.height > window.innerHeight - 8) {
    top = event.clientY - rect.height - offset;
  }

  elements.tooltip.style.left = `${left}px`;
  elements.tooltip.style.top = `${top}px`;
}

function hideTooltip() {
  elements.tooltip.classList.add("hidden");
}

function renderHeatmap(contributions) {
  const weeks = buildWeeks(contributions);
  elements.heatmapGrid.innerHTML = "";
  hideTooltip();

  if (!weeks.length) {
    elements.heatmapGrid.innerHTML = "<p>No contribution data available for this period.</p>";
    return;
  }

  renderMonthLabels(weeks);

  weeks.forEach((week) => {
    const column = document.createElement("div");
    column.className = "week-column";

    week.forEach((day) => {
      const cell = document.createElement("span");
      cell.className = `cell level-${day.level} ${day.inRange ? "in-range" : "out-of-range"}`;
      cell.tabIndex = day.inRange ? 0 : -1;
      cell.setAttribute("role", "gridcell");
      cell.setAttribute("aria-label", `${day.count} contributions on ${formatDisplayDate(day.date)}`);

      if (day.inRange) {
        cell.addEventListener("mouseenter", (event) => showTooltip(event, day.count, day.date));
        cell.addEventListener("mousemove", (event) => showTooltip(event, day.count, day.date));
        cell.addEventListener("mouseleave", hideTooltip);
        cell.addEventListener("focus", (event) => showTooltip(event, day.count, day.date));
        cell.addEventListener("blur", hideTooltip);
      }

      column.appendChild(cell);
    });

    elements.heatmapGrid.appendChild(column);
  });
}

function renderStats(contributions, totalFromApi) {
  const stats = computeStats(contributions);
  const total = typeof totalFromApi === "number" ? totalFromApi : stats.total;

  elements.statTotal.textContent = total.toLocaleString();
  elements.statActiveDays.textContent = stats.activeDays.toLocaleString();
  elements.statLongestStreak.textContent = stats.longestStreak.toLocaleString();
  elements.statCurrentStreak.textContent = stats.currentStreak.toLocaleString();
}

function populateYearSelect(years) {
  elements.yearSelect.innerHTML = "";

  const lastOption = document.createElement("option");
  lastOption.value = "last";
  lastOption.textContent = "Last 12 months";
  elements.yearSelect.appendChild(lastOption);

  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = String(year);
    elements.yearSelect.appendChild(option);
  });

  elements.yearSelect.value = state.selectedPeriod;
}

function getTotalFromResponse(data, period) {
  if (!data.total) {
    return null;
  }

  if (period === "last") {
    return data.total.lastYear ?? data.total["lastYear"] ?? null;
  }

  return data.total[period] ?? data.total[String(period)] ?? null;
}

function updateHeatmapLabels(period) {
  if (period === "last") {
    elements.heatmapTitle.textContent = "Contribution Activity";
    elements.heatmapSubtitle.textContent = "Contributions over the last 12 months";
    return;
  }

  elements.heatmapTitle.textContent = `Contributions in ${period}`;
  elements.heatmapSubtitle.textContent = `Calendar view for the ${period} contribution year`;
}

async function loadContributions(period) {
  state.selectedPeriod = period;
  updateHeatmapLabels(period);

  const data = await fetchContributions(state.username, period);
  state.contributions = data.contributions ?? [];
  state.totalContributions = getTotalFromResponse(data, period);

  renderStats(state.contributions, state.totalContributions);
  renderHeatmap(state.contributions);
}

function renderProfile(user) {
  elements.profileAvatar.src = user.avatar_url;
  elements.profileAvatar.alt = `${user.login}'s avatar`;
  elements.profileName.textContent = user.name || user.login;
  elements.profileLink.textContent = `@${user.login}`;
  elements.profileLink.href = user.html_url;
}

async function handleSearch(username) {
  const trimmed = username.trim();

  if (!trimmed) {
    showStatus("Please enter a GitHub username.");
    return;
  }

  if (!validateUsername(trimmed)) {
    showStatus("Please enter a valid GitHub username (letters, numbers, and hyphens only).");
    return;
  }

  hideStatus();
  elements.results.classList.add("hidden");
  setLoading(true);

  try {
    const [user, years] = await Promise.all([
      fetchGitHubUser(trimmed),
      fetchAvailableYears(trimmed),
    ]);

    state.username = trimmed;
    state.user = user;
    state.years = years;

    renderProfile(user);
    populateYearSelect(years);
    await loadContributions("last");

    elements.results.classList.remove("hidden");
  } catch (error) {
    showStatus(error.message || "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch(elements.usernameInput.value);
});

elements.yearSelect.addEventListener("change", async () => {
  if (!state.username) {
    return;
  }

  try {
    setLoading(true);
    await loadContributions(elements.yearSelect.value);
  } catch (error) {
    showStatus(error.message || "Unable to load contributions for the selected period.");
  } finally {
    setLoading(false);
  }
});

document.querySelectorAll(".link-btn[data-username]").forEach((button) => {
  button.addEventListener("click", () => {
    const username = button.dataset.username;
    elements.usernameInput.value = username;
    handleSearch(username);
  });
});

window.addEventListener("scroll", hideTooltip, { passive: true });
window.addEventListener("resize", hideTooltip);
