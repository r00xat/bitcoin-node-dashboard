import mariadb from 'mariadb';

const pool = mariadb.createPool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
   connectionLimit: 5
});

export async function initDB() {
   let conn;
   try {
      conn = await pool.getConnection();
      await conn.query('CREATE TABLE IF NOT EXISTS stats (`key` VARCHAR(255) PRIMARY KEY, value BIGINT NOT NULL)');
   } catch (err) {
      console.error('Error initializing database:', err);
      throw err;
   } finally {
      if (conn) conn.end();
   }
}

export async function insertOrUpdateStat(key, value) {
   if (value === undefined || value === null || typeof value !== 'number') {
      throw new Error('Invalid value');
   }

   let conn;
   try {
      conn = await pool.getConnection();
      await conn.query('INSERT INTO stats (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)', [key, value]);
   } catch (err) {
      console.error('Error inserting or updating stat:', err);
   } finally {
      if (conn) conn.end();
   }
}

export async function getStat(key) {
   let conn;
   try {
      conn = await pool.getConnection();
      const rows = await conn.query('SELECT value FROM stats WHERE `key` = ?', [key]);
      return rows[0]?.value;
   } catch (err) {
      console.error('Error getting stat:', err);
   } finally {
      if (conn) conn.end();
   }
}