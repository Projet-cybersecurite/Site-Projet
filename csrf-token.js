import crypto from 'crypto';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Méthode non autorisée' });

    const csrfToken = crypto.randomBytes(20).toString('hex');
    res.setHeader('Set-Cookie', `csrfToken=${csrfToken}; HttpOnly; Secure; SameSite=Lax; Path=/`);
    res.status(200).json({ csrfToken });
}
