import request from "supertest";
import { app } from "../../app";
import { it } from "@jest/globals";

//see cokee is removed after signout
it("see cookie is removed after signout", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "sahan124444444@gmail.com",
      password: "sahan123555555",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  const cookies = response.get("Set-Cookie");

  //after signout it send a cookie with following field
  expect(cookies && cookies[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
}, 20000);
