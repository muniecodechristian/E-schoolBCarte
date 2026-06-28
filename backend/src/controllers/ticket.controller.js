import QRCode from "qrcode";
import crypto from "crypto";
import { Ticket } from "../models/ticket.model.js";

export const generateTicketQR = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId).populate("event");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket introuvable" });
    }

    //  signature sécurisée
    const payload = {
      ticketId: ticket._id,
      qrCode: ticket.qrCode,
      eventId: ticket.event._id,
    };

    const secret = process.env.QR_SECRET || "secret_key";

    const hash = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(payload))
      .digest("hex");

    const qrData = {
      ...payload,
      hash,
    };

    // génération QR (base64)
    const qrImage = await QRCode.toDataURL(JSON.stringify(qrData));

    // sauvegarde
    ticket.qrCodeLink = qrImage;
    await ticket.save();

    res.json({
      message: "QR généré",
      qrCode: qrImage,
      data: qrData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};




export const verifyTicketQR = async (req, res) => {
  try {
    const { ticketId, qrCode, eventId, hash } = req.body;

    const secret = process.env.QR_SECRET || "secret_key";

    //  reconstruire signature
    const expectedHash = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify({ ticketId, qrCode, eventId }))
      .digest("hex");

    if (hash !== expectedHash) {
      return res.status(400).json({
        valid: false,
        message: "QR code falsifié ❌",
      });
    }

    //  chercher ticket
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        valid: false,
        message: "Ticket introuvable",
      });
    }

    //  vérifier correspondance
    if (ticket.qrCode !== qrCode) {
      return res.status(400).json({
        valid: false,
        message: "QR invalide",
      });
    }

    //  vérifier validité métier
    if (ticket.status==="used") {
      return res.status(400).json({
        valid: false,
        message: "Ticket expiré ou non valide",
      });
    }

    //  OPTION: empêcher double scan
    if (ticket.status === "used") {
      return res.status(400).json({
        valid: false,
        message: "Ticket déjà utilisé",
      });
    }

    //  marquer comme utilisé
    ticket.status = "used";
    await ticket.save();

    return res.json({
      valid: true,
      message: "Ticket valide ",
      ticket,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};