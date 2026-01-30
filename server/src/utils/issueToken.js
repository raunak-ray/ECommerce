import jwt from "jsonwebtoken";
import "dotenv/config";

const issueToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );
};

export default issueToken;
