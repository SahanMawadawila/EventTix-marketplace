import request from "supertest";
import { app } from "../../app";
import { it } from "@jest/globals";

//try to sign in with a email that does not exist
it("fails when a email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "sahan12@gmail.com",
      password: "sahan123",
    })
    .expect(400);
}, 10000);

//successful signin
it("successful", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "sahan12@gmail.com",
      password: "sahan123",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "sahan12@gmail.com",
      password: "sahan123",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
}, 10000);

//try to sign in with a email and password that does not match
it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "sahan12@gmail.com",
      password: "sahan123",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "sahan12@gmail.com",
      password: "sahan1234",
    })
    .expect(400);
}, 10000);
