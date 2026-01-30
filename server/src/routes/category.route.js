import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  updateCategoryController,
} from "../controllers/category.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllCategoryController);
router.post("/", protectRoute, createCategoryController);
router.put("/:id", protectRoute, updateCategoryController);
router.delete("/:id", protectRoute, deleteCategoryController);

export default router;
