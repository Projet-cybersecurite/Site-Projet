const { MongoClient } = require("mongodb");
const crypto = require("crypto");

// Connexion à MongoDB
const MONGODB_URI = "mongodb+srv://utilisateur:motdepasse@cluster.mongodb.net/database"; // Remplace avec ton URI MongoDB
const DB_NAME = "cybersecurity";

let client;
let db;

// Fonction pour chiffrer l'email avant stockage
function encryptEmail(email) {
    const algorithm = "aes-256-cbc";
    const key = crypto.createHash("sha256").update(String("super-secret-key")).digest("base64").substr(0, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(email, "utf8", "hex");
    encrypted += cipher.final("hex");
    return { encryptedData: encrypted, iv: iv.toString("hex") };
}

// API qui reçoit et stocke les messages
module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Méthode non autorisée" });
    }

    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    try {
        if (!client) {
            client = new MongoClient(MONGODB_URI);
            await client.connect();
            db = client.db(DB_NAME);
        }

        // Chiffrement de l'email
        const { encryptedData, iv } = encryptEmail(email);

        // Sauvegarde du message en base de données
        const newMessage = {
            name,
            email: encryptedData,
            iv,
            message,
            date: new Date(),
        };

        await db.collection("messages").insertOne(newMessage);
        return res.status(200).json({ message: "Message enregistré avec succès" });

    } catch (error) {
        return res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};
