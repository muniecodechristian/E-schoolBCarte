import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import http from "http"; // Requis pour l'intégration future de Socket.io
import helmet from "helmet"; // Sécurité des headers HTTP
import rateLimit from "express-rate-limit"; // Protection contre le brute force
import { connectDB } from "./db/connectDB.js";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT ?? 5500;

// 1. HELMET: Protection de base
// Il définit divers en-têtes HTTP sécurisés (ex: désactive X-Powered-By pour cacher qu'on utilise Express)
app.use(helmet());

// 2. RATE LIMITER: Protection contre le DDoS et Brute Force
// On limite à 100 requêtes toutes les 15 minutes par IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: "Trop de requêtes, réessayez plus tard.",
    standardHeaders: true,
    legacyHeaders: false,
});
app.use("/api/", limiter); // Appliqué uniquement sur tes routes API

// 3. CONFIGURATIONS
app.set("trust proxy", 1); 
const ALLOWORIGINS = ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({ 
    origin: ALLOWORIGINS, 
    credentials: true 
}));

app.use(express.json({ limit: "10mb" })); // Protection: limite la taille des payloads (ex: photos d'élèves)
app.use(cookieParser());

// 4. ROUTES
app.get('/', (req, res) => {
    res.send('Server is running securely');
});

// 5. LANCEMENT
httpServer.listen(PORT, () => {
    connectDB();
    console.log("Server running securely on port:", PORT);
});