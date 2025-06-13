import { loginController, registerController } from '../db/controllers/authController';
import DBManager from '../db/dbManager';
import { type Request, type Response } from 'express';

const db = DBManager.getDBManager().db;

export const login = async (req: Request, res: Response) => {
  const username: string = req.body?.username;
  const password: string = req.body?.password;
  try {
    const { payload, jwt } = await loginController(db, username, password);

    if (jwt == undefined) {
      res.status(500).send("Internal server error occured");
      return;
    }
    res.status(200).cookie('token', jwt, { httpOnly: true, sameSite: "strict" }).send(payload);
  } catch (e) {
    res.status(401).send();
    console.log(e);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    await registerController(db, req.body.username, req.body.password);
    res.status(200).send();
  }
  catch (e) {
    console.log(e);
    res.status(409).send();
  }
};
