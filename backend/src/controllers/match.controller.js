import Match from "../models/match.model.js";
import { Stadium } from "../models/stadium.model.js";
import mongoose from "mongoose";

//  Créer un nouveau match
export const createMatch = async (req, res) => {


  console.log('data for matches ',req?.body)
  try {
    const {
  homeTeam,
  awayTeam,
  stadium,
  matchDate,
  prices,
} = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(homeTeam) ||
      !mongoose.Types.ObjectId.isValid(awayTeam)
    ) {
      return res.status(400).json({
        message: "Équipes invalides",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(stadium)
    ) {
      return res.status(400).json({
        message: "Stade invalide",
      });
    }

    if (homeTeam === awayTeam) {
      return res.status(400).json({
        message:
          "Une équipe ne peut pas jouer contre elle-même",
      });
    }

    const parsedDate = new Date(matchDate);

    if (
      !matchDate ||
      isNaN(parsedDate.getTime())
    ) {
      return res.status(400).json({
        message: "Date de match invalide",
      });
    }

    if (parsedDate < new Date()) {
      return res.status(400).json({
        message:
          "La date du match doit être dans le futur",
      });
    }

    const stadiumData =
      await Stadium.findById(stadium);

    if (!stadiumData) {
      return res.status(404).json({
        message: "Stade introuvable",
      });
    }

    if (
      stadiumData.status === "suspend"
    ) {
      return res.status(400).json({
        message: "Stade suspendu",
      });
    }

    if (
  !prices ||
  prices.vip == null ||
  prices.premium == null ||
  prices.standard == null ||
  prices.economique == null
) {
  return res.status(400).json({
    message: "Tous les prix doivent être renseignés",
  });
}

    const match = new Match({
  homeTeam,
  awayTeam,
  stadium,

  matchDate: parsedDate,

  places: {
    numberPlaces:
      stadiumData.capacity.numberPlaces,

    vip:
      stadiumData.capacity.vip,

    premium:
      stadiumData.capacity.premium,

    standard:
      stadiumData.capacity.standard,

    economique:
      stadiumData.capacity.economique,
  },

  prices: {
    vip: Number(prices.vip),
    premium: Number(prices.premium),
    standard: Number(prices.standard),
    economique: Number(prices.economique),
  },

  soldTickets: {
    vip: 0,
    premium: 0,
    standard: 0,
    economique: 0,
  },

  isSoldout: false,

  status: "pending",
});

match.save()




  return res.status(201).json({
      success: true,
      message: 'Match crée avec succes ',
    });

  } catch (error) {
    console.log(
      "Erreur createMatch:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  Récupérer un match par ID
export const getMatchById = async (req, res) => {

  try {
    const { id } = req.params;

      console.log('id details',id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de match invalide" });
    }

    const match = await Match.findById(id)
    .populate({
    path: "homeTeam",
    select: "nom logo city pays championnat",
  })
  .populate({
    path: "awayTeam",
    select: "nom logo city pays championnat",
  })
  .populate({
    path: "stadium",
    select: "name location capacity status",
  })
  .lean();

    if (!match) {
      return res.status(404).json({ message: "Match introuvable" });
    }

    res.status(200).json(match);
  } catch (error) {
    console.error("Erreur getMatchById:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

//  Récupérer tous les matchs (option filtre par status ou date)
export const getAllMatches = async (req, res) => {
  try {
    const { status="pending", date } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (date) filter.matchDate = { $gte: new Date(date) };
const matches = await Match.find(filter)
  .populate({
    path: "homeTeam",
    select: "nom logo city pays championnat",
  })
  .populate({
    path: "awayTeam",
    select: "nom logo city pays championnat",
  })
  .populate({
    path: "stadium",
    select: "name location capacity status",
  })
 .sort({ createdAt: -1 })
  .lean();
 
    

    res.status(200).json(matches);
  } catch (error) {
    console.error("Erreur getAllMatches:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

//  Mettre à jour un match
export const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de match invalide" });
    }

    const match = await Match.findById(id);
    if (!match) return res.status(404).json({ message: "Match introuvable" });

    // validations strictes
    if (updates.homeTeam && updates.homeTeam === updates.awayTeam) {
      return res.status(400).json({ message: "Une équipe ne peut pas jouer contre elle-même" });
    }
    if (updates.placesrestnumber !== undefined && updates.placesrestnumber < 0) {
      return res.status(400).json({ message: "Le nombre de places restantes doit être ≥ 0" });
    }

    Object.assign(match, updates, { updatedAt: new Date() });
    await match.save();

    res.status(200).json({ message: "Match mis à jour avec succès", match });
  } catch (error) {
    console.error("Erreur updateMatch:", error);
    res.status(500).json({ message: "Impossible de mettre à jour le match" });
  }
};

//  Supprimer un match
export const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de match invalide" });
    }

    const match = await Match.findByIdAndDelete(id);
    if (!match) return res.status(404).json({ message: "Match introuvable" });

    res.status(200).json({ message: "Match supprimé avec succès" });
  } catch (error) {
    console.error("Erreur deleteMatch:", error);
    res.status(500).json({ message: "Impossible de supprimer le match" });
  }
};