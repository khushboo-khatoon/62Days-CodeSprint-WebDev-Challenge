# Layout Lens — CSS Layout Debugger Overlay

A DevTools-lite overlay for learning **box model**, **flex**, and **grid** using plain HTML, CSS, and JavaScript.

## Features

- Box-model outline overlay on demo pages
- Flex / grid inspector with computed properties
- Spacing rulers (padding / margin highlights)
- Breakpoint simulator (375 → 1280)
- Annotated screenshot export via `html2canvas`
- Demo samples + empty helper state
- Responsive UI

## How to Run

Open `index.html` in a modern browser (network needed once for fonts + html2canvas CDN).

```bash
npx serve .
```

## Structure

```text
CSS Layout Debugger Overlay/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Tech Stack

HTML · CSS · JavaScript · html2canvas (CDN)
