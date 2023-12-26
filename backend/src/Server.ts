import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import history from 'connect-history-api-fallback';

import ping from './routes/ping';
import bitcoin from './routes/bitcoin';

class Server {
   app: express.Application;
   port: number;

   constructor() {
      this.app = express();
      this.port = 4000;
      this.app.enable('trust proxy');

      this.middlewares();

      this.routes();

      this.app.use(history());
   }

   middlewares() {
      this.app.use(cors());

      this.app.use(express.json());

      this.app.use(cookieParser());

      this.app.use(express.urlencoded({ extended: true }));
   }

   routes() {
      this.app.use('/ping', ping);

      this.app.use('/bitcoin', bitcoin);
   }

   listen() {
      this.app.listen(this.port, () => {
         console.log('Server runing');
      });
   }
}

export default Server;
