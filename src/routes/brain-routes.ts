import { Router } from "express";
import { shareBrain, getSharedBrain } from "../controllers/brain-controller.js";
import { userMiddleware } from "../middleware/user-middleware.js";

const router = Router();

router.post("/share", userMiddleware, shareBrain);
router.get("/:shareLink", getSharedBrain);

export default router;
