import express from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductByCategoryController,
  getAllProductController,
  getProductController,
  updateProductController,
} from "../controllers/product.controller.js";
import protectRoutes from "../middleware/auth.middleware.js";
import upload from "../config/multer.config.js";

const router = express.Router();

router.get("/", getAllProductController);
router.get("/:id", getProductController);
router.get("/category/:id", getAllProductByCategoryController);
router.post(
  "/",
  protectRoutes,
  upload.single("coverImage"),
  createProductController,
);
router.put(
  "/:productId",
  protectRoutes,
  upload.single("coverImage"),
  updateProductController,
);
router.delete("/:productId", protectRoutes, deleteProductController);

export default router;
