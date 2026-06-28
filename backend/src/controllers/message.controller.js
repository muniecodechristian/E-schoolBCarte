import Message from "../models/message.model.js";
import MessageRead from "../models/readMessage.model.js";
import { User } from "../models/user.model.js";
import { School } from "../models/school.model.js";


export const sendMessage = async (req, res) => {
  try {
    const {
      schoolId,
      recipientType,
      targetRole,
      recipients,
      title,
      content,
      priority,
    } = req.body;

    const senderId = req.user._id;
    const senderRole = req.user.role;

    if (!["promoter", "director", "prefet"].includes(senderRole)) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({ message: "École introuvable" });
    }

    const newMessage = await Message.create({
      schoolId,
      senderId,
      senderRole,
      recipientType,
      targetRole: recipientType === "role" ? targetRole : null,
      recipients: recipientType === "specific" ? recipients : [],
      title,
      content,
      priority,
    });

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMyMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role;
    const schoolId = req.user.schoolId;

    const messages = await Message.find({
      schoolId,
      isActive: true,
      $or: [
        { recipientType: "all" },
        { recipientType: "role", targetRole: userRole },
        { recipientType: "specific", recipients: userId },
      ],
    })
      .sort({ createdAt: -1 })
      .populate("senderId", "name");

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMySentMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role;

    if (!["promoter", "director", "prefet"].includes(userRole)) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    const messages = await Message.find({
      senderId: userId,
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .populate("recipients", "name")
      .populate("schoolId", "schoolName");

   

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    const alreadyRead = await MessageRead.findOne({
      messageId,
      userId,
    });

    if (!alreadyRead) {
      await MessageRead.create({
        messageId,
        userId,
      });
    }

    res.status(200).json({ message: "Message marqué comme lu" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userRole = req.user.role;

    if (!["super_admin", "owner"].includes(userRole)) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    const message = await Message.findByIdAndUpdate(
      messageId,
      { isActive: false },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: "Message introuvable" });
    }

    res.status(200).json({ message: "Message supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};