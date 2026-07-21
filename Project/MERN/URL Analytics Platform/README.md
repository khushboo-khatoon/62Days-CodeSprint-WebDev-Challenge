# URL Analytics Platform (Bitly Pro style)

Educational MERN project for issue **#245**.

## Features
- JWT auth and short-link CRUD
- Click tracking with device / referrer / geo fallback
- MongoDB aggregations for analytics charts
- UTM builder and QR code generation
- API keys with rate limiting

## Run

```bash
# Terminal 1 — MongoDB must be running
cd backend
cp .env.example .env
npm install
npm run dev

# Terminal 2
cd frontend
npm install
npm run dev
```

Backend: http://localhost:5000 · Frontend: http://localhost:5173

## Structure

```text
URL Analytics Platform/
├── backend/
└── frontend/
```

## Tech Stack

MongoDB · Express · React (Vite) · Node.js

