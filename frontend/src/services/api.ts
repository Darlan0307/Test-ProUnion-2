import axios from "axios";

// Criando a instância do axios com a baseURL e headers definidos
export const api = axios.create({
  baseURL: "http://localhost:5002",
  headers: {
    "Content-Type": "application/json",
  },
});
