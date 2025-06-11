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

export const bcryptCompare = (p: string, h: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(p, h, (err, result) => {
      if (err) return reject(err);
      if (!result) return resolve(false);
      resolve(true);
    });
  });
};
