import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

adminSchema.statics.hashPassword = function (plain) {
  return bcrypt.hash(plain, 10);
};

adminSchema.methods.verifyPassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

export default mongoose.model("Admin", adminSchema);
