import { type Request, type Response, type NextFunction } from "express";
import { verify } from "./jwt";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (/^\/api\/public\/.*/.test(req.path) || /^\/api\/auth\/.*/.test(req.path)) return next();
  const token = req.cookies.token;

  try {
    res.locals.payload = await verify(token);
    next();
  } catch (e) {
    next(""); //skip all the way to fallback middleware
  }
};
