# Collaborative Markdown Docs (Notion-lite)

Educational MERN project for issue **#247**.

## Features
- JWT auth, workspaces, nested pages
- Realtime Markdown via Socket.io presence/cursors
- Share links with view/edit roles
- MongoDB version history

## Run

```bash
cd backend && cp .env.example .env && npm install && npm run dev
cd frontend && npm install && npm run dev
```

## Tech Stack
MongoDB · Express · React (Vite) · Node.js

Also uses **Socket.io**.
