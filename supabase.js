import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Erreur : Les variables d'environnement Supabase ne sont pas définies !");
    throw new Error("⚠️ Vérifie tes variables d'environnement dans Vercel.");
}

// Affiche les valeurs des variables (juste pour le débogage, à supprimer en production)
console.log("🔗 Supabase URL :", supabaseUrl);
console.log("🔑 Supabase Anon Key :", supabaseAnonKey.substring(0, 5) + "****");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
