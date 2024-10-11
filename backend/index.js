import 'dotenv/config';

import { initDB } from './src/database/db.js';
initDB();

import Server from './src/Server.js';
new Server().listen();

//Store stats service
import { storeStats } from './src/services/storeStats.js';
storeStats();
setInterval(() => {
   storeStats();
}, 10 * 60 * 1000); // 10 minutes
