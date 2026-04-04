import { Router } from "express";
import { addContent, getContent, deleteContent } from "../controllers/content-controller.js";
import { userMiddleware } from "../middleware/user-middleware.js";

const router = Router();

router.post("/", userMiddleware, addContent);
router.get("/", userMiddleware, getContent);
router.delete("/", userMiddleware, deleteContent);

export default router;
