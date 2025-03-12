import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from './mongodb';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

    const { email, password } = req.body;
    const { db } = await connectToDatabase();
    
    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Mot de passe incorrect.' });

    // 🚀 **Ici, on régénère le token JWT à chaque connexion !**
    const newToken = jwt.sign({ email, role: user.role || "user" }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // ✅ **On stocke le nouveau token dans un cookie sécurisé**
    res.setHeader('Set-Cookie', `token=${newToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`);

    // ✅ **On envoie le token au client**
    res.status(200).json({ message: 'Connexion réussie.', token: newToken });
}
const csrfToken = req.headers['x-csrf-token'];
const csrfCookie = req.cookies.csrfToken;

if (!csrfToken || csrfToken !== csrfCookie) {
    return res.status(403).json({ error: 'Échec de la validation CSRF.' });
}
