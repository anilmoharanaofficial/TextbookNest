import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import userRoute from "./routes/userRoute.js";

config();
const app = express();

// MIddlewares
app.use(express.json());
app.use(morgan("dev"));

// Testing
app.get("/", (req, res) => {
  res.send("Hello Server :)");
});

/////////////////////////////////////
//ROUTES
app.use("/api/v1/user", userRoute);

export default app;
