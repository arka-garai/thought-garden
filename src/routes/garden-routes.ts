import { Router } from "express";
import { shareGarden, getSharedGarden } from "../controllers/garden-controller.js";
import { userMiddleware } from "../middleware/user-middleware.js";

const gardenRouter = Router();

gardenRouter.post("/share", userMiddleware, shareGarden);
gardenRouter.get("/:shareLink", getSharedGarden);

export default gardenRouter;