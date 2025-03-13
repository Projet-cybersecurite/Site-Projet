import { supabase } from "../lib/supabase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Méthode non autorisée" });

    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (!user || error) {
        return res.status(401).json({ error: "Utilisateur non trouvé ou erreur interne." });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Mot de passe incorrect" });

    // Générer un token JWT
    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Connexion réussie", token });
}
