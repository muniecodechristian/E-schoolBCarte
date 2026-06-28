// routes/ticket.route.js
import express from "express";
import { generateTicketQR, verifyTicketQR } from "../controllers/ticket.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

//  Toutes les routes peuvent être sécurisées si nécessaire
router.use(protectRoute);

// Générer le QR code pour un ticket

router.get("/:ticketId/qr", generateTicketQR);

// Vérifier un QR code scanné

router.post("/verify", verifyTicketQR);

export default router;