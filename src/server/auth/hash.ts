import bcrypt from "bcrypt";

const saltRounds = 10;

export const bcryptHash = (p: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(p, saltRounds, (err, hash) => {
      if (err) return reject(err);
      resolve(hash);
    });
  });
};
