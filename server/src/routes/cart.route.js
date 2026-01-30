import express from "express";
import protectRoutes from "../middleware/auth.middleware.js";
import {
  addToCartController,
  clearCartController,
  getCartController,
  removeCartItemController,
  updateCartItemController,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.use(protectRoutes);
router.get("/", getCartController);
router.post("/items", addToCartController);
router.patch("/items/:productId", updateCartItemController);
router.delete("/items/:productId", removeCartItemController);
router.delete("/", clearCartController);

export default router;
