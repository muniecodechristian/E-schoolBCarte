import mongoose from "mongoose";
import crypto from "crypto";

const ticketSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // null si non acheté
    },
    seatNumber: {
      type: String,
      default: null, // ex: A1, B5
    },
    category: {
      type: String,
      enum: ["VIP", "Standard", "Premium", "Economique"],
      default: "Standard",
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["available", "reserved", "sold", "cancelled","used"],
      default: "available",
    },
    qrCode: {
      type: String,
      unique: true,
      index: true,
    },
    qrCodeLink: {
      type: String, // URL ou path vers QR code généré
      default: null,
    },
    purchaseDate: {
      type: Date,
    },
    expirationDate: {
      type: Date, // pour tickets temporaires ou réservés
    },
  },
  { timestamps: true }
);

// Génération automatique d'un QR code unique à la création
ticketSchema.pre("save", function (next) {
  if (!this.qrCode) {
    // Génère un token unique pour QR code
    this.qrCode = crypto.randomBytes(16).toString("hex");

    // Génère un lien pour le QR code (à adapter à ton front ou service QR)
    this.qrCodeLink = `process.env.FRONT_URL${this.qrCode}`;
  }
  next();
});

// Méthode pour vérifier si le ticket est valide
ticketSchema.methods.isValid = function () {
  return this.status === "sold" && (!this.expirationDate || this.expirationDate > new Date());
};

// Virtual pour prix final après remise
ticketSchema.virtual("finalPrice").get(function () {
  return this.price - (this.price * (this.discount || 0)) / 100;
});

export const Ticket = mongoose.model("Ticket", ticketSchema);