import 'dotenv/config';
import express from 'express';
import { conectDB } from './config/conectDB';
import { loginRouter } from './routes/login.routes';
conectDB();
export const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.text());

expressApp.use(loginRouter);
