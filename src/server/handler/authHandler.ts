import { registerController } from '../db/controllers/authController';
import DBManager from '../db/dbManager';
import { type Request, type Response } from 'express';

const db = DBManager.getDBManager().db;

export const login = (req: Request, res: Response) => {
  console.log('Login request:', req.body);

  res.json({ message: 'Login logic not implemented yet' });
};

export const register = async (req: Request, res: Response) => {
  try {
    await registerController(db, req.body.username, req.body.password);
    res.status(200).send();
  }
  catch (e) {
    console.log(e);
    res.status(400).send();
  }
};
