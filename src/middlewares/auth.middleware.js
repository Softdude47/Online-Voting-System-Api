import jwt from "jsonwebtoken";
import HttpError from "../utils/error.js";

export const isLoggedIn = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    throw new HttpError(401, "Access Denied. User not logged in");
  }

  const { sub } = jwt.verify(token, process.env.SECRET_KEY);
  req.user = sub;
  next();
};
