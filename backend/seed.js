import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Admin from "./models/Admin.js";
import Content from "./models/Content.js";
import { defaultContent } from "./defaultContent.js";

async function run() {
  await connectDB(process.env.MONGODB_URI);

  const email = (
    process.env.ADMIN_EMAIL || "alijan@portfolio.com"
  ).toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "alijan.dev";

  const existing = await Admin.findOne({ email });
  if (existing) {
    existing.passwordHash = await Admin.hashPassword(password);
    await existing.save();
    console.log(`✓ Admin password reset for ${email}`);
  } else {
    await Admin.create({
      email,
      passwordHash: await Admin.hashPassword(password),
    });
    console.log(`✓ Admin created: ${email}`);
  }

  const content = await Content.findOne({ key: "main" });
  if (!content) {
    await Content.create({ key: "main", data: defaultContent });
    console.log("✓ Content seeded");
  } else {
    console.log("• Content already exists (left untouched)");
  }

  console.log(`\nLogin with:\n  email:    ${email}\n  password: ${password}\n`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("✗ Seed failed:", err.message);
  process.exit(1);
});
