import express from "express";
import "dotenv/config";
import loggerMiddleware from "./middleware/logger.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

const port = process.env.PORT || 5100;

app.use(express.static("public")); //server favicon
app.use(express.json());

//logger middleware
app.use(loggerMiddleware);

//error middleware
app.use(errorMiddleware);

app.listen(port, () => {
  console.log("Server started on Port: ", port);
});
