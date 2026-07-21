# Interview Slot Auction & Booking

Educational MERN project for issue **#251**.

## Features
- JWT auth with mentor/mentee roles
- Slot listing, booking, and auction bids
- Double-booking prevention with Mongo transactions
- Waitlist management
- .ics calendar export
- Conflict resolver + booking status history

## Run

```bash
cd backend && cp .env.example .env && npm install && npm run dev
cd frontend && npm install && npm run dev
```

## Tech Stack
MongoDB · Express · React (Vite) · Node.js
