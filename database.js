import { MongoClient } from 'mongodb';
import { config } from './config.js';

let db = null;
let client = null;

export async function connectToDatabase() {
  try {
    if (db) {
      return db;
    }

    console.log('Connecting to MongoDB...');
    client = new MongoClient(config.MONGODB_URI);
    await client.connect();
    
    db = client.db(config.DB_NAME);
    console.log('Successfully connected to MongoDB');
    
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return db;
}

export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    db = null;
    client = null;
    console.log('Database connection closed');
  }
}
