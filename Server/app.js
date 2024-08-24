import { config } from "dotenv";
import express, { urlencoded } from "express";
import morgan from "morgan";
import userRoute from "./routes/userRoute.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

// MIddlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// Testing
app.get("/", (req, res) => {
  res.send("Hello Server :)");
});

/////////////////////////////////////
//ROUTES
app.use("/api/v1/user", userRoute);

////////////////////////////////////
//ERROR MIDDLEWARE
app.use(errorMiddleware);

export default app;
