import { Router } from "express";
import Content from "../models/Content.js";
import { requireAuth } from "../middleware/auth.js";
import { defaultContent } from "../defaultContent.js";

const router = Router();

async function getOrCreate() {
  let doc = await Content.findOne({ key: "main" });
  if (!doc) {
    doc = await Content.create({ key: "main", data: defaultContent });
  }
  return doc;
}

// GET /api/content — public; the portfolio reads this to render.
router.get("/", async (_req, res) => {
  const doc = await getOrCreate();
  res.json(doc.data);
});

// PUT /api/content — admin only; replaces the editable content.
router.put("/", requireAuth, async (req, res) => {
  const data = req.body;
  if (!data || typeof data !== "object") {
    return res.status(400).json({ message: "Invalid content payload" });
  }
  const doc = await getOrCreate();
  doc.data = data;
  doc.markModified("data");
  await doc.save();
  res.json(doc.data);
});

export default router;
