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

//  Toutes les routes nécessitent que l'utilisateur soit connecté
router.use(protectRoute);

// Récupérer le panier de l'utilisateur
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