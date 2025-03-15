import { supabase } from "../lib/supabase";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Méthode non autorisée" });
    }

    const { email, password } = req.body;
    const csrfToken = req.cookies.csrfToken;

    // Vérification du token CSRF
    if (!csrfToken || csrfToken !== req.headers["x-csrf-token"]) {
        return res.status(403).json({ error: "Token CSRF invalide" });
    }

    // Vérifier si l'utilisateur existe déjà
    const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (existingUser) {
        return res.status(400).json({ error: "Utilisateur déjà existant" });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insérer l'utilisateur dans la table `users`
    const { error } = await supabase
        .from("users")
        .insert([{ email, password: hashedPassword }]);

    if (error) {
        console.error("Erreur Supabase:", error);
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: "Utilisateur créé avec succès" });
}
