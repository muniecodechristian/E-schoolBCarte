import mongoose from "mongoose";

const ticketHoldSchema = new mongoose.Schema(
  {
    // utilisateur ayant réservé temporairement
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // match concerné
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "matche",
      required: true,
      index: true,
    },

    // quantités réservées
    tickets: {
      vip: {
        type: Number,
        default: 0,
        min: 0,
      },

      premium: {
        type: Number,
        default: 0,
        min: 0,
      },

      standard: {
        type: Number,
        default: 0,
        min: 0,
      },

      economique: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    // prix total calculé au moment de la réservation
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // état de la réservation
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "expired",
        "cancelled",
      ],
      default: "pending",
    },

    // expiration automatique
    expiresAt: {
      type: Date,
      required: true,
      default: () =>
        new Date(Date.now() + 5 * 60 * 1000), // 5 min
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Un utilisateur ne peut avoir
 * qu'une réservation active par match.
 */
ticketHoldSchema.index(
  {
    user: 1,
    match: 1,
    status: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      status: "pending",
    },
  }
);

export default mongoose.model(
  "TicketHold",
  ticketHoldSchema
);