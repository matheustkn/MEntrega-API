import './config/db';

import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import { Server } from 'socket.io';

import responseHelper from './helpers/response-helper';
import routes from './routes';

dotenv.config();

if (process.env.MONGODB_URI === undefined) {
  console.error('MONGODB_URI is undefined');
  process.exit(1);
}

const app: Express = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );

  if (req.method === 'OPTIONS') {
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE',
    );
    return res.status(200).json({});
  }

  next();
});

app.use('/', routes);

app.use((req: Request, res: Response) => {
  return responseHelper(res, 404, 'The requested resource was not found');
});

const httpServer = http.createServer(app);
const PORT: unknown = process.env.PORT ?? 3000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server bootstrapped on port ${PORT}`);
});

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

export const socket = io;

// eslint-disable-next-line import/first
import './sockets/orders';
