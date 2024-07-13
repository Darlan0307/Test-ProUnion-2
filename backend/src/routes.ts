import { Router } from "express";
import { UserController } from "./controller/UserController";
import { AuthController } from "./controller/AuthController";

const usercontroller = new UserController();
const authcontroller = new AuthController();

const router = Router();

// Rotas de autenticação
router.post("/register", authcontroller.createUser);
router.post("/login", authcontroller.authUser);

// Busca todos os usuários
router.get("/users", usercontroller.getAllUsers);

export default router;
