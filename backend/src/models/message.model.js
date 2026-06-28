import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    senderRole: {
      type: String,
      enum: ["superAdmin", "stadiumAdmin", "scanner"],
      required: true,
    },

    // 🎯 Type de destinataire
    recipientType: {
      type: String,
      enum: ["all", "role", "specific"],
      required: true,
    },

    // Si recipientType = "role"
    targetRole: {
      type: String,
      enum: ["director", "teacher", "staff", "student"],
      default: null,
    },

    // Si recipientType = "specific"
    recipients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["low", "normal", "high", "urgent"],
      default: "normal",
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    attachments: [
      {
        fileUrl: String,
        fileName: String,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);