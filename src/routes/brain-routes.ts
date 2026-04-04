import { Router } from "express";
import { shareBrain, getSharedBrain } from "../controllers/brain-controller.js";
import { userMiddleware } from "../middleware/user-middleware.js";

const brainRouter = Router();

brainRouter.post("/share", userMiddleware, shareBrain);
brainRouter.get("/:shareLink", getSharedBrain);

export default brainRouter;
