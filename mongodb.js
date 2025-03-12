import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    if (cachedDb) return { db: cachedDb };

    const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db('cybersecurity');

    cachedClient = client;
    cachedDb = db;

    return { db };
}
