import { Router } from "express";
import { shareBrain, getSharedBrain } from "../controllers/brain-controller.js";

const router = Router();

router.post("/share", shareBrain);
router.get("/:shareLink", getSharedBrain);

export default router;
