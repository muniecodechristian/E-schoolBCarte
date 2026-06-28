import { getSocket } from "../../socket/socket.js";
import { request as ScannerApplication } from "../models/rquest.model.js";
import { User } from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const applyScanner = async (req, res) => {
  try {
    const {
      motivation,
      requestedRole,
      location,
      accessCode,
    } = req.body || {};

    // ================= VALIDATION =================
    if (!requestedRole || !["scanner", "stadiumAdmin"].includes(requestedRole)) {
      return res.status(400).json({
        success: false,
        message: "Rôle invalide ou manquant",
      });
    }

    if (!location?.trim()) {
      return res.status(400).json({
        success: false,
        message: "La localisation est obligatoire",
      });
    }

    if (!motivation?.trim()) {
      return res.status(400).json({
        success: false,
        message: "La motivation est obligatoire",
      });
    }

    if (!accessCode?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Le code d'accès est obligatoire",
      });
    }

    if (accessCode !== process.env.APP_SECRET_PASS) {
      return res.status(403).json({
        success: false,
        message: "Le code est invalide",
      });
    }

    // ================= CHECK EXISTING =================
    const existing = await ScannerApplication.findOne({
      applicant: req.user._id,
      requestedRole,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Vous avez déjà postulé pour le rôle ${requestedRole}`,
      });
    }

    // ================= CREATE APPLICATION =================
    const application = await ScannerApplication.create({
      applicant: req.user._id,
      requestedRole,
      location,
      accessCode,
      motivation,
    });


    

    // ================= FIND SUPER ADMINS =================
    const superAdmins = await User.find({ role: "superadmin" });

    // ================= CREATE NOTIFICATIONS =================
    const notifications = superAdmins.map((admin) => ({
      from: req.user._id,
      to: admin._id,
      match: application._id, // on utilise application comme référence
      type: "promotion",
      message: `Nouvelle candidature ${requestedRole} de ${
        req.user.nom || req.user.name || "Utilisateur"
      }`,
      status: "sent",
      deliveryMethod: "push_notification",
      meta: {
        applicationId: application._id,
        role: requestedRole,
        location,
      },
    }));

    await Notification.insertMany(notifications);

    // ================= SOCKET =================
    const io = getSocket();

    // broadcast global (tous les users connectés)
    io.emit("new_notification", {
      applicationId: application._id,
      role: requestedRole,
      applicantId: req.user._id,
      applicantName: req.user.nom || req.user.name || "Utilisateur",
    });

    // notification ciblée admins
    superAdmins.forEach((admin) => {
      io.to(admin._id.toString()).emit("new_notification", {
        message: `Nouvelle candidature ${requestedRole}`,
        applicationId: application._id,
        from: req.user._id,
      });
    });

    // ================= RESPONSE =================
    return res.status(201).json({
      success: true,
      message: "Candidature envoyée avec succès",
      application,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllApplications = async (req, res) => {
  try {
    const applications = await ScannerApplication.find()
      .populate("applicant", "-password")
      .populate("reviewedBy", "-password");

    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reviewApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { status='accepted' } = req.body;

    const application = await ScannerApplication.findById(id).populate("applicant");
    if (!application) return res.status(404).json({ success: false, message: "Application not found" });

    application.status = status;
    application.reviewedBy = req.user._id;
    application.reviewedAt = new Date();
    await application.save();

    if (status === "accepted") {
      application.applicant.role = "scanner";
      application.applicant.isVerified = true;
      application.applicant.isActive = true;
      await application.applicant.save();
    }

    const io = getSocket();
    io.to(application.applicant._id.toString()).emit("application_reviewed", application);

    res.status(200).json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};