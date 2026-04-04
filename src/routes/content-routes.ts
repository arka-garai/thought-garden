import { Router } from "express";
import { addContent, getContent, deleteContent } from "../controllers/content-controller.js";

const router = Router();

router.post("/", addContent);
router.get("/", getContent);
router.delete("/", deleteContent);

export default router;
