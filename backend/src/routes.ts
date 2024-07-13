import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  res.send("API rodando");
});

export default router;
