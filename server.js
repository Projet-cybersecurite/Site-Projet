const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;
const SECRET_KEY = process.env.SECRET_KEY || "supersecret";

app.use(express.json());
app.use(cors());

// Connexion à SQLite
const db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('✅ Connexion à SQLite réussie');
});

// Création de la table Users
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
)`);

/* =============================
 * 🔐 Route d'inscription
 * ============================= */
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Champs requis' });

    const hashedPassword = await bcrypt.hash(password, 10);
    db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], (err) => {
        if (err) return res.status(500).json({ error: 'Utilisateur déjà existant' });
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    });
});

/* =============================
 * 🔓 Route de connexion
 * ============================= */
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Champs requis' });

    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
        if (!user) return res.status(401).json({ error: 'Utilisateur non trouvé' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Mot de passe incorrect' });

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    });
});

app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));
