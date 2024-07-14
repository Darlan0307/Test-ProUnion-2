import axios from "axios";

// Criando a instância do axios com a baseURL e headers definidos
export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
