import jwt from 'jsonwebtoken';
import { connectToDatabase } from './mongodb';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Méthode non autorisée' });

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token manquant' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { db } = await connectToDatabase();
        
        const user = await db.collection('users').findOne({ email: decoded.email });

        if (!user || user.role !== "admin") {
            return res.status(403).json({ error: 'Accès interdit' });
        }

        res.status(200).json({ isAdmin: true });

    } catch (error) {
        res.status(401).json({ error: 'Token invalide' });
    }
}
