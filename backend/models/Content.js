import mongoose from "mongoose";

// The entire editable portfolio content is stored as one singleton document
// (key: "main"). Using a flexible Mixed field keeps it in lock-step with the
// frontend's content shape without a rigid schema per section.
const contentSchema = new mongoose.Schema(
  {
    key: { type: String, default: "main", unique: true },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, minimize: false },
);

export default mongoose.model("Content", contentSchema);
