import express from "express";
import { 
  getUserNotifications, 
  markAsSent, 
  deleteNotification 
} from "../controllers/notification.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",protectRoute, getUserNotifications);
router.put("/:id/sent",protectRoute, markAsSent);
router.delete("/:id",protectRoute, deleteNotification);

export default router;