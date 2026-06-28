import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { JWT } from "../exempleToken.js";

export const protectRoute = async (req, res, next) => {
  try {
      const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No Token Provided",
      });
    }

    const decoded = jwt.verify(token,JWT);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("protectRoute error:", error.message);
    res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
};
