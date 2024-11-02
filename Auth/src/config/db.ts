import { Pool } from "pg";
// Create a new instance of Pool. using this instance we can connect to the database and execute queries
export const pool = new Pool({
  user: "admin",
  host: "auth-postgres-srv",
  database: "AuthDB",
  password: "SAHAN123",
  port: 5432,
});

//create a table in the database
export const createTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY, 
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL
    );`; //not like mongodb, we have to give id field explicitly
  await pool.query(queryText);
};
