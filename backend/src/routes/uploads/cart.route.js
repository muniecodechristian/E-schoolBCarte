// routes/cart.route.js
import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

// Toutes les routes du panier nécessitent que l'utilisateur soit authentifié
router.use(protectRoute);

// Récupérer le panier
router.get("/", getCart);

// Ajouter un produit au panier
router.post("/add", addToCart);

// Mettre à jour la quantité d'un produit
router.put("/update", updateCartItem);

// Supprimer un produit du panier
router.delete("/remove/:productId", removeFromCart);

// Vider le panier
router.delete("/clear", clearCart);

export default router;