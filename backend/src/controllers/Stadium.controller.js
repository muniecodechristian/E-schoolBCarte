import { Stadium } from "../models/stadium.model.js";
import cloudinary from "../lib/cloudinary.js";
import fs from "fs"; // L'import est déjà là en haut du fichier

export const createStadium = async (req, res) => {
  try {
    const { name, location, capacity, description, status } = req.body;

    // Récupération de l'ID via le middleware protectRoute
    const adminId = req.user?._id;

    if (!adminId) {
      return res.status(401).json({ success: false, message: "Utilisateur non identifié" });
    }

    const stadium = new Stadium({
      name,
      location: {
        city: location?.city,
        country: location?.country || "RDC"
      },
      capacity: {
        numberPlaces: Number(capacity?.numberPlaces || 0),
        vip: Number(capacity?.vip || 0),
        standard: Number(capacity?.standard || 0),
        economique: Number(capacity?.economique || 0),
        premium: Number(capacity?.premium || 0)
      },
      stdiumadmin: adminId, 
      description,
      status: status || "active",
    });

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, { 
        folder: "stadiums/photos" 
      });
      stadium.photo = upload.secure_url;

      // Utilisation correcte de l'import 'fs' au lieu de 'require'
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }

    await stadium.save();
    res.status(201).json({ success: true, stadium });

  } catch (error) {
    // On nettoie quand même le fichier en cas d'erreur de validation Mongoose
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    console.error("Erreur de création du stade :", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllStadiums = async (req, res) => {
  try {
   const stadiums = await Stadium.find()
  


    res.status(200).json({ success: true, stadiums });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStadiumById = async (req, res) => {
  try {
    const stadium = await Stadium.findById(req.params.id).populate("stdiumadmin", "-password");
    if (!stadium) return res.status(404).json({ success: false, message: "Stadium not found" });
    res.status(200).json({ success: true, stadium });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStadium = async (req, res) => {
  try {
    const stadium = await Stadium.findById(req.params.id);
    if (!stadium) return res.status(404).json({ success: false, message: "Stadium not found" });

    const { name, location, capacity, description, status } = req.body;
    if (name) stadium.name = name;
    if (location) stadium.location = location;
    if (capacity) stadium.capacity = capacity;
    if (description) stadium.description = description;
    if (status) stadium.status = status;

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, { folder: "stadiums/photos" });
      stadium.photo = upload.secure_url;
      fs.unlinkSync(req.file.path);
    }

    await stadium.save();
    res.status(200).json({ success: true, stadium });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteStadium = async (req, res) => {
  try {
    const stadium = await Stadium.findByIdAndDelete(req.params.id);
    if (!stadium) return res.status(404).json({ success: false, message: "Stadium not found" });
    res.status(200).json({ success: true, message: "Stadium deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleStadiumStatus = async (req, res) => {
  try {
    const stadium = await Stadium.findById(req.params.id);
    if (!stadium) return res.status(404).json({ success: false, message: "Stadium not found" });

    stadium.status = stadium.status === "active" ? "suspend" : "active";
    await stadium.save();

    res.status(200).json({ success: true, stadium });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};