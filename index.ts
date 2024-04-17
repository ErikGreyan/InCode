import express, { Application, Request, Response } from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import { parse } from "yaml";
import swaggerUI from "swagger-ui-express";
// ------ Config ------
import { FRONT_END, PORT, SESSION_SECRET } from "./src/config/config";
// ------ Database ------
import mongoDB from "./src/db/mongodb";
// ------ Middleware ------
import handlingMiddleware from "./src/middlewares/handling-middleware";
// ------ Routers ------
import authRouter from "./src/routers/auth-router";
import userRouter from "./src/routers/user-router";
import postRouter from "./src/routers/post-router";

(async function () {
    const app: Application = express();
    app.use(cors({
        origin: `http://localhost:${FRONT_END}`,
        credentials: true,
    }));
    app.use(express.static("src"));
    app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    mongoDB(); // MongoDB start

    app.use("/api/auth", authRouter);
    app.use("/api/user", userRouter);
    app.use("/api/post", postRouter);
    app.use(handlingMiddleware); // Internal Server Error

    const setupSwagger = () => {
        const file = parse(fs.readFileSync(path.join(path.resolve(), "api.yml"), "utf8"));
        app.use("/api/swagger", swaggerUI.serve, swaggerUI.setup(file));
        app.use("/*", (req: Request, res: Response) => {
            res.status(404).send({ message: "404 Not Found" });
        });
    };

    setupSwagger();

    app.listen(PORT, () => console.log(`Server started on port ${PORT}⚡`));
})();
