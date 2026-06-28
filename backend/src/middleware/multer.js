import multer from "multer";

// Stockage temporaire en mémoire
const storage = multer.memoryStorage();

export const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Limite à 5MB
});