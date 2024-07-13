import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import bcrypt from "bcryptjs";

export class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      // Buscando todos os usuários
      const users = await prisma.user.findMany();

      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao tentar acessar o banco de dados" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // converter id para um id do tipo number
      const idNumber = Number(id);
      const { name, email, password } = req.body;
      let new_password;

      //  Verificando se o usuario existe
      const userExists = await prisma.user.findUnique({
        where: { id: idNumber },
      });

      if (!userExists) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }

      // Criptografando a senha
      if (password) {
        new_password = await bcrypt.hash(password, 10);
      }

      // Atualizando o usuário

      await prisma.user.update({
        where: { id: idNumber },
        data: {
          name,
          email,
          // Se o usuário não atualizar a senha, manter a senha antiga
          password: password ? new_password : userExists.password,
        },
      });

      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar o usuário" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // converter id para um id do tipo number
      const idNumber = Number(id);

      // Verificando se o usuário existe
      const userExists = await prisma.user.findUnique({
        where: { id: idNumber },
      });

      if (!userExists) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }

      // Deletando o usuário
      await prisma.user.delete({
        where: { id: idNumber },
      });

      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar o usuário" });
    }
  }
}
