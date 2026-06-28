# Setup Guide

## Clone Repository

```bash
git clone https://github.com/abhisek2004/62Days-CodeSprint-WebDev-Challenge/Project/MERN/velnixa.git
cd server
```

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create `.env`

```env
PORT=3000

MONGO_URI=

JWT_SECRET=

USER_EMAIL=

GMAIL_APP_PASSWORD=
```

## Development

```bash
npm run dev
```

## Production

```bash
npm run build
npm start
```

---

# Available Scripts

## Development

```bash
npm run dev
```

Starts development server using nodemon.

## Build

```bash
npm run build
```

Compiles TypeScript code.

## Production

```bash
npm start
```

Runs compiled application.

---

# CORS Configuration

Allowed Origins:

```txt
https://velnixa.vercel.app
http://localhost:5173
```