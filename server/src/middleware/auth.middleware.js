import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new AppError(400, "Token not provided");
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new AppError(401, "Not Authenticated");
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    throw new AppError(401, "Invalid or expired token...");
  }
};

export default authMiddleware;
