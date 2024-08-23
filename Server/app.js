import { config } from "dotenv";
import express from "express";
import morgan from "morgan";

config();
const app = express();

// MIddlewares
app.use(express.json());
app.use(morgan("dev"));

// Testing
app.get("/", (req, res) => {
  res.send("Hello Server :)");
});

export default app;
