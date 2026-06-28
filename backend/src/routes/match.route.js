// routes/match.route.js
import express from "express";
import {
  createMatch,
  getMatchById,
  getAllMatches,
  updateMatch,
  deleteMatch,
} from "../controllers/match.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { requireSuperAdmin } from "../middleware/requireAdmin.middleware.js";


const router = express.Router();

// 🔹 Toutes les routes nécessitent que l'utilisateur soit authentifié


// Créer un nouveau match
// POST /api/matches
router.post("/",protectRoute,requireSuperAdmin, createMatch);

// Récupérer tous les matchs (option filtre par status ou date)
// GET /api/matches
router.get("/", getAllMatches);

// Récupérer un match par ID
// GET /api/matches/:id
router.get("/:id", getMatchById);

// Mettre à jour un match
// PUT /api/matches/:id
router.put("/:id", protectRoute,requireSuperAdmin,updateMatch);

// Supprimer un match
// DELETE /api/matches/:id
router.delete("/:id",protectRoute,requireSuperAdmin, deleteMatch);

export default router;