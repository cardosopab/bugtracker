import bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  // console.log(salt);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain: string, hashed: string) =>
  bcrypt.compareSync(plain, hashed);
