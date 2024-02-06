import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import * as middlewares from "./middlewares";
import routes from "./routes/index";
import MessageResponse from "./interfaces/MessageResponse";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import "./strategies/local-strategies";
import path from "path";
require("dotenv").config();

export function createApp() {
  const app = express();

  app.use(morgan("dev"));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser(process.env.COOKIE_PARSER));
  app.use(
    session({
      secret: process.env.EXPRESS_SESSION!,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000 * 60,
        httpOnly: true,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        client: mongoose.connection.getClient(),
      }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "../../client/dist")));
  app.use(routes);

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);

  return app;
}
