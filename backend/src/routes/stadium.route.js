import express from "express";

import {
  createStadium,
  getAllStadiums,
  getStadiumById,
  updateStadium,
  deleteStadium,
  toggleStadiumStatus,
} from "../controllers/Stadium.controller.js";
import multer from "multer";
import { protectRoute } from "../middleware/auth.middleware.js";
import { requireStadiumAdmin,requireRolesofSuperAdminAndStadiumAdmin } from "../middleware/requireAdmin.middleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", protectRoute,requireStadiumAdmin, upload.single("photo"), createStadium);
router.get("/", protectRoute,requireRolesofSuperAdminAndStadiumAdmin, getAllStadiums);
router.get("/:id", protectRoute,requireRolesofSuperAdminAndStadiumAdmin, getStadiumById);
router.put("/:id", protectRoute, upload.single("photo"),requireStadiumAdmin, updateStadium);
router.delete("/:id", protectRoute,requireStadiumAdmin, deleteStadium);
router.patch("/:id/toggle-status", protectRoute,requireRolesofSuperAdminAndStadiumAdmin, toggleStadiumStatus);

export default router;