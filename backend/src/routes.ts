import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("API rodando");
});

export default router;
