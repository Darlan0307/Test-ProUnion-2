import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import db from "../db/db";

export class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      // Buscando todos os usuários no banco de dados
      const users = await db.query("SELECT * FROM users");

      res.status(200).json(users.rows);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao tentar acessar o banco de dados" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { name, email, password } = req.body;
      // Variável para armazenar a senha atual caso tenha sido alterada
      let new_password;

      //  Verificando se o usuario existe
      const userResult = await db.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      if (userResult.rows.length == 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Criptografando a senha
      if (password) {
        new_password = await bcrypt.hash(password, 10);
      }

      // Se o usuário não atualizar a senha, manter a senha antiga
      const passwordCurrent = password
        ? new_password
        : userResult.rows[0].password;

      // Atualizando o usuário
      await db.query(
        "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4",
        [name, email, passwordCurrent, id]
      );

      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar o usuário" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Verificando se o usuário existe
      const userResult = await db.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      if (userResult.rows.length == 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Deletando o usuário
      await db.query("DELETE FROM users WHERE id = $1", [id]);

      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar o usuário" });
    }
  }
}
