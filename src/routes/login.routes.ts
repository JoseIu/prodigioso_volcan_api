import express from 'express';
import { loginGoogleController } from '../controller/login.controller';
import { checkToken } from '../middleware/checkToken';

export const loginRouter = express.Router();

loginRouter.post('/login-google', checkToken, loginGoogleController);
