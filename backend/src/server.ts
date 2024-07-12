import express from "express";
import cors from "cors";
import router from "./routes";

// Criando instancia do express
const app = express();
// para aceitar json
app.use(express.json());
// habilitando cors
app.use(cors());
// registrando rotas
app.use(router);
// iniciando o servidor
app.listen(3001, () => {
  console.log("API rodando em http://localhost:3001");
});
