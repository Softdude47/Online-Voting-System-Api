import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/user.controller.js";

const router = Router();

router.get("/", isLoggedIn, controller.getUser);
router.post("/login", controller.authenticateUser);
router.post("/signup", controller.registerUser);
router.put("/edit", isLoggedIn, controller.editUser);

export default router;
