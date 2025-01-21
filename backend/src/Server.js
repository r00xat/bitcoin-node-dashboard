import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import history from 'connect-history-api-fallback';
import path from 'path';
import crypto from 'crypto';

import { requireLogin } from './middlewares/auth.js';

import ping from './routes/ping.js';
import bitcoin from './routes/bitcoin.js';
import auth from './routes/auth.js';

class Server {
   constructor() {
      this.app = express();
      this.port = 1101;
      this.app.enable('trust proxy');

      if (!process.env.JWT_SECRET) {
         process.env.JWT_SECRET = this.generateSecret();
      }

      this.middlewares();

      this.routes();

      this.app.use(history());
      this.app.use("/", express.static(path.join('../frontend/dist')));
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

   generateSecret() {
      const length = 64;
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._!/';
      let secret = '';
      for (let i = 0; i < length; i++) {
         const randomIndex = crypto.randomInt(0, charset.length);
         secret += charset[randomIndex];
      }
      return secret;
   }

   listen() {
      this.app.listen(this.port, () => {
         console.log('Server runing');
      });
   }
}

export default Server;
