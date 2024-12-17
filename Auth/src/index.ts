import { createTable, pool } from "./config/db";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await pool.connect();
    await createTable();
    console.log("Connected to Postgres & created table");
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
