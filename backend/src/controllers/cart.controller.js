import { Cart } from "../models/cart.model.js"; // ton modèle Cart
import mongoose from "mongoose";

// Récupérer le panier d'un utilisateur
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id; // supposons que l'utilisateur est authentifié
    let cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Erreur getCart:", error);
    res.status(500).json({ message: "Impossible de récupérer le panier" });
  }
};

// Ajouter un produit au panier
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;


    if (quantity<1) {

        return res.status(400).json({ message: "ajouter au moins 1  billet" });
        
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Produit invalide" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Mettre à jour la quantité si le produit existe déjà
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Ajouter un nouveau produit
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Erreur addToCart:", error);
    res.status(500).json({ message: "Impossible d'ajouter le produit au panier" });
  }
};

// Mettre à jour la quantité d'un produit
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId) || quantity < 1) {
      return res.status(400).json({ message: "Données invalides" });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Panier introuvable" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Produit non trouvé dans le panier" });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Erreur updateCartItem:", error);
    res.status(500).json({ message: "Impossible de mettre à jour le panier" });
  }
};

// Supprimer un produit du panier
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Panier introuvable" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Erreur removeFromCart:", error);
    res.status(500).json({ message: "Impossible de supprimer le produit du panier" });
  }
};

// Vider le panier
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Panier introuvable" });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Panier vidé avec succès", cart });
  } catch (error) {
    console.error("Erreur clearCart:", error);
    res.status(500).json({ message: "Impossible de vider le panier" });
  }
};