import cors from "cors";
import express from "express";
import httpStatus from "http-status";
import morgan from "morgan";
import routes from "@Routes/router";
import { ApiError } from "@Utils/ApiError";
import { globalErrorHandler } from "@Utils/errorHandler";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// routes
app.use("/api", routes);

app.use("/", (req, res) => {
  console.log("App is up and running!");
  res.status(200).json({ message: "App is up and running!" });
});

app.all("*", (req) => {
  throw new ApiError(httpStatus.NOT_FOUND, `Cannot find ${req.originalUrl} on this server!`);
});

app.use(globalErrorHandler);

export default app;
