import pg from "pg";

// Criando a conexão com o PostgreSQL
const pool = new pg.Pool({
  user: "darlan",
  host: "postgres",
  database: "mydb",
  password: "postgres",
  port: 5432,
});

export default {
  query: (query: string, params?: any[]) => pool.query(query, params),
};
