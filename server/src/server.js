import express from "express";
import "dotenv/config";
import loggerMiddleware from "./middleware/logger.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.route.js";
import categoryRoutes from "./routes/category.route.js";
import productRoutes from "./routes/product.route.js";
import cookieParser from "cookie-parser";

const app = express();

const port = process.env.PORT || 5100;

app.use(express.static("public")); //server favicon
app.use(express.json());
app.use(cookieParser());

// to do: add cors configuration

//logger middleware
app.use(loggerMiddleware);

//custom routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//error middleware
app.use(errorMiddleware);

app.listen(port, () => {
  console.log("Server started on Port: ", port);
});
