import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import contentRoutes from "./routes/content.js";
import leadRoutes from "./routes/leads.js";
import uploadRoutes from "./routes/upload.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(",") || "*",
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/upload", uploadRoutes);

// Centralised error handler (e.g. multer file errors).
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;

// Top-level await (ESM): DB connects before any request is handled.
// On Vercel the module is loaded once per cold start; locally we also start
// the HTTP server so nothing about the dev workflow changes.
await connectDB(process.env.MONGODB_URI).catch((err) => {
  console.error("✗ DB connection failed:", err.message);
  process.exit(1);
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`✓ API running on http://localhost:${PORT}`));
}

export default app;
