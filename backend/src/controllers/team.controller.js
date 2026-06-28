import { Equipe } from "../models/team.model.js";
import mongoose from "mongoose";

import cloudinary from "../lib/cloudinary.js";


export const createEquipe = async (req, res) => {



  try {
    const { nom, city,Logo } = req.body;

    // 1. Validation de base
    if (!nom || !city) {
      return res.status(400).json({ message: "Le nom et la ville sont requis" });
    }

    // 2. Vérifier si une image est présente
    if (!req.file) {
      return res.status(400).json({ message: "Le logo est requis" });
    }

    // 3. Upload vers Cloudinary
    // On convertit le buffer en base64 pour l'upload
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    
    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: "equipes_logos",
      resource_type: "image",
    });

    // 4. Vérifier si l'équipe existe déjà
    const existing = await Equipe.findOne({ nom });
    if (existing) {
      return res.status(409).json({ message: "Une équipe avec ce nom existe déjà" });
    }

    // 5. Création de l'équipe avec l'URL Cloudinary
    const equipe = new Equipe({
      nom,
      logo: uploadResult.secure_url, // URL sécurisée renvoyée par Cloudinary
      city,
      status:"active",
    });

    await equipe.save();
    res.status(201).json({ message: "Équipe créée avec succès", equipe });
    
  } catch (error) {
    console.error("Erreur createEquipe:", error);
    res.status(500).json({ message: "Impossible de créer l'équipe" });
  }
};

// 🔹 Récupérer toutes les équipes (avec filtres et recherche texte)
export const getAllEquipes = async (req, res) => {
  try {
    const { pays, championnat, status, search } = req.query;
    const filter = {};

    if (pays) filter.pays = pays;
    if (championnat) filter.championnat = championnat;
    if (status) filter.status = status;

    let query = Equipe.find(filter);

    // Recherche texte full-text sur nom et championnat
    if (search) {
      query = query.find({ $text: { $search: search } });
    }

    const equipes = await query.sort({ nom: 1 }); // tri alphabétique
    res.status(200).json(equipes);
  } catch (error) {
    console.error("Erreur getAllEquipes:", error);
    res.status(500).json({ message: "Impossible de récupérer les équipes" });
  }
};










// 🔹 Récupérer une équipe par ID (AJOUTÉ ICI)
export const getEquipeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const equipe = await Equipe.findById(id);
    if (!equipe) {
      return res.status(404).json({ message: "Équipe introuvable" });
    }

    res.status(200).json(equipe);
  } catch (error) {
    console.error("Erreur getEquipeById:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};









// 🔹 Mettre à jour une équipe
export const updateEquipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    // Vérifier si le nom est unique
    if (updates.nom) {
      const existing = await Equipe.findOne({ nom: updates.nom, _id: { $ne: id } });
      if (existing) {
        return res.status(409).json({ message: "Une autre équipe avec ce nom existe déjà" });
      }
    }

    const equipe = await Equipe.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!equipe) return res.status(404).json({ message: "Équipe introuvable" });

    res.status(200).json({ message: "Équipe mise à jour", equipe });
  } catch (error) {
    console.error("Erreur updateEquipe:", error);
    res.status(500).json({ message: "Impossible de mettre à jour l'équipe" });
  }
};

// 🔹 Supprimer une équipe
export const deleteEquipe = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const equipe = await Equipe.findByIdAndDelete(id);

    if (!equipe) return res.status(404).json({ message: "Équipe introuvable" });

    res.status(200).json({ message: "Équipe supprimée avec succès" });
  } catch (error) {
    console.error("Erreur deleteEquipe:", error);
    res.status(500).json({ message: "Impossible de supprimer l'équipe" });
  }
};