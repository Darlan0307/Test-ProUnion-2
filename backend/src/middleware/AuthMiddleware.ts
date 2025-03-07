import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

// Tipo para o payload do token do jwt
type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export function AuthMiddleWares(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  // Verificando se o token existe
  if (!authorization) {
    return res.status(401).json({ message: "Nenhum token enviado" });
  }

  // Extraindo o token do header
  const [, token] = authorization.split(" ");

  try {
    // Verificando se o token é válido
    const secret = process.env.SECRET_KEY; // secret key do jwt
    // decodificando o token
    const decoded = jsonwebtoken.verify(token, `${secret}`);
    const { id } = decoded as TokenPayload;
    req.userId = id;
    // passando para o próximo middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalido" });
  }
}
