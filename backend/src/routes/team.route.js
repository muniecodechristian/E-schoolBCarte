import express from "express";
import multer from "multer";

import {
 createEquipe,
 getEquipeById,
 getAllEquipes,
 updateEquipe,
 deleteEquipe
} from "../controllers/team.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";
import { requireSuperAdmin } from "../middleware/requireAdmin.middleware.js";

const router = express.Router();

const upload = multer({
 storage: multer.memoryStorage(), // important pour cloudinary buffer
});

router.get("/", getAllEquipes);

router.get("/:id", getEquipeById);

router.post(
 "/",
 protectRoute,
 requireSuperAdmin,
 upload.single("logo"), // FIX ICI
 createEquipe
);

router.put(
 "/:id",
 protectRoute,
 requireSuperAdmin,
 updateEquipe
);

router.delete(
 "/:id",
 protectRoute,
 requireSuperAdmin,
 deleteEquipe
);

export default router;