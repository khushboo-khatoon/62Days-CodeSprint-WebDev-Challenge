const STORAGE_KEY = "offline-notes-data";
const ACTIVE_KEY = "offline-notes-active";

let notes = [];
let activeId = null;
let saveTimer = null;

const notesList = document.getElementById("notesList");
const searchInput = document.getElementById("searchInput");
const noteTitle = document.getElementById("noteTitle");
const noteBody = document.getElementById("noteBody");
const newNoteBtn = document.getElementById("newNoteBtn");
const deleteBtn = document.getElementById("deleteBtn");
const statusBadge = document.getElementById("statusBadge");
const editorHint = document.getElementById("editorHint");

function loadNotes() {
  try {
    notes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    activeId = localStorage.getItem(ACTIVE_KEY) || null;
  } catch {
    notes = [];
    activeId = null;
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  if (activeId) localStorage.setItem(ACTIVE_KEY, activeId);
  else localStorage.removeItem(ACTIVE_KEY);
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function getFilteredNotes() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return notes;
  return notes.filter(
    (n) =>
      n.title.toLowerCase().includes(query) ||
      n.body.toLowerCase().includes(query)
  );
}

function renderList() {
  const filtered = getFilteredNotes();

  if (filtered.length === 0) {
    notesList.innerHTML = '<li class="notes-empty">No notes found.</li>';
    return;
  }

  notesList.innerHTML = filtered
    .map(
      (n) => `
    <li data-id="${n.id}" class="${n.id === activeId ? "active" : ""}" role="option" aria-selected="${n.id === activeId}">
      <div class="note-item-title">${escapeHtml(n.title || "Untitled")}</div>
      <div class="note-item-preview">${escapeHtml(n.body.slice(0, 60) || "Empty note")}</div>
    </li>`
    )
    .join("");

  notesList.querySelectorAll("li[data-id]").forEach((li) => {
    li.addEventListener("click", () => selectNote(li.dataset.id));
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function selectNote(id) {
  activeId = id;
  const note = notes.find((n) => n.id === id);
  if (!note) return;

  noteTitle.value = note.title;
  noteBody.value = note.body;
  noteTitle.disabled = false;
  noteBody.disabled = false;
  deleteBtn.disabled = false;
  editorHint.textContent = "Auto-saved locally · Works offline";
  saveNotes();
  renderList();
}

function createNote() {
  const note = {
    id: generateId(),
    title: "Untitled",
    body: "",
    updatedAt: Date.now(),
  };
  notes.unshift(note);
  saveNotes();
  selectNote(note.id);
  noteTitle.focus();
  noteTitle.select();
}

function deleteNote() {
  if (!activeId || !confirm("Delete this note?")) return;
  notes = notes.filter((n) => n.id !== activeId);
  activeId = notes.length ? notes[0].id : null;
  saveNotes();

  if (activeId) selectNote(activeId);
  else clearEditor();

  renderList();
}

function clearEditor() {
  noteTitle.value = "";
  noteBody.value = "";
  noteTitle.disabled = true;
  noteBody.disabled = true;
  deleteBtn.disabled = true;
  editorHint.textContent = "Select a note or create a new one.";
}

function autoSave() {
  if (!activeId) return;
  const note = notes.find((n) => n.id === activeId);
  if (!note) return;

  note.title = noteTitle.value || "Untitled";
  note.body = noteBody.value;
  note.updatedAt = Date.now();
  saveNotes();
  renderList();
}

function debouncedSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(autoSave, 300);
}

function updateStatus() {
  const offline = !navigator.onLine;
  statusBadge.textContent = offline ? "Offline" : "Online";
  statusBadge.classList.toggle("offline", offline);
}

newNoteBtn.addEventListener("click", createNote);
deleteBtn.addEventListener("click", deleteNote);
noteTitle.addEventListener("input", debouncedSave);
noteBody.addEventListener("input", debouncedSave);
searchInput.addEventListener("input", renderList);
window.addEventListener("online", updateStatus);
window.addEventListener("offline", updateStatus);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

loadNotes();
updateStatus();
renderList();

if (activeId && notes.find((n) => n.id === activeId)) {
  selectNote(activeId);
} else if (notes.length) {
  selectNote(notes[0].id);
}
