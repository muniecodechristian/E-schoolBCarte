import mongoose from "mongoose";

// Schéma pour un match favori
const favoriteMatchSchema = new mongoose.Schema({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match", // Référence au match dans ta collection Match
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

// Schéma de la wishlist (favoris) par utilisateur
const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Référence à l'utilisateur
    required: true,
    unique: true, // Chaque utilisateur a une seule wishlist
  },
  matches: [favoriteMatchSchema], // Tableau de matches favoris
});

// Export du modèle
const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;