import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import db from "../db/db";
import { authUserToken } from "../utils/auth-user-token";

export class AuthController {
  async authUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Verificando se o email existe
      const userResult = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (userResult.rows.length === 0) {
        return res.status(401).json({ message: "E-mail ou senha inválido" });
      }

      const user = userResult.rows[0];

      // Verificando se a senha está correta
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "E-mail ou senha inválido" });
      }

      // Autenticando o usuário atribuindo um token valido por 1 dia
      const token = authUserToken(user.id);

      // Retornando o usuário e o token
      res.status(200).json({ user: { id: user.id, email: user.email }, token });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao tentar acessar o banco de dados" });
    }
  }
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      // Verificando se o email já existe no banco de dados
      const userExistsResult = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (userExistsResult.rows.length > 0) {
        return res.status(400).json({ message: "Email já existe" });
      }

      // Criptografando a senha
      const hash_password = (await bcrypt.hash(password, 8)).toString();

      // Criando o usuário no banco de dados e retornando o ID do usuário e o email
      const createUserResult = await db.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email",
        [name, email, hash_password]
      );

      const user = createUserResult.rows[0];

      // Autenticando o usuário
      const token = authUserToken(user.id);
      // Retornando o usuário e o token
      res.status(200).json({ user: { id: user.id, email: user.email }, token });
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar o usuário" });
    }
  }
}
