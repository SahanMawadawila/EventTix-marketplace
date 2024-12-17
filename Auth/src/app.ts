import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handling";
import { NotFoundError } from "./errors/not-found";

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
export { app };
