import request from "supertest";
import { app } from "../../app";
import { it, expect } from "@jest/globals";

it("returns 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@sahan.com",
      password: "sahan123",
    })
    .expect(201);
}, 10000);

it("returns 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test.com",
      password: "sahan123",
    })
    .expect(400);
}, 10000);

it("returns 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "sahan@email.com",
      password: "s",
    })
    .expect(400);
}, 10000);

it("returns 400 with missing email and password", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
}, 10000);

it("signing same email twice", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "sahansithira12@gmail.com",
      password: "asssssssssdwnad",
    })
    .expect(201);

  await request(app) //in here it is expecting 400, since same email twice not allowed.
    .post("/api/users/signup")
    .send({
      email: "sahansithira12@gmail.com",
      password: "asssssssssdwnad",
    })
    .expect(400);
}, 10000);

//checking cookies are set when signed up
it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "sahansithira1111@gmail.com",
      password: "asssssssssdwnad",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined(); // this test will be failed, because we specify secure: true in cookie-session middleware. but supertest send req in http. that case no cookies will be shared by the server. to avoid it we can set secure: false in testing environment.
}, 10000);
