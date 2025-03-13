import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
    // Vérifie si Supabase est bien configuré
    if (!supabase) {
        return res.status(500).json({ error: "Supabase n'est pas configuré correctement." });
    }

    // Essaye de récupérer les utilisateurs de la base de données
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ users: data });
}
