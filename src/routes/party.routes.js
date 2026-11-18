import { Router } from "express";
import * as controller from "../controllers/party.controller.js";

const router = Router();

router.get("/", controller.getParty);
router.get("/:initials", controller.getParty);
router.post("/register", controller.registerParty);
router.put("/:initials", controller.editParty);
router.delete("/:initials", controller.deactivateParty);

export default router;
