import jsonwebtoken from "jsonwebtoken";

export const authUserToken = (id: string) => {
  const secret = process.env.SECRET_KEY;
  const token = jsonwebtoken.sign({ id }, `${secret}`, {
    expiresIn: "1d",
  });
  return token;
};
