import { Router } from "express";
import { UserController } from "./controller/UserController";
import { AuthController } from "./controller/AuthController";
import { AuthMiddleWares } from "./middleware/AuthMiddleware";

const usercontroller = new UserController();
const authcontroller = new AuthController();

const router = Router();

router.post("/", (req, res) => {
  res.status(200).json({ message: "Bem vindo ao backend" });
});

// Rotas de autenticação
router.post("/users", authcontroller.createUser);
router.post("/login", authcontroller.authUser);

// Busca todos os usuários
router.get("/users", usercontroller.getAllUsers);
// Atualiza um usuário
router.put("/users/:id", AuthMiddleWares, usercontroller.updateUser);
// Deleta um usuário
router.delete("/users/:id", AuthMiddleWares, usercontroller.deleteUser);

export default router;
