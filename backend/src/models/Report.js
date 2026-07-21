const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model you created in Day 2
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    reportType: {
      type: String,
      default: "Unknown", // Can be updated later by your OCR/AI service (e.g., Blood, X-Ray)
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Uploaded", "Processing", "Completed", "Failed"],
      default: "Uploaded",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Report", reportSchema);