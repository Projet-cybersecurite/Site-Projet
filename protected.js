import jwt from "jsonwebtoken";

export default function handler(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ error: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];

    // Vérification de la présence de SECRET_KEY
    if (!process.env.SECRET_KEY) {
        console.error("Erreur: SECRET_KEY non défini !");
        return res.status(500).json({ error: "Erreur serveur" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return res.status(200).json({ message: "Accès autorisé", user: decoded });
    } catch (error) {
        return res.status(401).json({ error: "Token invalide" });
    }
}
