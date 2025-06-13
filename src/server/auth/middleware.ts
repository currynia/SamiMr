import { type Request, type Response, type NextFunction } from 'express';
import { verify } from './jwt';
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  try {
    await verify(token);
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send();
  }
};
