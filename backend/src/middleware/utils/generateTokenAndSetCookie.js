import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { JWT } from "../../exempleToken.js";

config()

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign(
    { userId },
    JWT,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};