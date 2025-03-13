import { createClient } from "@supabase/supabase-js";

// Vérification des variables d'environnement
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("⚠️ Erreur : Les variables d'environnement Supabase ne sont pas définies !");
}

// Connexion à Supabase
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
