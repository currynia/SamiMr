import { registerController } from '../db/controllers/authController';
import DBManager from '../db/dbManager';
import { type Request, type Response } from 'express';

const db = DBManager.getDBManager().db;
export const login = (req: Request, res: Response) => {
  console.log('Login request:', req.body);

  res.json({ message: 'Login logic not implemented yet' });
};

export const register = (req: Request, res: Response) => {
  console.log('Register request:', req.body);
  registerController(db, req.body.username, req.body.password);
  res.json({ message: 'Register logic not implemented yet' });
};
