import jwt from "jsonwebtoken";

export default function handler(req, res) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(403).json({ error: "Accès interdit, token manquant" });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return res.status(200).json({ message: "Accès autorisé", user: decoded });
    } catch (error) {
        return res.status(401).json({ error: "Token invalide" });
    }
}
