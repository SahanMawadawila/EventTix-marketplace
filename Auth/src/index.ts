import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handling";
import { NotFoundError } from "./errors/not-found";
import { createTable, pool } from "./config/db";
import cookieSession from "cookie-session";

const app = express();
app.use(json());
app.set("trust proxy", true); // trust traffic as secure even though it is coming from a proxy

app.use(
  cookieSession({
    signed: false, // disable encryption
    secure: true, // only use cookies over https
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

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
