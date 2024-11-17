import 'dotenv/config';

import { initDB } from './src/database/db.js';
import { storeStats } from './src/services/storeStats.js';

import Server from './src/Server.js';
new Server().listen();

//Initialize database

console.log('Initializing database...');
await initDB()
   .then(() => {
      console.log('Database initialized')
   })
   .catch((err) => {
      console.error('Error initializing database:', err);
      process.exit(1);
   });

//Store stats service
storeStats();
setInterval(() => {
   storeStats();
}, 10 * 60 * 1000); // 10 minutes