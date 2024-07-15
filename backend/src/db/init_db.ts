import db from "./db";

// Script para criar a tabela users no PostgreSQL se ela não existir
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
`;

// Executando o script de criação da tabela
(async () => {
  try {
    await db.query(createTableQuery);
    console.log("Tabela criada com sucesso.");
  } catch (err) {
    console.error("Erro ao criar a tabela:", err);
  } finally {
    process.exit();
  }
})();
