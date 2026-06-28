import express from "express";
import {
  applyScanner,
  getAllApplications,
  reviewApplication
} from "../controllers/request.controller.js";

import { requireSuperAdmin } from "../middleware/requireAdmin.middleware.js";
import { checkAccesLeagueCode } from "../middleware/checkAccesLeagueCode.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.js"; // Importe ton instance Multer

const router = express.Router();

/**
 * POST /api/requests/apply
 * 1. protectRoute : Vérifie que l'user est connecté.
 * 2. upload.single("resumeUrl") : Intercepte le fichier envoyé par le FormData du front.
 * 3. applyScanner : Traite la logique métier.
 */
router.post("/apply", protectRoute, upload.single("resumeUrl"), applyScanner);

// Accessible uniquement par le SuperAdmin
router.get("/", protectRoute, requireSuperAdmin, getAllApplications);

// Révision de candidature (SuperAdmin uniquement)
router.patch("/:id/review", protectRoute, requireSuperAdmin, reviewApplication);

export default router;