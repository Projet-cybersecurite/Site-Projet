import bcrypt from 'bcryptjs';
import { connectToDatabase } from './mongodb';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

    const { email, password, role } = req.body;
    const csrfToken = req.headers['x-csrf-token'];
    const csrfCookie = req.cookies.csrfToken;

    if (!csrfToken || csrfToken !== csrfCookie) {
        return res.status(403).json({ error: 'Échec de la validation CSRF.' });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Mot de passe trop faible.' });
    }

    const { db } = await connectToDatabase();
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) return res.status(400).json({ error: 'Utilisateur déjà existant.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('users').insertOne({ email, password: hashedPassword, role: role || "user" });

    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
}
