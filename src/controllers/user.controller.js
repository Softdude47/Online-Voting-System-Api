import jwt from "jsonwebtoken";
import { comparePassword } from "../utils/password.js";
import * as service from "../services/user.service.js";
import { getCurrentUser } from "../utils/user.js";

// LOG IN USER
export const authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await service.getUser({ username });

  const passwordMatched = comparePassword(user.password, password);
  if (!passwordMatched) {
    res.status(401).json({ message: "Invalid username or password" });
  }

  const sub = { username };
  const token = jwt.sign({ sub }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });

  user["token"] = token;
  res.header("authorization", `Bearer ${token}`);

  res.status(200).json(user);
};

// USER VIEW
export const getUser = async (req, res) => {
  // req.user already set to user query parameter in middleware
  const user = await service.getUser(req.user);
  res.status(200).json(user);
};

// REGISTER USER
export const registerUser = async (req, res) => {
  const [user] = await service.createUser(req.body);
  const { username } = user;

  const token = jwt.sign({ sub: { username } }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
  user["token"] = token;

  res.status(201).json(user);
};

// EDIT USER INFO
export const editUser = async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  const { sub } = jwt.verify(token, process.env.SECRET_KEY);

  const [user] = await service.updateUser(sub, req.body);
  res.status(201).json(user);
};
