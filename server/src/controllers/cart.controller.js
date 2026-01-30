import asyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";
import sendResponse from "../utils/sendResponse.js";

import {
  getCartItems,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearUserCart,
} from "../db/repository/cart.repository.js";

export const getCartController = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;

  const cart = await getCartItems(userId);

  if (!cart) {
    throw new AppError(404, "Cart not found");
  }

  sendResponse(res, {
    statusCode: 200,
    message: "Cart fetched successfully",
    data: cart,
  });
});

export const addToCartController = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    throw new AppError(400, "Product id is required");
  }

  if (quantity <= 0) {
    throw new AppError(400, "Quantity must be greater than zero");
  }

  const cart = await addItemToCart(userId, productId, quantity);

  sendResponse(res, {
    statusCode: 201,
    message: "Product added to cart",
    data: cart,
  });
});

export const updateCartItemController = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!productId) {
    throw new AppError(400, "Product id is required");
  }

  if (quantity === undefined) {
    throw new AppError(400, "Quantity is required");
  }

  const cart = await updateCartItem(userId, productId, quantity);

  sendResponse(res, {
    statusCode: 200,
    message: "Cart item updated successfully",
    data: cart,
  });
});

export const removeCartItemController = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  const { productId } = req.params;

  if (!productId) {
    throw new AppError(400, "Product id is required");
  }

  const cart = await removeCartItem(userId, productId);

  sendResponse(res, {
    statusCode: 200,
    message: "Product removed from cart",
    data: cart,
  });
});

export const clearCartController = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;

  await clearUserCart(userId);

  sendResponse(res, {
    statusCode: 200,
    message: "Cart cleared successfully",
    data: null,
  });
});
