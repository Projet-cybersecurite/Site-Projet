import { supabase } from "../lib/supabase";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Méthode non autorisée" });

    const { email, password } = req.body;
    const csrfToken = req.cookies.csrfToken;

    // Vérification du token CSRF
    if (!csrfToken || csrfToken !== req.headers["x-csrf-token"]) {
        return res.status(403).json({ error: "Token CSRF invalide" });
    }

    // Vérification des variables d'environnement
    if (!process.env.SECRET_KEY) {
        console.error("Erreur: SECRET_KEY non défini !");
        return res.status(500).json({ error: "Erreur serveur" });
    }

    // Vérification de l'utilisateur avec Supabase Auth
    const { data: user, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return res.status(401).json({ error: "Utilisateur ou mot de passe incorrect" });

    // Génération du token JWT
    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ token });
}
