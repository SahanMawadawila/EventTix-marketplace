//import { app } from "../app";
//import { newDb } from "pg-mem";
import { beforeAll, beforeEach, afterAll } from "@jest/globals";
//import { IMemoryDb } from "pg-mem";
import { pool, createTable } from "../config/db";

//before all function (before all tests connect to the database)

beforeAll(async () => {
  process.env.JWT_KEY = "testkey";

  try {
    await pool.connect();
    await createTable();
    console.log("Connected to Postgres & created table");
  } catch (err) {
    console.error(err);
  }
});

//before each function (before each test delete all the data from the database)
beforeEach(async () => {
  try {
    await pool.query("DELETE FROM users");
    console.log("Deleted all data from the users table");
  } catch (err) {
    console.error(err);
  }
});

//after all function (after all tests disconnect from the database)
afterAll(() => {
  pool.end();
});
