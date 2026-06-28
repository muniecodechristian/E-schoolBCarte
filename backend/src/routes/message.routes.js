import express from "express";
import {
  sendMessage,
  getMyMessages,
  markAsRead,
  deleteMessage,
  getMySentMessages,
} from "../controllers/message.controller.js";
import {protectRoute as protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/", protect, getMyMessages);
router.get("/mySentMessages", protect, getMySentMessages);
router.patch("/read/:messageId", protect, markAsRead);
router.delete("/:messageId", protect, deleteMessage);

export default router;