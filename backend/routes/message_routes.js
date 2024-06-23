import express from "express";

import protectRoutes from "../middleware/protectRoutes.js";
import { sendmsg, getmsg } from "../controllers/msg_controller.js";
const router = express.Router();

router.get("/:id",protectRoutes,getmsg)
router.post("/send/:id", protectRoutes, sendmsg);

export default router;
