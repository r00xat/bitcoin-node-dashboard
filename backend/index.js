import 'dotenv/config';

import { initDB } from './src/database/db.js';
console.log('Initializing database...');
await initDB()
   .then(() => {
      console.log('Database initialized')
   })
   .catch((err) => {
      console.error('Error initializing database:', err);
      process.exit(1);
   });

import Server from './src/Server.js';
new Server().listen();

//Store stats service
import { storeStats } from './src/services/storeStats.js';
storeStats();
setInterval(() => {
   storeStats();
}, 10 * 60 * 1000); // 10 minutes
