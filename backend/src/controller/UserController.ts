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

      //  Verificando se o usuario existe
      const userExists = await prisma.user.findUnique({
        where: { id: idNumber },
      });

      if (!userExists) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }

      // Criptografando a senha
      const new_password = await bcrypt.hash(password, 10);
      //  Verificando se a senha atual é a mesma da nova senha
      const passwordIsSame = await bcrypt.compare(
        password,
        userExists.password
      );

      // Atualizando o usuário

      await prisma.user.update({
        where: { id: idNumber },
        data: {
          name,
          email,
          // Se a senha atual é a mesma da nova senha, manter a senha antiga
          password: passwordIsSame ? userExists.password : new_password,
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
