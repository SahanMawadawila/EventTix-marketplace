//import { app } from "../app";
//import { newDb } from "pg-mem";
import { beforeAll, beforeEach, afterAll } from "@jest/globals";
//import { IMemoryDb } from "pg-mem";
import { pool, createTable } from "../config/db";
import request from "supertest";
import { app } from "../app";

//global declaration

declare global {
  namespace NodeJS {
    interface Global {
      getCookie: () => Promise<string[]>;
    }
  }

  var getCookie: () => Promise<string[]>;
}

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

global.getCookie = async () => {
  const email = "sahan12@gmail.com";
  const password = "hello";
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie") as string[];
  return cookie;
};
