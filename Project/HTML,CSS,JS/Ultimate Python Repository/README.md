<div align="center">
    
# 🐍 Ultimate Python Repository 📖

### An interactive static website for learning and browsing structured Python and Tkinter programs — with syntax-highlighted code, rendered markdown guides, and a brutalist dark theme.

</div>

<p align="center">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
    <img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white" alt="Markdown">
    <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="MIT License">
</p>

---

## 🔗 Live Site — [GitHub Pages](https://riyahal.github.io/ultimate-python-repository.github.io/)

- **Source Repository** — [github.com/riyahal/Python-Programming-and-Tkinter](https://github.com/riyahal/Python-Programming-and-Tkinter)

---

## ✨ About

**This website aims to be a learning and reference material for beginners and developers who are exploring and utilizing Python. It showcases 200+ well-documented programs and tons of examples across all sub-topics.**

The site serves as a **visual, interactive documentation platform** for the [Python-Programming-and-Tkinter](https://github.com/riyahal/Python-Programming-and-Tkinter) repository. Instead of browsing raw files on GitHub, you get:

- **Syntax-highlighted Python code** rendered directly from the source files
- **Rendered Markdown guides** for conceptual topics
- **Accordion sidebar navigation** with expandable folders
- **Dropdown topic menus** for jumping between subjects
- **Image embedding** for diagrams and screenshots
- **Brutalist dark UI** with scanline animations

All content is pulled live from the repository's file tree — update the repo files and the site stays in sync.

---

## 🎯 Features

| Feature | Description |
|---|---|
| **Live Code Rendering** | Python `.py` files are fetched and displayed with Prism.js syntax highlighting |
| **Markdown Rendering** | `.md` overview files are parsed with `marked` and displayed as styled HTML |
| **Nested Sidebar Navigation** | Accordion-style tree matching the repository's folder structure |
| **Topic Dropdowns** | Quick navigation via hover-reveal menus in the header |
| **URL Hash Routing** | Direct deep-linking to any subtopic or file via `#Topic:SubTopic` |
| **Flat File Flattening** | Single-file folders display inline without unnecessary nesting |
| **Responsive Layout** | Two-column desktop layout collapses to single column on mobile |
| **Brutalist Dark Theme** | Black/dark navy background, neon green accents, scanline overlay animation |

---

## 🛠️ Tech Stack

| Technology | Purpose | Badge |
|---|---|---|
| **HTML5** | Page structure and semantic markup | <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" width="100"> |
| **CSS3** | All styling (brutalist dark theme, layout, responsive design) | <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" width="90"> |
| **JavaScript (Vanilla)** | Core application logic — routing, sidebar, content fetching and rendering | <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" width="110"> |
| **Python** | `generate_manifest.py` — walks the repo and produces `tree_manifest.json` | <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" width="100"> |
| [marked.js](https://marked.js.org/) | Markdown → HTML parsing for `.md` overview files | <img src="https://img.shields.io/badge/marked.js-000000?style=for-the-badge&logo=markdown&logoColor=white" alt="marked.js" width="100"> |
| [Prism.js](https://prismjs.com/) | Python syntax highlighting for `.py` code blocks | <img src="https://img.shields.io/badge/Prism.js-1E2A3A?style=for-the-badge&logo=javascript&logoColor=white" alt="Prism.js" width="100"> |
| **`tree_manifest.json`** | Flat-array file tree used by the frontend to render the sidebar and content | <img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white" alt="JSON" width="80"> |

---

## 🗂️ Project Structure

```
.
├── index.html                # Main entry point
├── style.css                 # All styling (brutalist theme)
├── script.js                 # Core logic: routing, sidebar, content rendering
├── tree_manifest.json        # File tree index (generated)
├── generate_manifest.py      # Script to regenerate tree_manifest.json
├── README.md                 # This file
├── Core Foundations.md       # Topic overview (markdown)
├── Data Structures.md        # Topic overview (markdown)
├── Control Flow.md           # Topic overview (markdown)
├── Error Handling.md         # Topic overview (markdown)
├── Tkinter.md                # Topic overview (markdown)
│
├── Keywords and Identifiers/ # Subtopic folders with .py / .md / .png files
├── Strings/
├── Lists/
├── Tuples/
├── Sets/
├── Dictionaries/
├── If-Else-Elif Statements/
├── For Loop/
├── While Loop/
├── Functions/
├── Try-Except-Finally Statements/
├── Tkinter/
└── ...
```

Each topic folder contains either:
- Single `.py` files (directly rendered with syntax highlighting)
- A `.md` file (rendered as HTML)
- Multiple files in subdirectories (shown as expandable sidebar groups)
- `.png` images (displayed inline, or embedded within markdown)

---

## 🚀 How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/abhisek2004/62Days-CodeSprint-WebDev-Challenge/tree/main/Project/HTML%2CCSS%2CJS/Ultimate%20Python%20Repository.git
cd Ultimate-Python-Repository
```

### 2. Regenerate the File Manifest (Optional)

If you add, remove, or rename files, regenerate the tree index:

```bash
python3 generate_manifest.py
```

This overwrites `tree_manifest.json` so the frontend knows about the new structure.

### 3. Serve the Site Locally

Since the site fetches files via `fetch()`, it **must** be served over HTTP — opening `index.html` directly from the filesystem won't work due to CORS restrictions.

**Option A — Python HTTP server (no install needed):**

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

**Option B — VS Code Live Server:**

Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, right-click `index.html`, and select **Open with Live Server**.

---

## 🧩 How It Works

1. **Manifest Generation** — `generate_manifest.py` walks the repository directory tree and writes a flat array of `{ path, type }` objects to `tree_manifest.json`. Each entry is either `"blob"` (file) or `"tree"` (directory).

2. **Initialization** — On page load, `script.js`:
   - Fetches `tree_manifest.json`
   - Builds the dropdown navigation from `topicsData` (hardcoded map of topic names → subtopics)
   - Listens for URL hash changes

3. **Navigation** — Clicking a topic or subtopic:
   - Sets `window.location.hash` to `TopicName:SubTopicPath`
   - `checkUrlHashRoute()` parses the hash and calls `triggerContentLoad()` or `triggerParentTopicLoad()`
   - The sidebar and main content area are rebuilt via `resolveAndBuildContent()`

4. **Content Rendering** — For each file in the current subtree:
   - `.py` → fetched with `fetch()`, displayed inside a `<pre><code>` block, then highlighted with `Prism.highlightElement()`
   - `.md` → fetched and parsed with `marked.parse()`, rendered as HTML
   - `.png` → displayed as an `<img>` tag
   - Folders → recursively expanded with accordion controls

5. **Navigation State** — The browser's hashchange event keeps the URL in sync, enabling bookmarking and back/forward navigation.

---

## ✏️ Adding New Content

1. **Add a new subtopic folder** (e.g., `NewTopic/SubFolder/`) with your `.py`, `.md`, or `.png` files.
2. **Register the subtopic** in `script.js` under the `topicsData` object, specifying the parent topic and a `preferredOrder` array for sidebar sorting.
3. **Regenerate the manifest:**

```bash
python3 generate_manifest.py
```

4. **Update the topic overview `.md` file** if needed.
5. **Serve and verify** — the new content appears in the sidebar and is rendered on click.

---

## ⚖️ License

This project is open source under the [MIT License](LICENSE).

---

<div align="center">
    Made with 🐍 and 💜
</div>
