# 📝 Offline-First Notes App

A beginner-friendly **Progressive Web App** for creating, editing, and searching notes — fully offline with **localStorage**, **service worker**, and **installable PWA** support.

---

## ✨ Features

- **Create, edit, delete notes** with auto-save (300ms debounce)
- **Offline support** via service worker (cache-first strategy)
- **Local persistence** using `localStorage`
- **Installable PWA** with `manifest.json` (Add to Home Screen)
- **Search & filter** notes by title or content
- **Online/offline status** indicator
- **Responsive** sidebar + editor layout

---

## 🚀 How to Run

> **Note:** Service workers require a local server (not `file://`).

```bash
# From this folder
npx serve .
```

Then open `http://localhost:3000` in Chrome, Firefox, or Edge.

1. Create notes with **+ New**
2. Edit — auto-saves locally
3. Search notes in the sidebar
4. Install via browser menu → **Install app** / **Add to Home Screen**
5. Turn off Wi-Fi — app still works offline

---

## 📁 Project Structure

```text
Offline-First Notes App/
├── index.html      # App layout
├── style.css       # UI styles
├── script.js       # Notes CRUD, search, auto-save
├── sw.js           # Service worker (cache-first)
├── manifest.json   # PWA manifest
├── icon.svg        # App icon
└── README.md       # Documentation
```

---

## 🛠 Tech Stack

- HTML5
- CSS3 (responsive grid)
- Vanilla JavaScript
- Service Worker + Web App Manifest (PWA)
- localStorage

---

## 📄 License

Educational project for [62Days-CodeSprint-WebDev-Challenge](https://github.com/abhisek2004/62Days-CodeSprint-WebDev-Challenge).
