import { supabase } from "../lib/supabase";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Méthode non autorisée" });
    }

    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const { data: existingUser, error: userError } = await supabase
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
    const { data, error } = await supabase
        .from("users")
        .insert([{ email, password: hashedPassword }]);

    if (error) {
        console.error("Erreur Supabase:", error);
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: "Utilisateur créé avec succès", data });
}
