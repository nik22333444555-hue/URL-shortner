import express from "express";
import helmet from "helmet" //for security
import cors from "cors" //for browser cors
import cookieParser from "cookie-parser"; //for cookie send and response
import env from "./config/env.js";


import compression from "compression";

import pinoHttp from "pino-http";
import logger from "./config/logger.js";

import i18next from "./config/i18n.js";
import i18nextMiddleware from "i18next-http-middleware";

import errorHandler from "./middlewares/errorHandler.js";

import userRoutes from "./routes/authRoutes/auth.routes.js"


const app = express();

app.set("trust proxy", 1);

app.use(helmet()); //use set middleware 


app.use(
    cors({
        origin: env.CLIENT_URL,
        credentials: true
    })
)


app.use(compression());

app.use(pinoHttp({ logger }));

app.use(i18nextMiddleware.handle(i18next));

app.use(express.urlencoded({ extended: true })); //handle form data and put in req.forms

app.use(express.json()); //convert json to js obj and store in req.body

app.use(cookieParser()); //parse cookie and store in req.cookie



app.use("/api/v1", userRoutes);

// 404 Handler



app.use(errorHandler); //global error handler last


export default app;