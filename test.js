import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
    console.log("🔍 Test API Supabase");
    console.log("🔹 URL Supabase:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("🔹 Clé Anonyme Supabase:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "OK" : "❌ NON TROUVÉE");

    if (!supabase) {
        return res.status(500).json({ error: "❌ Supabase n'est pas configuré correctement." });
    }

    const { data, error } = await supabase.from("users").select("*");

    if (error) {
        console.error("❌ Erreur Supabase:", error);
        return res.status(500).json({ error: error.message });
    }

    console.log("✅ Connexion réussie à Supabase !");
    res.status(200).json({ users: data });
}
