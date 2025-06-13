import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;

export const sign = (o: object): Promise<string | undefined> => {
  return new Promise((resolve, reject) => jwt.sign(o, secretKey!, function (err, token) {
    if (err) return reject(err);;
    resolve(token);
  }));
};

export const verify = (token: string): Promise<string | jwt.JwtPayload> => {
  return new Promise((resolve, reject) => jwt.verify(token, secretKey!, (err, decoded) => {
    if (err) return reject(err);
    if (decoded == undefined) return reject("Undefined token");
    resolve(decoded);
  }));
};
