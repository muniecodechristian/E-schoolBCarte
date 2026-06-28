import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  match: { type: mongoose.Schema.Types.ObjectId, ref: "Match" },

  type: {
    type: String,
    enum: [
      "ticket_available",
      "ticket_sold_out",
      "price_change",
      "reminder",
      "promotion",
    ],
    required: true,
  },

  message: { type: String, required: true },

  status: {
    type: String,
    enum: ["pending", "sent", "failed"],
    default: "pending",
  },

  deliveryMethod: {
    type: String,
    enum: ["email", "sms", "push_notification"],
    default: "push_notification",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Expire après 30 jours par défaut
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },

  sentAt: { type: Date },
  meta: { type: Object },
});

// Index de recherche
NotificationSchema.index({ to: 1, match: 1 });

// TTL Index : MongoDB supprimera automatiquement le document
NotificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);

export default Notification;