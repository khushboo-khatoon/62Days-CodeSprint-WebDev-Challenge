# GitHub Contribution Heatmap Generator

A clean, responsive web app that fetches public GitHub contribution data for any username and renders a **GitHub-style contribution calendar** with activity stats.

Built with pure **HTML**, **CSS**, and **JavaScript** — no build step required.

---

## Features

- **Username search** — enter any public GitHub username and generate their heatmap
- **GitHub-style calendar UI** — week columns, day rows, month labels, and color intensity levels
- **Contribution stats** — total contributions, active days, longest streak, and current streak
- **Period selector** — view the last 12 months or switch to a specific year
- **Loading & error states** — clear feedback for invalid usernames, network errors, and API failures
- **Interactive tooltips** — hover or focus a cell to see the exact date and contribution count
- **Responsive layout** — works on desktop, tablet, and mobile

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Structure | HTML5 |
| Styling | CSS3 (GitHub-inspired dark theme) |
| Logic | Vanilla JavaScript (ES6+) |
| Profile data | [GitHub REST API](https://docs.github.com/en/rest/users/users) |
| Contribution data | [GitHub Contributions API](https://github.com/grubersjoe/github-contributions-api) (public) |

---

## Folder Structure

```
GitHub Contribution Heatmap Generator/
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## How to Run

This is a static front-end project — no installation or build steps required.

1. Clone or download this repository
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari)
3. Enter a GitHub username and click **Generate Heatmap**

> **Note:** An internet connection is required to fetch data from the GitHub API and the public contributions API.

---

## How It Works

1. The app validates the entered username and fetches the user's public profile from the GitHub REST API
2. Contribution calendar data is fetched from a public contributions API (same data source used by many GitHub profile widgets)
3. Daily entries are arranged into a Sunday-start week grid matching GitHub's layout
4. Color intensity is calculated from contribution count (0 → 4 levels)
5. Stats (total, active days, streaks) are computed from the returned daily data

---

## API Notes

- Only **public** GitHub activity is available — private contributions are not included
- The GitHub REST API has rate limits for unauthenticated requests (~60/hour per IP)
- If requests fail due to rate limiting, wait a few minutes and try again

---

## SSoC'26 Contribution

Submitted as part of the **62Days-CodeSprint-WebDev-Challenge** under `Project/HTML,CSS,JS/`.
