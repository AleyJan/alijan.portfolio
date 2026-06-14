import mongoose from "mongoose";

// A submission from the public contact form.
const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    projectType: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Lead", leadSchema);
