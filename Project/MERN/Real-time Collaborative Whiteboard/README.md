# Real-time Collaborative Whiteboard

A multi-user drawing board powered by Socket.io with shared rooms, live cursors, drawing tools, and PNG export.

## Features

- Multi-user real-time drawing with HTML5 Canvas
- Create / join shared rooms
- Live cursor sharing
- Pen, color picker, eraser, and clear board
- Export whiteboard as PNG
- Responsive React UI

## Tech Stack

- React + Vite + Tailwind CSS
- Node.js + Express
- Socket.io
- HTML5 Canvas API

## Folder Structure

```text
Real-time Collaborative Whiteboard/
├── backend/
│   └── server.js
├── frontend/
│   └── src/
└── README.md
```

## Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

Runs on `http://localhost:5001`.

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Runs on `http://localhost:5173`.

Open two browser windows, create a room in one, join with the same code in the other, and draw together.

## Environment

```env
VITE_API_URL=http://localhost:5001
```

Optional backend:

```env
PORT=5001
CLIENT_URL=http://localhost:5173
```

## Issue

Resolves #181
