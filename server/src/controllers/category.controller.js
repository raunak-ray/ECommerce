import asyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";
import {
  createCategory,
  deleteCategoryById,
  findCategoryByName,
  getAllCategory,
  updateCategory,
} from "../db/repository/category.repository.js";
import sendResponse from "../utils/sendResponse.js";

export const getAllCategoryController = asyncHandler(async (req, res) => {
  const categories = await getAllCategory();

  sendResponse(res, {
    statusCode: 200,
    message: "Categories Fetched Successfully",
    data: categories,
  });
});

export const createCategoryController = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new AppError(400, "Category name is required");
  }

  if (req.user.role !== "admin") {
    throw new AppError(401, "Only admin can create category");
  }

  const existingCategory = await findCategoryByName(name);

  if (existingCategory) {
    throw new AppError(400, "Category with similar name is present");
  }

  const category = await createCategory(name);

  sendResponse(res, {
    statusCode: 201,
    message: "Category Created Successfully",
    data: category,
  });
});

export const updateCategoryController = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!id) {
    throw new AppError(404, "No category id was provided");
  }

  if (!name) {
    throw new AppError(400, "Category name is required");
  }

  const { role } = req.user;

  if (role !== "admin") {
    throw new AppError(401, "Only admin can update category");
  }

  const updatedCategory = await updateCategory(id, name);

  if (!updatedCategory) {
    throw new AppError(404, "Category not found");
  }

  sendResponse(res, {
    statusCode: 200,
    message: "Category updated successfully",
    data: updatedCategory,
  });
});

export const deleteCategoryController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { role } = req.user;

  if (!id) {
    throw new AppError(400, "Category id was not provided");
  }

  if (role !== "admin") {
    throw new AppError(401, "Only admin can delete category");
  }

  const deletedCategory = await deleteCategoryById(id);

  if (!deletedCategory) {
    throw new AppError(400, "Error in deleting category");
  }

  sendResponse(res, {
    statusCode: 200,
    message: "Category deleted successfully",
  });
});
