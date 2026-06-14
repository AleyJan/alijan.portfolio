import { Router } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// POST /api/auth/login — exchange email + password for a JWT.
router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const admin = await Admin.findOne({ email: String(email).toLowerCase() });
  if (!admin || !(await admin.verifyPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign(
    { sub: admin._id.toString(), email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.json({ token, admin: { email: admin.email } });
});

// GET /api/auth/me — confirm the current token is valid (used on dashboard load).
router.get("/me", requireAuth, (req, res) => {
  res.json({ admin: req.admin });
});

export default router;
