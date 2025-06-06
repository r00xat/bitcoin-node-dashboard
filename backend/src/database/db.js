import { JSONFilePreset } from 'lowdb/node';
import path from 'path';
import fs from 'fs';

const dbDirectory = process.env.DB_DIRECTORY || '/data';
const dbFilePath = path.resolve(dbDirectory, 'stats.json');
const defaultData = { stats: {} };

if (!fs.existsSync(dbDirectory)) {
   fs.mkdirSync(dbDirectory, { recursive: true });
}

const db = await JSONFilePreset(dbFilePath, defaultData);

async function readDB() {
   await db.read();
   db.data = db.data || defaultData;
   return db.data;
}

async function writeDB(data) {
   db.data = data;
   await db.write();
}

export async function initDB() {
   try {
      await readDB();
      if (Object.keys(db.data.stats).length === 0) {
         await writeDB({ stats: {} });
      }
      console.log('Database initialized');
   } catch (err) {
      console.error('Error initializing database:', err);
      throw err;
   }
}

export async function insertOrUpdateStat(key, value) {
   if (value === undefined || value === null || typeof value !== 'number') {
      throw new Error('Invalid value');
   }

   try {
      await readDB();
      db.data.stats[key] = value;
      await writeDB(db.data);
   } catch (err) {
      console.error('Error inserting or updating stat:', err);
   }
}

export async function getStat(key) {
   try {
      const data = await readDB();
      const value = data.stats[key];
      return value !== undefined ? Number(value) : undefined;
   } catch (err) {
      console.error('Error getting stat:', err);
   }
}