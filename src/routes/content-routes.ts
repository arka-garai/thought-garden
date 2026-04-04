import { Router } from "express";
import { addContent, getContent, deleteContent } from "../controllers/content-controller.js";
import { userMiddleware } from "../middleware/user-middleware.js";

const contentRouter = Router();

contentRouter.post("/", userMiddleware, addContent);
contentRouter.get("/", userMiddleware, getContent);
contentRouter.delete("/", userMiddleware, deleteContent);

export default contentRouter;
