import Notification from "../models/notification.model.js";

export const getUserNotifications = async (req, res) => {
  try {
    const userId = req?.user?._id || req?.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non authentifié",
      });
    }

   const notifications = await Notification.find({ to: userId })
  .populate("from", "name email")
  .populate("to", "name email")
  
  .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: notifications,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Erreur serveur",
    });
  }
};
export const markAsSent = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { status: "sent", sentAt: new Date() },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification introuvable" });
    }

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification introuvable" });
    }

    res.status(200).json({ message: "Notification supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};