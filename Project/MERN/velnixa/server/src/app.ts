import e from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import HomeRoutes from "./routes/testing.routes";
import router from './routes/index';

const app = e();

const allowedOrigins = [
  "https://velnixa.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}));

app.use(e.json());
app.use(cookieParser());

// ✅ YEH SAHI HAI - Folder serve karo
// __dirname = /your-project/dist/ (kyunki aap compiled code se run kar rahe ho)
// path.join(__dirname, '..') = /your-project/ (root folder)
app.use(e.static(path.join(__dirname, '..')));

app.use("/", HomeRoutes);
app.use("/api", router);

export default app;