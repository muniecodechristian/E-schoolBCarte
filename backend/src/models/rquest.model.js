import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
 {
    applicant: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    requestedRole: {
      type: String,
      enum: ["scanner", "stadiumAdmin"],
      required: true,
      index: true
    },
    resumeUrl: { type: String },
    motivation: { type: String },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
      index: true,
    },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

requestSchema.index({ applicant: 1 }, { unique: true });

export const request = mongoose.model(
  "requestscanner",
  requestSchema
);