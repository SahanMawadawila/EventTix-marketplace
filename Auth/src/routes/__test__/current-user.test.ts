import request from "supertest";
import { app } from "../../app";
import { it } from "@jest/globals";

//test current user route

it("testing current user route", async () => {
  const cookie = await global.getCookie();

  const response2 = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie!)
    .send()
    .expect(200);

  expect(response2.body.currentUser.email).toEqual("sahan12@gmail.com");
}, 20000);

it("testing current user unauthenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
}, 20000);
