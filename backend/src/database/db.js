import Database from "better-sqlite3";

const db = new Database("bnd.db");

export function initDB() {
   db.exec('CREATE TABLE IF NOT EXISTS stats (key TEXT PRIMARY KEY, value NUMERIC)');
}

export function insertOrUpdateStat(key, value) {
   if (value === undefined || value === null || typeof value != 'number') throw new Error('Invalid value');
   const insert = db.prepare('INSERT OR REPLACE INTO stats (key, value) VALUES (@key, @value)');
   insert.run({ key, value });
}

export function getStat(key) {
   const query = db.prepare('SELECT value FROM stats WHERE key = @key');
   return query.get({ key })?.value;
}