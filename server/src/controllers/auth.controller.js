import asyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";
import sendResponse from "../utils/sendResponse.js";
import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
} from "../db/repository/user.repository.js";
import issueToken from "../utils/issueToken.js";
import cookieOption from "../utils/cookieOption.js";

export const signupUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError(400, "Name, Email and Password is required");
  }

  if (password.length < 8) {
    throw new AppError(400, "Password should be minimum 8 characters long");
  }

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError(400, "Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await createUser({ name, email, hashedPassword });

  const token = issueToken(createdUser);

  res.cookie("token", token, cookieOption);

  sendResponse(res, {
    statusCode: 201,
    message: "User sign up successfully",
    data: createdUser,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(400, "Email and Password are required");
  }

  const user = await findUserByEmail(email);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError(401, "Invalid Credentials");
  }

  const token = issueToken(user);

  res.cookie("token", token, cookieOption);

  delete user.password;
  delete user.createdAt;

  sendResponse(res, {
    statusCode: 200,
    message: "User logged in successfully",
    data: user,
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  sendResponse(res, {
    statusCode: 200,
    message: "User logged out successfully",
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new AppError(401, "Unauthorized");
  }

  sendResponse(res, {
    statusCode: 200,
    message: "User Profile",
    data: user,
  });
});
