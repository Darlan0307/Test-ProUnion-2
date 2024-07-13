import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { prisma } from "../prisma/prisma";

export class AuthController {
  async authUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Verificando email
      const userExists = await prisma.user.findUnique({ where: { email } });

      if (!userExists)
        return res.status(401).json({ message: "E-mail ou senha inválido" });

      // Verificando senha
      const isValuePassword = await bcrypt.compare(
        password,
        userExists.password
      );

      if (!isValuePassword)
        return res.status(401).json({ message: "E-mail ou senha inválido" });

      const secret = process.env.SECRET_KEY;

      const token = jsonwebtoken.sign({ id: userExists.id }, `${secret}`, {
        expiresIn: "1d",
      });

      const { id } = userExists;

      res.status(200).json({ user: { id, email }, token });
    } catch (error) {
      return res.json({ message: "Erro ao tentar acessar o banco de dados" });
    }
  }
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      // Verificando se o email já existe
      const userExists = await prisma.user.findUnique({ where: { email } });

      if (userExists) {
        res.status(400).json({ message: "Email já existe" });
      }

      // Criptografando a senha
      const hash_password = (await bcrypt.hash(password, 8)).toString();

      // Criando o usuário
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hash_password,
        },
      });

      // Autenticando o usuário
      const secret = process.env.SECRET_KEY;

      // Autenticação válida por 1 dia
      const token = jsonwebtoken.sign({ id: user.id }, `${secret}`, {
        expiresIn: "1d",
      });

      const { id } = user;
      // Retornando o usuário e o token
      res.status(200).json({ user: { id, email }, token });
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar o usuário" });
    }
  }
}
