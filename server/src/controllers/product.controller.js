import asyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";
import sendResponse from "../utils/sendResponse.js";
import { findCategoryById } from "../db/repository/category.repository.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getAllProductByCategory,
  getProduct,
  updateProduct,
} from "../db/repository/product.repository.js";
import getPublicIdFromUrl from "../utils/getCloudinaryPublicId.js";
import { v2 as cloudinary } from "cloudinary";
import {
  deleteCache,
  deleteCacheByPrefix,
  getCache,
  setCache,
} from "../utils/cache.js";

export const getAllProductController = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 10, 100);
  const offset = (page - 1) * limit;

  const filters = {
    categoryId: req.query.category,
    minPrice: req.query.minPrice,
    maxPrice: req.query.maxPrice,
    search: req.query.search,
  };

  const cacheKey = `products:${page}:${limit}:${JSON.stringify(filters)}`;

  const cachedData = await getCache(cacheKey);

  if (cachedData) {
    return sendResponse(res, {
      statusCode: 200,
      message: "Products fetched successfully",
      data: cachedData,
    });
  }

  const result = await getAllProduct({ limit, offset, filters });

  await setCache(cacheKey, result, 300);

  sendResponse(res, {
    statusCode: 200,
    message: "Products fetched successfully",
    data: result,
  });
});

export const getAllProductByCategoryController = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    if (!id) {
      throw new AppError(400, "Category id was not provided");
    }

    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 10, 100);
    const offset = (page - 1) * limit;

    const cacheKey = `category:${id}:${page}:${limit}`;

    const cachedData = await getCache(cacheKey);

    if (cachedData) {
      return sendResponse(res, {
        statusCode: 200,
        message: "Products fetched successfully",
        data: cachedData,
      });
    }

    const products = await getAllProductByCategory({ limit, offset, id });

    await setCache(cacheKey, products, 300);

    if (!products) {
      throw new AppError(404, "Product not found");
    }

    sendResponse(res, {
      statusCode: 200,
      message: "Products fetched successfully",
      data: products,
    });
  },
);

export const getProductController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError(400, "Product id was not provided");
  }

  const cacheKey = `product:${id}`;

  const cachedData = await getCache(cacheKey);

  if (cachedData) {
    return sendResponse(res, {
      statusCode: 200,
      message: "Products fetched successfully",
      data: cachedData,
    });
  }

  const product = await getProduct(id);

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  await setCache(cacheKey, product, 300);

  sendResponse(res, {
    statusCode: 200,
    message: "Products fetched successfully",
    data: product,
  });
});

export const createProductController = asyncHandler(async (req, res) => {
  const { role, id } = req.user;

  const { name, description, price, stock, categoryId } = req.body;

  if (role === "customer") {
    throw new AppError(401, "Only sellers and admin can create products");
  }

  if (!name || !description || !price || !categoryId) {
    throw new AppError(400, "All fields are required");
  }

  if (!req.file) {
    throw new AppError(400, "Product Cover Image is required");
  }

  const category = await findCategoryById(categoryId);

  if (!category) {
    throw new AppError(404, "No category found");
  }

  const coverImage = req.file.path;

  const product = await createProduct(
    name,
    description,
    price,
    stock,
    categoryId,
    id,
    coverImage,
  );

  await deleteCacheByPrefix("products:");
  await deleteCacheByPrefix("category:");

  sendResponse(res, {
    statusCode: 201,
    message: "Product created successfully",
    data: product,
  });
});

export const updateProductController = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const { id, role } = req.user;

  const updateData = { ...req.body };

  if (!productId) {
    throw new AppError(400, "Product id is required");
  }

  if (role === "customer") {
    throw new AppError(401, "Only admins and seller can update product");
  }

  if (req.file) {
    updateData.coverImage = req.file.path;
  }

  const product = await getProduct(productId);

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  const publicId = getPublicIdFromUrl(product.coverImage);

  const updatedProduct = await updateProduct(id, productId, updateData);

  if (!updatedProduct) {
    throw new AppError(400, "Nothing to update or unauthorized");
  }

  await cloudinary.uploader.destroy(publicId);

  await deleteCache(`product:${productId}`);
  await deleteCacheByPrefix("products:");
  await deleteCacheByPrefix("category:");

  sendResponse(res, {
    statusCode: 200,
    message: "Product uploaded successfully",
    data: updatedProduct,
  });
});

export const deleteProductController = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { id, role } = req.user;

  if (!productId) {
    throw new AppError(400, "Product id is required");
  }

  if (role === "customer") {
    throw new AppError(401, "Only admin and seller can delete product");
  }

  const product = await deleteProduct(id, productId, role);

  if (!product) {
    throw new AppError(404, "Product not found or unauthorized");
  }

  const publicId = getPublicIdFromUrl(product.coverImage);

  await cloudinary.uploader.destroy(publicId);

  await deleteCache(`product:${productId}`);
  await deleteCacheByPrefix("products:");
  await deleteCacheByPrefix("category:");

  sendResponse(res, {
    statusCode: 200,
    message: "Product deleted successfully",
  });
});
