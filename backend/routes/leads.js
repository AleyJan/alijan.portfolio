import { Router } from "express";
import Lead from "../models/Lead.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// POST /api/leads — public; the contact form submits here.
router.post("/", async (req, res) => {
  const { name, email, projectType, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email and message are required" });
  }
  const lead = await Lead.create({ name, email, projectType, message });
  res.status(201).json({ id: lead._id });
});

// GET /api/leads — admin only; list submissions, newest first.
router.get("/", requireAuth, async (_req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

// PATCH /api/leads/:id — admin only; mark read/unread.
router.patch("/:id", requireAuth, async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { read: !!req.body.read },
    { new: true },
  );
  if (!lead) return res.status(404).json({ message: "Lead not found" });
  res.json(lead);
});

// DELETE /api/leads/:id — admin only.
router.delete("/:id", requireAuth, async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
