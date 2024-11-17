import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import history from 'connect-history-api-fallback';
import path from 'path';

import { requireLogin } from './middlewares/auth.js';

import ping from './routes/ping.js';
import bitcoin from './routes/bitcoin.js';
import auth from './routes/auth.js';

class Server {
   constructor() {
      this.app = express();
      this.port = 1101;
      this.app.enable('trust proxy');

      this.middlewares();

      this.routes();

      this.app.use("/", express.static(path.join('../frontend/dist')));
      this.app.use(history());
   }

   middlewares() {
      this.app.use(cors());

      this.app.use(express.json());

      this.app.use(cookieParser());

      this.app.use(express.urlencoded({ extended: true }));
   }

   routes() {
      const roter = express.Router();
      roter.use('/ping', ping);
      roter.use('/auth', auth);
      roter.use('/bitcoin', requireLogin, bitcoin);

      this.app.use('/api', roter);
   }

   listen() {
      this.app.listen(this.port, () => {
         console.log('Server runing');
      });
   }
}

export default Server;
